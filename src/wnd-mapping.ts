import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import {
  DragonBurned,
  DragonMinted,
  Transfer,
  WizardBurned,
  WizardMinted,
} from '../generated/WnD/WnD'

import { Game, Player, Token } from '../generated/schema'

import {
  ADDRESS_ZERO,
  GAME_ID,
  NAME_DRAGON,
  NAME_WIZARD,
  ONE_BI,
  TOWER_CONTRACTS,
  ZERO_BI,
} from './util/constants'

function loadGame(): Game {
  let game = Game.load(GAME_ID);
  if (game == null) {
    game = new Game(GAME_ID);
    game.dragonsMinted = ZERO_BI;
    game.dragonsStaked = ZERO_BI;
    game.dragonsStolen = ZERO_BI;
    game.wizardsMinted = ZERO_BI;
    game.wizardsStaked = ZERO_BI;
    game.wizardsStolen = ZERO_BI;
  }

  return game;
}

function tokenIdErc721(contract: string, tokenId: string): string {
  return `${contract}-${tokenId}`;
}

function initPlayer(id: string): Player {
  const player = new Player(id);
  player.dragonsLost = ZERO_BI;
  player.dragonsOwned = ZERO_BI;
  player.dragonsStolen = ZERO_BI;
  player.mints = ZERO_BI;
  player.tokensOwned = ZERO_BI;
  player.wizardsLost = ZERO_BI;
  player.wizardsOwned = ZERO_BI;
  player.wizardsStolen = ZERO_BI;

  return player;
}

function initToken(id: string, tokenId: BigInt, name: string, owner: string, tx: string): Token {
  const token = new Token(id);
  token.name = name;
  token.tokenId = tokenId;
  token.balance = ONE_BI;
  token.owner = owner;
  token.isStolen = false;
  token.isStaked = false;
  token.mintTx = tx;

  return token;
};

function isTokenStaked(newOwner: string): boolean {
  return TOWER_CONTRACTS.has(newOwner.toLowerCase());
}

function incrementTokensOwned(player: Player, token: Token): void {
  player.tokensOwned = player.tokensOwned.plus(ONE_BI);
  if (token.name == NAME_WIZARD) {
    player.wizardsOwned = player.wizardsOwned.plus(ONE_BI);
  } else {
    player.dragonsOwned = player.dragonsOwned.plus(ONE_BI);
  }
}

function decrementTokensOwned(player: Player, token: Token): void {
  player.tokensOwned = player.tokensOwned.minus(ONE_BI);
  if (token.name == NAME_WIZARD) {
    player.wizardsOwned = player.wizardsOwned.minus(ONE_BI);
  } else {
    player.dragonsOwned = player.dragonsOwned.minus(ONE_BI);
  }
}

function handleTokenMinted(
  tx: string,
  callerAddress: string,
  contractAddress: string,
  tokenId: BigInt,
  name: string,
): void {
  const compositeTokenId = tokenIdErc721(contractAddress, tokenId.toString());

  let caller = Player.load(callerAddress);
  if (caller == null) {
    caller = initPlayer(callerAddress);
  }

  caller.mints = caller.mints.plus(ONE_BI);
  caller.save();

  const token = initToken(
    compositeTokenId,
    tokenId,
    name,
    caller.id,
    tx,
  );

  token.save();
}

export function handleDragonMinted(event: DragonMinted): void {
  const callerAddress = event.transaction.from.toHexString();
  const contractAddress = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const tx = event.transaction.hash.toHexString();
  handleTokenMinted(tx, callerAddress, contractAddress, tokenId, NAME_DRAGON);

  const game = loadGame();
  game.dragonsMinted = game.dragonsMinted.plus(ONE_BI);
  game.save();
}

// this should technically be WizardMinted
export function handleWizardMinted(event: WizardMinted): void {
  const callerAddress = event.transaction.from.toHexString();
  const contractAddress = event.address.toHexString();
  const tokenId = event.params.tokenId;
  const tx = event.transaction.hash.toHexString();
  handleTokenMinted(tx, callerAddress, contractAddress, tokenId, NAME_WIZARD);

  const game = loadGame();
  game.wizardsMinted = game.wizardsMinted.plus(ONE_BI);
  game.save();
}

function handleTokenStake(event: Transfer, token: Token): void {
  token.isStaked = true;
  token.save();

  const game = loadGame();
  if (token.name == NAME_WIZARD) {
    game.wizardsStaked = game.wizardsStaked.plus(ONE_BI);
  } else {
    game.dragonsStaked = game.dragonsStaked.plus(ONE_BI);
  }

  game.save();
}

function handleTokenUnstake(event: Transfer, token: Token): void {
  token.isStaked = false;
  token.save();

  const game = loadGame();
  if (token.name == NAME_WIZARD) {
    game.wizardsStaked = game.wizardsStaked.minus(ONE_BI);
  } else {
    game.dragonsStaked = game.dragonsStaked.minus(ONE_BI);
  }

  game.save();
}

function handleMintStake(event: Transfer, token: Token): void {
  const callerAddress = event.transaction.from.toHexString();
  let caller = Player.load(callerAddress);
  if (caller == null) {
    caller = initPlayer(callerAddress);
  }

  incrementTokensOwned(caller, token);
  caller.save();

  token.owner = caller.id;
  token.isStaked = true;
  token.save();

  const game = loadGame();
  if (token.name == NAME_WIZARD) {
    game.wizardsStaked = game.wizardsStaked.plus(ONE_BI);
  } else {
    game.dragonsStaked = game.dragonsStaked.plus(ONE_BI);
  }

  game.save();
}

function handleMintStolen(event: Transfer, token: Token): void {
  const callerAddress = event.transaction.from.toHexString();
  let caller = Player.load(callerAddress);
  if (caller == null) {
    caller = initPlayer(callerAddress);
  }

  const to = event.params.to.toHexString();
  let thief = Player.load(to);
  if (thief == null) {
    thief = initPlayer(to);
  }

  const game = loadGame();
  if (token.name == NAME_WIZARD) {
    caller.wizardsLost = caller.wizardsLost.plus(ONE_BI);
    thief.wizardsStolen = thief.wizardsStolen.plus(ONE_BI);
    game.wizardsStolen = game.wizardsStolen.plus(ONE_BI);
  } else {
    caller.dragonsLost = caller.dragonsLost.plus(ONE_BI);
    thief.dragonsStolen = thief.dragonsStolen.plus(ONE_BI);
    game.dragonsStolen = game.dragonsStolen.plus(ONE_BI);
  }

  game.save();
  caller.save();

  incrementTokensOwned(thief, token);
  thief.save();

  token.owner = thief.id;
  token.isStolen = true;
  token.save();
}

function handleMint(event: Transfer, token: Token): void {
  const to = event.params.to.toHexString();
  let minter = Player.load(to);
  if (minter == null) {
    minter = initPlayer(to);
  }

  incrementTokensOwned(minter, token);
  minter.save();

  token.owner = minter.id;
  token.save();
}

function handlePlayerTransfer(event: Transfer, token: Token): void {
  const from = event.params.from.toHexString();
  let prevOwner = Player.load(from);
  if (prevOwner == null) {
    // this should never happen
    prevOwner = initPlayer(from);
    prevOwner.tokensOwned = prevOwner.tokensOwned.plus(ONE_BI);
  }

  const to = event.params.to.toHexString();
  let newOwner = Player.load(to);
  if (newOwner == null) {
    newOwner = initPlayer(to);
  }

  decrementTokensOwned(prevOwner, token);
  prevOwner.save();

  incrementTokensOwned(newOwner, token);
  newOwner.save();

  token.isStolen = false;
  token.owner = newOwner.id;
  token.save();
}

// Transfer is emitted anytime a token is sent to a different address
// We need to handle the following cases:
// 1. Stake
// 2. Unstake
// 3. Mint & Stake
// 4. Mint & Stolen
// 5. Mint to Caller
// 6. Player to Player Transfer
export function handleTransfer(event: Transfer): void {
  const contractAddress = event.address.toHexString();
  const tokenId = event.params.tokenId.toString();
  const compositeTokenId = tokenIdErc721(contractAddress, tokenId);

  const token = Token.load(compositeTokenId);
  if (token == null) {
    throw new Error(`Token (${compositeTokenId}) should have been created in mint event`)
  }

  const callerAddress = event.transaction.from.toHexString();
  const to = event.params.to.toHexString();
  const from = event.params.from.toHexString();
  const isNewMint = from == ADDRESS_ZERO;
  const isBeingStaked = isTokenStaked(to);

  if (isBeingStaked && !isNewMint) {
    // 1. Stake
    handleTokenStake(event, token);
  } else if (isTokenStaked(from)) {
    // 2. Unstake
    handleTokenUnstake(event, token);
  } else if (isNewMint && isBeingStaked) {
    // 3. Mint & Stake
    handleMintStake(event, token);
  } else if (isNewMint && to != callerAddress) {
    // 4. Mint & Stolen
    handleMintStolen(event, token);
  } else if (isNewMint) {
    // 5. Mint to Caller
    handleMint(event, token);
  } else if (!isNewMint) {
    // 6. Player to Player Transfer
    handlePlayerTransfer(event, token);
  } else {
    throw new Error('Unhandled case');
  }
}

function handleTokenBurned(tokenId: string): void {
  const token = Token.load(tokenId);
  if (token == null) {
    log.warning('Received Burn event for token ({}) but entity does not exist', [tokenId]);
    return;
  }

  const owner = Player.load(token.owner);
  if (owner == null) {
    log.warning('Received Burn event for token ({}) but could not load owner ({})', [tokenId, token.owner]);
    return;
  }

  decrementTokensOwned(owner, token);
  owner.save();

  token.owner = ADDRESS_ZERO;
  token.save();
}

export function handleDragonBurned(event: DragonBurned): void {
  const contractAddress = event.address.toHexString();
  const tokenId = event.params.tokenId.toString();
  const compositeTokenId = tokenIdErc721(contractAddress, tokenId);
  handleTokenBurned(compositeTokenId);
}

export function handleWizardBurned(event: WizardBurned): void {
  const contractAddress = event.address.toHexString();
  const tokenId = event.params.tokenId.toString();
  const compositeTokenId = tokenIdErc721(contractAddress, tokenId);
  handleTokenBurned(compositeTokenId);
}

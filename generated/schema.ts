// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Game extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dragonsMinted", Value.fromBigInt(BigInt.zero()));
    this.set("dragonsStaked", Value.fromBigInt(BigInt.zero()));
    this.set("dragonsStolen", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsMinted", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsStaked", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsStolen", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Game entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Game entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Game", id.toString(), this);
    }
  }

  static load(id: string): Game | null {
    return changetype<Game | null>(store.get("Game", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dragonsMinted(): BigInt {
    let value = this.get("dragonsMinted");
    return value!.toBigInt();
  }

  set dragonsMinted(value: BigInt) {
    this.set("dragonsMinted", Value.fromBigInt(value));
  }

  get dragonsStaked(): BigInt {
    let value = this.get("dragonsStaked");
    return value!.toBigInt();
  }

  set dragonsStaked(value: BigInt) {
    this.set("dragonsStaked", Value.fromBigInt(value));
  }

  get dragonsStolen(): BigInt {
    let value = this.get("dragonsStolen");
    return value!.toBigInt();
  }

  set dragonsStolen(value: BigInt) {
    this.set("dragonsStolen", Value.fromBigInt(value));
  }

  get wizardsMinted(): BigInt {
    let value = this.get("wizardsMinted");
    return value!.toBigInt();
  }

  set wizardsMinted(value: BigInt) {
    this.set("wizardsMinted", Value.fromBigInt(value));
  }

  get wizardsStaked(): BigInt {
    let value = this.get("wizardsStaked");
    return value!.toBigInt();
  }

  set wizardsStaked(value: BigInt) {
    this.set("wizardsStaked", Value.fromBigInt(value));
  }

  get wizardsStolen(): BigInt {
    let value = this.get("wizardsStolen");
    return value!.toBigInt();
  }

  set wizardsStolen(value: BigInt) {
    this.set("wizardsStolen", Value.fromBigInt(value));
  }
}

export class Player extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("dragonsLost", Value.fromBigInt(BigInt.zero()));
    this.set("dragonsOwned", Value.fromBigInt(BigInt.zero()));
    this.set("dragonsStolen", Value.fromBigInt(BigInt.zero()));
    this.set("mints", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsLost", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsOwned", Value.fromBigInt(BigInt.zero()));
    this.set("wizardsStolen", Value.fromBigInt(BigInt.zero()));
    this.set("tokensOwned", Value.fromBigInt(BigInt.zero()));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Player entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Player entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Player", id.toString(), this);
    }
  }

  static load(id: string): Player | null {
    return changetype<Player | null>(store.get("Player", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get dragonsLost(): BigInt {
    let value = this.get("dragonsLost");
    return value!.toBigInt();
  }

  set dragonsLost(value: BigInt) {
    this.set("dragonsLost", Value.fromBigInt(value));
  }

  get dragonsOwned(): BigInt {
    let value = this.get("dragonsOwned");
    return value!.toBigInt();
  }

  set dragonsOwned(value: BigInt) {
    this.set("dragonsOwned", Value.fromBigInt(value));
  }

  get dragonsStolen(): BigInt {
    let value = this.get("dragonsStolen");
    return value!.toBigInt();
  }

  set dragonsStolen(value: BigInt) {
    this.set("dragonsStolen", Value.fromBigInt(value));
  }

  get mints(): BigInt {
    let value = this.get("mints");
    return value!.toBigInt();
  }

  set mints(value: BigInt) {
    this.set("mints", Value.fromBigInt(value));
  }

  get wizardsLost(): BigInt {
    let value = this.get("wizardsLost");
    return value!.toBigInt();
  }

  set wizardsLost(value: BigInt) {
    this.set("wizardsLost", Value.fromBigInt(value));
  }

  get wizardsOwned(): BigInt {
    let value = this.get("wizardsOwned");
    return value!.toBigInt();
  }

  set wizardsOwned(value: BigInt) {
    this.set("wizardsOwned", Value.fromBigInt(value));
  }

  get wizardsStolen(): BigInt {
    let value = this.get("wizardsStolen");
    return value!.toBigInt();
  }

  set wizardsStolen(value: BigInt) {
    this.set("wizardsStolen", Value.fromBigInt(value));
  }

  get tokensOwned(): BigInt {
    let value = this.get("tokensOwned");
    return value!.toBigInt();
  }

  set tokensOwned(value: BigInt) {
    this.set("tokensOwned", Value.fromBigInt(value));
  }

  get tokens(): Array<string> {
    let value = this.get("tokens");
    return value!.toStringArray();
  }

  set tokens(value: Array<string>) {
    this.set("tokens", Value.fromStringArray(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("name", Value.fromString(""));
    this.set("tokenId", Value.fromBigInt(BigInt.zero()));
    this.set("balance", Value.fromBigInt(BigInt.zero()));
    this.set("mintTx", Value.fromString(""));
    this.set("owner", Value.fromString(""));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Token entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        "Cannot save Token entity with non-string ID. " +
          'Considering using .toHex() to convert the "id" to a string.'
      );
      store.set("Token", id.toString(), this);
    }
  }

  static load(id: string): Token | null {
    return changetype<Token | null>(store.get("Token", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get tokenId(): BigInt {
    let value = this.get("tokenId");
    return value!.toBigInt();
  }

  set tokenId(value: BigInt) {
    this.set("tokenId", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value!.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }

  get mintTx(): string {
    let value = this.get("mintTx");
    return value!.toString();
  }

  set mintTx(value: string) {
    this.set("mintTx", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value!.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get isStolen(): boolean {
    let value = this.get("isStolen");
    return value!.toBoolean();
  }

  set isStolen(value: boolean) {
    this.set("isStolen", Value.fromBoolean(value));
  }

  get isStaked(): boolean {
    let value = this.get("isStaked");
    return value!.toBoolean();
  }

  set isStaked(value: boolean) {
    this.set("isStaked", Value.fromBoolean(value));
  }
}

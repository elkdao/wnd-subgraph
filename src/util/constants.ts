import { BigInt, BigDecimal } from '@graphprotocol/graph-ts'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ZERO_BI = BigInt.fromI32(0)
export const ONE_BI = BigInt.fromI32(1)
export const ZERO_BD = BigDecimal.fromString('0')
export const ONE_BD = BigDecimal.fromString('1')

// Game constants
export const GAME_ID = 'WnD';
export const NAME_WIZARD = 'Wizard';
export const NAME_DRAGON = 'Dragon';

export const TOWER_CONTRACTS = new Set<string>();
TOWER_CONTRACTS.add('0xf042a49fb03cb9d98cba9def8711cee85dc72281');

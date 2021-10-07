import { default as BigNumber } from 'bignumber.js';
import { TaskMeta } from '@/model/task';
import {
  AssetMovement,
  Trade,
  TradeLocation,
  Transactions
} from '@/services/history/types';
import {
  FETCH_SOURCE,
  IGNORE_ACTION_TYPE,
  LedgerActionType
} from '@/store/history/consts';
import { Nullable } from '@/types';

export interface HistoricData<T> {
  readonly limit: number;
  readonly found: number;
  readonly data: T[];
}

type EntryMeta = { readonly ignoredInAccounting: boolean };

export type AssetMovementEntry = AssetMovement & EntryMeta;
export type TradeEntry = Trade & EntryMeta;
export type LedgerActionEntry = LedgerAction & EntryMeta;

interface Trades extends HistoricData<TradeEntry> {}

interface AssetMovements extends HistoricData<AssetMovementEntry> {}
interface LedgerActions extends HistoricData<LedgerActionEntry> {}

export interface HistoryState {
  ledgerActions: LedgerActions;
  trades: Trades;
  assetMovements: AssetMovements;
  transactions: Transactions;
}

export interface LocationRequestMeta extends TaskMeta {
  readonly location: TradeLocation;
}
export interface LedgerAction {
  readonly identifier: number;
  readonly timestamp: number;
  readonly actionType: LedgerActionType;
  readonly location: TradeLocation;
  readonly amount: BigNumber;
  readonly asset: string;
  readonly rate?: Nullable<BigNumber>;
  readonly rateAsset?: Nullable<string>;
  readonly link?: Nullable<string>;
  readonly notes?: Nullable<string>;
}

export type UnsavedAction = Omit<LedgerAction, 'identifier'>;

export type IgnoreActionType = typeof IGNORE_ACTION_TYPE[number];
export type IgnoreActionPayload = {
  readonly actionIds: string[];
  readonly type: IgnoreActionType;
};

export type FetchSource = typeof FETCH_SOURCE[number];

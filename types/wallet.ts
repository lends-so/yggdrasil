import { AppDispatch } from "@/redux/store"
import { iNotification } from "./notification"

export interface WalletClass {
  address: walletAddresses
  connect(): void
  canConnect(): iNotification
  disconnect(): void
  getAddress(): walletAddresses
}

export interface Wallet {
  name: string
  icon: string
  connect: (dispatch: AppDispatch, phrase?: string) => Promise<unknown>
  send: (dispatch: AppDispatch) => Promise<unknown>
  swap?: (dispatch: AppDispatch) => Promise<unknown>
}

export type ConnectionWallets =
  | 'xdefi'
  | 'keystore'
  | 'ledger'
  | 'metamask'
  | 'keplr'
  | 'coinbase'
  | 'brave'
  | 'walletconnect'
  | 'trustwallet'

export type Chains =
  | 'avax'
  | 'bnb'
  | 'thor'
  | 'eth'
  | 'btc'
  | 'bch'
  | 'ltc'
  | 'doge'
  | 'gaia'

export enum Chain {
  Avalanche = 'avax',
  BNB = 'bnb',
  THORChain = 'thor',
  Ethereum = 'eth',
  Bitcoin = 'btc',
  BitcoinCash = 'bch',
  Litecoin = 'ltc',
  Dogecoin = 'doge',
  Cosmos = 'gaia',
}

export type walletAddresses = Partial<Record<Chains, string>>

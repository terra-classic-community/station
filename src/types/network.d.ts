type NetworkName = string
type ChainID = string
type InterchainNetworks = Record<
  NetworkName,
  Record<ChainID, InterchainNetwork>
>

interface InterchainNetwork {
  chainID: ChainID
  lcd: string
  gasAdjustment: number
  gasPrices: Record<string, number>
  prefix: string
  baseAsset: string
  name: string
  icon: string
  coinType: "118" | "330"
  alliance?: boolean
  ibc?: {
    toTerra: string
    fromTerra: string
    ics?: {
      contract: string
      toTerra: string
      fromTerra: string
    }
    icsFromTerra?: {
      contract: string
      toTerra: string
      fromTerra: string
    }
  }
  version?: string
  isClassic?: boolean
  burnAddress?: string
  explorer: {
    address?: string
    tx?: string
    validator?: string
    block?: string
  }
}

interface TerraNetwork {
  name: NetworkName
  chainID: string
  lcd: string
  api?: string
}

type CustomNetworks = Record<NetworkName, CustomNetwork>

interface CustomNetwork extends TerraNetwork {
  preconfigure?: boolean
}

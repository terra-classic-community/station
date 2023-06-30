import { PropsWithChildren } from "react"
import { zipObj } from "ramda"
import createContext from "utils/createContext"
import { CoinBalance, useBankBalance } from "data/queries/bank"
import { useTaxCaps, useTaxRate } from "data/queries/treasury"
import { TaxParams } from "../utils"

export const [useTaxParams, TaxParamsProvider] =
  createContext<TaxParams>("useTaxParams")

const TaxParamsContext = ({ children }: PropsWithChildren<{}>) => {
  const bankBalance = useBankBalance()
  const denoms = bankBalance.map(({ denom }: CoinBalance) => denom) ?? []
  const { data: taxRate } = useTaxRate(false) || "0"
  const taxCapsState = useTaxCaps(denoms)

  const taxCaps = zipObj(
    denoms,
    taxCapsState.map(({ data }) => {
      return data
    })
  )

  return (
    <TaxParamsProvider value={{ taxRate, taxCaps } as TaxParams}>
      {children}
    </TaxParamsProvider>
  )
}

export default TaxParamsContext

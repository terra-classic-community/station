import { useTranslation } from "react-i18next"
import { useChainID, useNetworkName } from "data/wallet"
import { ChainFilter, Page } from "components/layout"
import TFMSwapContext from "./TFMSwapContext"
import TFMSwapForm from "./TFMSwapForm"
import TFMPoweredBy from "./TFMPoweredBy"
import SwapContext from "./SwapContext"
import SingleSwapContext from "./SingleSwapContext"
import SwapForm from "./SwapForm"
import TxContext from "../TxContext"

// The sequence below is required before rendering the Swap form:
// 1. `SwapContext` - Complete the network request related to swap.
// 2. `SwapSingleContext` - Complete the network request not related to multiple swap

const SwapTx = () => {
  const { t } = useTranslation()
  const networkName = useNetworkName()
  const chainID = useChainID()

  if (networkName === "mainnet" && chainID === "columbus-5") {
    return (
      <Page title={t("Swap")} small>
        <TxContext>
          <SwapContext>
            <SingleSwapContext>
              <SwapForm chainID={"columbus-5"} />
            </SingleSwapContext>
          </SwapContext>
        </TxContext>
      </Page>
    )
  }

  return (
    <Page title={t("Swap")} small extra={<TFMPoweredBy />}>
      <TFMSwapContext>
        <ChainFilter
          outside
          title={"Select a chain to perform swaps on"}
          terraOnly
        >
          {(chainID) => <TFMSwapForm chainID={chainID ?? ""} />}
        </ChainFilter>
      </TFMSwapContext>
    </Page>
  )
}

export default SwapTx

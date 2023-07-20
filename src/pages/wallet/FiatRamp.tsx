import { useState } from "react"

/* helpers */

/* components */
import { useInterchainAddresses } from "../../auth/hooks/useAddress"
import { FIAT_RAMP, GUARDARIAN_API_KEY } from "../../config/constants"
import qs from "qs"
import styles from "./FiatRamp.module.scss"
import { LoadingCircular } from "../../components/feedback"
import { capitalize } from "@mui/material"
import { useTranslation } from "react-i18next"
import { useTheme } from "../../data/settings/Theme"

const FiatRamp = () => {
  const { t } = useTranslation()
  const addresses = useInterchainAddresses()
  const [isLoading, setIsLoading] = useState(true)
  const { name: theme } = useTheme()

  if (!addresses || !GUARDARIAN_API_KEY) return null

  const guardarianRampParams = {
    partner_api_token: GUARDARIAN_API_KEY,
    default_side: "buy_crypto",
    side_toggle_disabled: "true",
    payout_address: addresses["columbus-5"],
    default_fiat_currency: "USD",
    crypto_currencies_list: JSON.stringify([
      {
        ticker: "LUNC",
        network: "LUNC",
      },
    ]),
    theme: theme,
    type: "narrow",
  }

  const guardarianUrlParams = qs.stringify(guardarianRampParams)

  const src = `${FIAT_RAMP}?${guardarianUrlParams}`
  return (
    <section className={styles.buy}>
      <h1>{capitalize(t("buy"))}</h1>
      {isLoading && (
        <div className={styles.loading}>
          <LoadingCircular size={36} thickness={2} />
        </div>
      )}
      <iframe
        className={styles.iframe}
        src={src}
        title="Guardarian"
        onLoad={() => setIsLoading(false)}
      />
    </section>
  )
}

export default FiatRamp

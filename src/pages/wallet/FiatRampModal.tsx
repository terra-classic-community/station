import { FIAT_RAMP, GUARDARIAN_API_KEY } from "config/constants"
import { useState } from "react"
import { LoadingCircular } from "components/feedback"
import styles from "./FiatRampModal.module.scss"
import qs from "qs"
import { useInterchainAddresses } from "auth/hooks/useAddress"

const FiatRampModal = () => {
  const addresses = useInterchainAddresses()
  const [isLoading, setIsLoading] = useState(true)

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
    theme: "light",
    type: "narrow",
  }

  const guardarianUrlParams = qs.stringify(guardarianRampParams)

  const src = `${FIAT_RAMP}?${guardarianUrlParams}`
  return (
    <div className={styles.container}>
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
    </div>
  )
}

export default FiatRampModal

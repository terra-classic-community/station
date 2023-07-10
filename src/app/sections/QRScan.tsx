import { useZxing } from "react-zxing"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Flex } from "../../components/layout"

const QRScan = () => {
  const navigate = useNavigate()

  const schemeUrl = {
    connectWallet: /^.*(wallet_connect|walletconnect_connect).*payload/,
    recoverWallet: /^.*(|\/\/)wallet_recover\/\?payload=/,
    send: /^.*(|\/\/)send\/\?payload=/,
  }

  const { ref } = useZxing({
    async onResult(result) {
      const data = result.getText()

      if (schemeUrl.recoverWallet.test(data)) {
        // recover
        const url = new URL(data)
        const payload = url.searchParams.get("payload")

        return navigate("/auth/import", {
          state: payload,
        })
      }

      toast.error("Not a valid QR code.", {
        toastId: "qr-code-error",
      })
    },
  })

  return (
    <Flex>
      <video ref={ref} />
    </Flex>
  )
}

export default QRScan

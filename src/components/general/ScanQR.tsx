import { useTranslation } from "react-i18next"
import { RenderButton } from "types/components"
import { Grid } from "components/layout"
import { QrReader } from "react-qr-reader"
import { ModalButton } from "../feedback"
import { useState } from "react"

const ScanQR = ({
  renderButton,
  onResult,
}: {
  renderButton: RenderButton
  onResult: any
}) => {
  const { t } = useTranslation()
  const [toggleScanQR, setToggleScanQR] = useState(false)

  return (
    <ModalButton
      title={t("Scan QR Code")}
      renderButton={renderButton}
      modalClose={toggleScanQR}
    >
      <Grid gap={20}>
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              onResult(result?.getText())
              setToggleScanQR(!toggleScanQR)
            }
          }}
          videoStyle={{ width: "100%" }}
          constraints={{ facingMode: "environment" }}
        />
      </Grid>
    </ModalButton>
  )
}

export default ScanQR

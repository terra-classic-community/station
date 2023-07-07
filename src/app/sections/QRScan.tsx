import { QrReader } from "react-qr-reader"
import { ReactComponent as QRIcon } from "styles/images/menu/QR.svg"

const QRScan = () => {
  const [result, setResult] = useState("No result")

  const handleError = (err) => {
    console.err(err)
  }

  const handleScan = (result) => {
    if (result) {
      setResult(result)
    }
  }

  const previewStyle = {
    height: 240,
    width: 320,
  }

  const render = () => {
    return (
      <QrReader
        delay={500}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    )
  }
  // const getCamera = async () => {
  //   const res = await WebViewMessage(RN_APIS.QR_SCAN)
  //   return res
  // }

  return <QRIcon style={{ width: 24, height: 24 }} onClick={render} />
}

export default QRScan

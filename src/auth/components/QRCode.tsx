import { Flex } from "components/layout"
import QRCode from "qrcode"
import { useEffect, useState } from "react"

const QRCodeGen = ({ value }: { value: string }) => {
  const [imgSrc, setImgSrc] = useState("")

  useEffect(() => {
    QRCode.toDataURL(value, (e: any, url: string) => {
      setImgSrc(url)
    })
  }, [value])

  return (
    <Flex>
      <img style={{ maxWidth: "320px" }} src={imgSrc} />
    </Flex>
  )
}

export default QRCodeGen

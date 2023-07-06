import { debug } from "utils/env"

const isMobile = (): boolean => {
  return (
    window.matchMedia("(display-mode: standalone)").matches &&
    navigator.userAgent.indexOf("Mobi") > -1
  )
}
export const sandbox =
  debug.auth || process.env.REACT_APP_SANDBOX === "true" || isMobile()

export const isMobile = (): boolean => {
  return (
    window.matchMedia("(display-mode: standalone)").matches &&
    navigator.userAgent.indexOf("Mobi") > -1
  )
}

import { useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import classNames from "classnames/bind"
import CloseIcon from "@mui/icons-material/Close"
import { mobileIsMenuOpenState } from "components/layout"
import { useNav } from "../routes"
import styles from "./Nav.module.scss"
import { useTheme, useThemeFavicon } from "data/settings/Theme"
import { isWalletBarOpen } from "pages/wallet/Wallet"
import { isMobile } from "../../utils/is"
import QrCodeIcon from "@mui/icons-material/QrCode"
import ScanQR from "../../components/general/ScanQR"
import { toast } from "react-toastify"

const cx = classNames.bind(styles)

const Nav = () => {
  useCloseMenuOnNavigate()
  const { menu } = useNav()
  const icon = useThemeFavicon()
  const [isOpen, setIsOpen] = useRecoilState(mobileIsMenuOpenState)
  const close = () => setIsOpen(false)
  const { name } = useTheme()
  const navigate = useNavigate()

  const handleScan = (result: any) => {
    const schemeUrl = {
      connectWallet: /^.*(wallet_connect|walletconnect_connect).*payload/,
      recoverWallet: /^.*(|\/\/)wallet_recover\/\?payload=/,
      send: /^.*(|\/\/)send\/\?payload=/,
    }

    if (!!result) {
      if (schemeUrl.recoverWallet.test(result)) {
        // recover
        const url = new URL(result)
        const payload = url.searchParams.get("payload")

        return navigate("/auth/import", {
          state: payload,
        })
      }
    }

    toast.error("Not a valid QR code.", {
      toastId: "qr-code-error",
    })
  }

  return (
    <nav>
      <header className={styles.header}>
        <NavLink to="/" className={classNames(styles.item, styles.logo)}>
          <img src={icon} alt="Terra Classic Station" />{" "}
          <strong className={styles.title}>Terra Classic Station</strong>
        </NavLink>
        {isMobile() && (
          <ScanQR
            renderButton={(open) => (
              <button>
                <QrCodeIcon style={{ fontSize: 18 }} onClick={open} />
              </button>
            )}
            onResult={handleScan}
          />
        )}
        {isOpen && (
          <button className={styles.toggle} onClick={close}>
            <CloseIcon />
          </button>
        )}
      </header>

      {menu.map(({ path, title, icon }) => (
        <NavLink
          to={path}
          className={({ isActive }) =>
            cx(styles.item, styles.link, { active: isActive })
          }
          key={path}
        >
          {icon}
          {title}
        </NavLink>
      ))}

      {name === "blossom" && (
        <>
          <div
            className={`${styles.background_blur_blossom} ${
              isOpen ? styles.open : ""
            }`}
          />
          <div
            className={`${styles.background_blur_blossom2} ${
              isOpen ? styles.open : ""
            }`}
          />
          <div
            className={`${styles.background_blur_blossom3} ${
              isOpen ? styles.open : ""
            }`}
          />
        </>
      )}
    </nav>
  )
}

export default Nav

/* hooks */
const useCloseMenuOnNavigate = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useRecoilState(mobileIsMenuOpenState)
  const setIsWalletOpen = useSetRecoilState(isWalletBarOpen)

  useEffect(() => {
    if (isOpen) {
      // close wallet menu on mobile
      setIsWalletOpen(false)
    }
    setIsOpen(false)
  }, [pathname, setIsOpen, setIsWalletOpen]) // eslint-disable-line react-hooks/exhaustive-deps
}

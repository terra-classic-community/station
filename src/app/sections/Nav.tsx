import { useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import classNames from "classnames/bind"
import CloseIcon from "@mui/icons-material/Close"
import { mobileIsMenuOpenState } from "components/layout"
import { useNav } from "../routes"
import styles from "./Nav.module.scss"
import { useTheme, useThemeFavicon } from "data/settings/Theme"
import { isWalletBarOpen } from "pages/wallet/Wallet"
import QrCodeIcon from "@mui/icons-material/QrCode"
import ScanQR from "../../components/general/ScanQR"
import { isWallet } from "../../auth"

const cx = classNames.bind(styles)

const Nav = () => {
  useCloseMenuOnNavigate()
  const { menu } = useNav()
  const icon = useThemeFavicon()
  const [isOpen, setIsOpen] = useRecoilState(mobileIsMenuOpenState)
  const close = () => setIsOpen(false)
  const { name } = useTheme()

  return (
    <nav>
      <header className={styles.header}>
        <NavLink to="/" className={classNames(styles.item, styles.logo)}>
          <img src={icon} alt="Terra Classic Station" />{" "}
          <strong className={styles.title}>Terra Classic Station</strong>
        </NavLink>
        {isWallet.mobile() && (
          <ScanQR
            renderButton={(open) => (
              <button>
                <QrCodeIcon style={{ fontSize: 18 }} onClick={open} />
              </button>
            )}
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

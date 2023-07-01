import { useTranslation } from "react-i18next"
import classNames from "classnames/bind"
import { Col, Page } from "components/layout"
import CommunityPool from "./CommunityPool"
import Charts from "./Charts"
import styles from "./Dashboard.module.scss"
import LunaPrice from "./LunaPrice"
import { useChainID, useNetworkName } from "../../auth/hooks/useNetwork"

const cx = classNames.bind(styles)

const Dashboard = () => {
  const { t } = useTranslation()
  const networkName = useNetworkName()
  const chainID = useChainID()

  return (
    <Page title={t("Dashboard")}>
      <Col>
        <header className={cx(styles.header, { trisect: true })}>
          {networkName === "mainnet" && chainID === "columbus-5" && (
            <LunaPrice />
          )}
          <CommunityPool />
        </header>

        <Charts />
      </Col>
    </Page>
  )
}

export default Dashboard

import { debug } from "utils/env"
import isWallet from "./isWallet"

export const sandbox =
  debug.auth || process.env.REACT_APP_SANDBOX === "true" || isWallet.mobile()

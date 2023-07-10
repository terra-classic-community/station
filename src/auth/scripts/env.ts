import { debug } from "utils/env"
import { isMobile } from "../../utils/is"

export const sandbox =
  debug.auth || process.env.REACT_APP_SANDBOX === "true" || isMobile()

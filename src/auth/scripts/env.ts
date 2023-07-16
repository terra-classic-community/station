import { debug } from "utils/env"
import is from "./is"

export const sandbox =
  debug.auth || process.env.REACT_APP_SANDBOX === "true" || is.mobile()

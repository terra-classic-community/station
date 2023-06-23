import { Vote } from "@terra-rebels/feather.js"

export interface TerraProposalItem {
  voter: string
  options: { option: Vote.Option; weight: string }[]
}

import type { Player, PlayerAbility } from "types"

export type TimelineStringConfig = {
  castTimeGroupThreshold?: number
  groupBy?: "player" | "none"
}

export type CastEvent = {
  player: Player
  ability: PlayerAbility
  castTime: number
}

export type CastEventGroup = {
  castTime: number
  castEvents: CastEvent[]
}
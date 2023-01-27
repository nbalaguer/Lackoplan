import theme from "config/theme";
import { useAppStore } from "store";
import type { Class, Player, PlayerAbility } from "types";
import { getTimeString } from "utils";
import _groupBy from 'lodash/groupBy'

type TimelineStringConfig = {
  castTimeGroupThreshold?: number
  groupBy?: "player" | "none"
}

type CastEvent = {
  player: Player
  ability: PlayerAbility
  castTime: number
}

type CastEventGroup = {
  castTime: number
  castEvents: CastEvent[]
}

export function MRTWrapStringWithClassColor(playerClass: Class, string: string) {
  const MRTColorString = theme.colors[playerClass].toLowerCase().replace("#", "ff")
  return `|c${MRTColorString}${string}|r`
}

export function MRTGetTimelineString(config: TimelineStringConfig = {}) {

  const {
    castTimeGroupThreshold = 5,
    groupBy = "none"
  } = config

  const currentState = useAppStore.getState()
  const castEvents = currentState
    .players
    .filter(player => player.isActive)
    .map(player => player
      .abilities
      .filter(ability => ability.isActive)
      .map(ability => ability
        .castTimes
        .map(castTime => ({
          player,
          ability,
          castTime,
        }))
      )
    )
    .flat(2)
    .sort((cast1, cast2) => cast1.castTime - cast2.castTime)

  if (groupBy === "none") {
    return MRTGroupCastEvents(castEvents, castTimeGroupThreshold)
      .map(castEventGroup => {
        const groupCastTime = getTimeString(castEventGroup.castTime)
        const castEventsByPlayerId = _groupBy<CastEvent>(castEventGroup.castEvents, castEvent => castEvent.player.id)
        const groupCastsString = Object.values(castEventsByPlayerId)
          .map(castEvents => {
            const playerClass = castEvents[0].player.class
            const playerName = castEvents[0].player.name
            return MRTWrapStringWithClassColor(playerClass, `${playerName} ${castEvents.map(castEvent => castEvent.ability.ability.shortName).join("+")}`)
          })
          .join(" ")
        return `{time:${groupCastTime}} ${groupCastsString}`
      })
      .join("\n")
  }

  if (groupBy === "player") {
    const castEventsByPlayerId = _groupBy<CastEvent>(castEvents, castEvent => castEvent.player.id)
    return Object.values(castEventsByPlayerId)
      .map(castEvents => {
        const playerClass = castEvents[0].player.class
        const playerName = castEvents[0].player.name
        const groupedCastEvents = MRTGroupCastEvents(castEvents, castTimeGroupThreshold)
        return [
          `${playerName}`,
          ...groupedCastEvents.map(castEventGroup => {
            const groupCastTime = getTimeString(castEventGroup.castTime)
            const playerCastString = MRTWrapStringWithClassColor(playerClass, castEventGroup.castEvents.map(castEvent => castEvent.ability.ability.shortName).join("+"))
            return `{time:${groupCastTime}} ${playerCastString}`
          })
        ]
        .join("\n")
      })
      .join("\n\n")
  }

  return ""
}

function MRTGroupCastEvents(castEvents: CastEvent[], castTimeThreshold: number) {
  const castEventGroups: CastEventGroup[] = []
  if (!castEvents.length) return castEventGroups

  castEventGroups.push({
    castTime: castEvents[0].castTime,
    castEvents: []
  })

  castEvents.forEach(castEvent => {
    const lastGroup = castEventGroups[castEventGroups.length - 1]

    if (castEvent.castTime - lastGroup.castTime <= castTimeThreshold) {
      lastGroup.castEvents.push(castEvent)
    }
    else {
      castEventGroups.push({
        castTime: castEvent.castTime,
        castEvents: [castEvent]
      })
    }
  })

  return castEventGroups
}
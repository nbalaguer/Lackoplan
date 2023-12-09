import theme from "config/theme"
import { useAppStore } from "store"
import type { Class, Player, PlayerAbility } from "types"
import { getConditionString, getTimeString } from "utils"
import _groupBy from "lodash/groupBy"

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

export function MRTWrapStringWithClassColor(
  playerClass: Class,
  string: string
) {
  const MRTColorString = theme.colors[playerClass]
    .toLowerCase()
    .replace("#", "ff")
  return `|c${MRTColorString}${string}|r`
}

/**
 * String output compatible with https://wago.io/n7l5uN3YM
 */
export function MRTGetTimelineString(config: TimelineStringConfig = {}) {
  const { castTimeGroupThreshold = 3, groupBy = "none" } = config

  const currentState = useAppStore.getState()
  const castEvents = currentState.players
    .filter((player) => player.isActive)
    .map((player) =>
      player.abilities
        .filter((ability) => ability.isActive)
        .map((ability) =>
          ability.castTimes.map((castTime) => ({
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
      .map((castEventGroup) => {
        const castEventsByPlayerId = _groupBy<CastEvent>(
          castEventGroup.castEvents,
          (castEvent) => castEvent.player.id
        )
        const groupCastsString = Object.values(castEventsByPlayerId)
          .map((playerCastEvents) => {
            const [firstCast, ...restCasts] = playerCastEvents
            const playerClass = firstCast.player.class
            const playerName = firstCast.player.name

            return [
              MRTWrapStringWithClassColor(playerClass, playerName),
              MRTWrapStringWithClassColor(
                playerClass,
                firstCast.ability.ability.shortName
              ),
              ...restCasts.flatMap((castEvent) => [
                `{spell:${castEvent.ability.ability.spellId}}`,
                MRTWrapStringWithClassColor(
                  playerClass,
                  castEvent.ability.ability.shortName
                ),
              ]),
              `{spell:${firstCast.ability.ability.spellId}}`,
            ].join(" ")
          })
          .join("  ")

        const relatedMarker = currentState.markers.findLast(
          (marker) => marker.time <= castEventGroup.castTime
        )
        const condition = relatedMarker
          ? "," + getConditionString(relatedMarker)
          : ""
        const groupCastTime = getTimeString(
          castEventGroup.castTime - (relatedMarker?.time || 0)
        )

        return `{time:${groupCastTime}${condition}} ${groupCastsString}  ` // These two spaces at the end of each line are key for the weakaura to recognize the last assignment of the line.
      })
      .join("\n")
  }

  if (groupBy === "player") {
    const castEventsByPlayerId = _groupBy<CastEvent>(
      castEvents,
      (castEvent) => castEvent.player.id
    )
    return Object.values(castEventsByPlayerId)
      .map((playerCastEvents) => {
        const playerClass = playerCastEvents[0].player.class
        const playerName = playerCastEvents[0].player.name

        const groupedCastEvents = MRTGroupCastEvents(
          playerCastEvents,
          castTimeGroupThreshold
        )

        return [
          MRTWrapStringWithClassColor(playerClass, playerName),
          ...groupedCastEvents.map((castEventGroup) => {
            const [firstCast, ...restCasts] = castEventGroup.castEvents

            const playerCastString = [
              MRTWrapStringWithClassColor(
                playerClass,
                firstCast.ability.ability.shortName
              ),
              ...restCasts.flatMap((castEvent) => [
                `{spell:${castEvent.ability.ability.spellId}}`,
                MRTWrapStringWithClassColor(
                  playerClass,
                  castEvent.ability.ability.shortName
                ),
              ]),
              `{spell:${firstCast.ability.ability.spellId}}`,
            ].join(" ")

            const relatedMarker = currentState.markers.findLast(
              (marker) => marker.time <= castEventGroup.castTime
            )
            const condition = relatedMarker
              ? "," + getConditionString(relatedMarker)
              : ""
            const groupCastTime = getTimeString(
              castEventGroup.castTime - (relatedMarker?.time || 0)
            )

            return `{time:${groupCastTime}${condition}} ${playerCastString}  `
          }),
        ].join("\n")
      })
      .join("\n\n")
  }

  return ""
}

function MRTGroupCastEvents(
  castEvents: CastEvent[],
  castTimeThreshold: number
) {
  const castEventGroups: CastEventGroup[] = []
  if (!castEvents.length) return castEventGroups

  castEventGroups.push({
    castTime: castEvents[0].castTime,
    castEvents: [],
  })

  castEvents.forEach((castEvent) => {
    const lastGroup = castEventGroups[castEventGroups.length - 1]

    if (castEvent.castTime - lastGroup.castTime <= castTimeThreshold) {
      lastGroup.castEvents.push(castEvent)
    } else {
      castEventGroups.push({
        castTime: castEvent.castTime,
        castEvents: [castEvent],
      })
    }
  })

  return castEventGroups
}

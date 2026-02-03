import { useAppStore } from "store"
import type { Marker } from "types"
import _groupBy from "lodash/groupBy"
import type { CastEvent, TimelineStringConfig } from "utils/timeline/types"
import { groupCastEvents, wrapStringWithClassColor } from "utils/timeline/utils"
import { getTimeString } from "utils"

/**
 * String output compatible with https://wago.io/n7l5uN3YM
 *
 * @deprecated Use `NSGetTimelineString` instead
 */
export function MRTGetTimelineString(config: TimelineStringConfig = {}) {
  const { castTimeGroupThreshold = 1, groupBy = "none" } = config

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
    return groupCastEvents(castEvents, castTimeGroupThreshold)
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
              wrapStringWithClassColor(playerClass, playerName),
              wrapStringWithClassColor(
                playerClass,
                firstCast.ability.ability.shortName
              ),
              ...restCasts.flatMap((castEvent) => [
                `{spell:${castEvent.ability.ability.spellId}}`,
                wrapStringWithClassColor(
                  playerClass,
                  castEvent.ability.ability.shortName
                ),
              ]),
              `{spell:${firstCast.ability.ability.spellId}}`,
            ].join(" ")
          })
          .join("  ")

        let groupCastTime = getTimeString(castEventGroup.castTime)
        let condition = ""

        if (currentState.markersEnabled) {
          const relatedMarker = currentState.markers.findLast(
            (marker) => marker.time <= castEventGroup.castTime
          )
          condition = relatedMarker
            ? "," + getMarkerString(relatedMarker)
            : ""
          groupCastTime = getTimeString(
            castEventGroup.castTime - (relatedMarker?.time || 0)
          )
        }

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

        const groupedCastEvents = groupCastEvents(
          playerCastEvents,
          castTimeGroupThreshold
        )

        return [
          wrapStringWithClassColor(playerClass, playerName),
          ...groupedCastEvents.map((castEventGroup) => {
            const [firstCast, ...restCasts] = castEventGroup.castEvents

            const playerCastString = [
              wrapStringWithClassColor(
                playerClass,
                firstCast.ability.ability.shortName
              ),
              ...restCasts.flatMap((castEvent) => [
                `{spell:${castEvent.ability.ability.spellId}}`,
                wrapStringWithClassColor(
                  playerClass,
                  castEvent.ability.ability.shortName
                ),
              ]),
              `{spell:${firstCast.ability.ability.spellId}}`,
            ].join(" ")

            let groupCastTime = getTimeString(castEventGroup.castTime)
            let condition = ""

            if (currentState.markersEnabled) {
              const relatedMarker = currentState.markers.findLast(
                (marker) => marker.time <= castEventGroup.castTime
              )
              condition = relatedMarker
                ? "," + getMarkerString(relatedMarker)
                : ""
              groupCastTime = getTimeString(
                castEventGroup.castTime - (relatedMarker?.time || 0)
              )
            }

            return `{time:${groupCastTime}${condition}} ${playerCastString}  `
          }),
        ].join("\n")
      })
      .join("\n\n")
  }

  return ""
}

function getMarkerString(marker: Marker) {
  switch (marker.type) {
    case "phase":
      return `p${marker.phase}`
    case "event":
      return `${marker.event}:${marker.spell}:${marker.counter}`
  }
}

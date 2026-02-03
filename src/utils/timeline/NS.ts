import { useAppStore } from "store"
import type { Marker } from "types"
import _groupBy from "lodash/groupBy"
import type { CastEvent, TimelineStringConfig } from "utils/timeline/types"
import { groupCastEvents/* , wrapStringWithClassColor */ } from "utils/timeline/utils"

class TimelineStringBuilder {
  private _entries: string[] = []

  addEntry(entry: string) {
    this._entries.push(entry)
  }

  getString() {
    return this._entries.join("\n")
  }
}

class TimelineEntryBuilder {
  private _entry: string = ""

  addTime(time: number) {
    this._entry += `time:${time};`
  }

  addPhase(marker: string) {
    this._entry += `ph:${marker};`
  }

  addTag(tag: string) {
    this._entry += `tag:${tag};`
  }

  addSpell(spellId: number) {
    this._entry += `spellid:${spellId};`
  }

  addText(text: string) {
    this._entry += `text:${text};`
  }

  addGlowUnit(unit: string) {
    this._entry += `glowunit:${unit};`
  }

  getString() {
    return this._entry
  }
}

/**
 * String output compatible with https://www.curseforge.com/wow/addons/northern-sky-raid-tools
 */
export function NSGetTimelineString(config: TimelineStringConfig = {}) {
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

  const timelineStringBuilder = new TimelineStringBuilder()

  if (groupBy === "none") {
    groupCastEvents(castEvents, castTimeGroupThreshold).forEach((castEventGroup) => {
      const castEventsByPlayerId = _groupBy<CastEvent>(
        castEventGroup.castEvents,
        (castEvent) => castEvent.player.id
      )

      let castTime = castEventGroup.castTime
      let marker = ""

      if (currentState.markersEnabled) {
        const relatedMarker = currentState.markers.findLast(
          (marker) => marker.time <= castEventGroup.castTime
        )

        if (relatedMarker) {
          marker = getMarkerString(relatedMarker)
          castTime = castEventGroup.castTime - relatedMarker.time
        }
      }

      Object.values(castEventsByPlayerId).forEach((playerCastEvents) => {
        for (const castEvent of playerCastEvents) {
          const timelineEntryBuilder = new TimelineEntryBuilder()
          timelineEntryBuilder.addTime(castTime)
          if (marker) {
            timelineEntryBuilder.addPhase(marker)
          }
          timelineEntryBuilder.addTag(castEvent.player.name)
          timelineEntryBuilder.addSpell(castEvent.ability.ability.spellId)

          timelineStringBuilder.addEntry(timelineEntryBuilder.getString())
        }
      })
    })

    return timelineStringBuilder.getString()
  }

  if (groupBy === "player") {
    const castEventsByPlayerId = _groupBy<CastEvent>(
      castEvents,
      (castEvent) => castEvent.player.id
    )

    Object.values(castEventsByPlayerId).forEach((playerCastEvents) => {
      // const playerClass = playerCastEvents[0].player.class
      const playerName = playerCastEvents[0].player.name

      const groupedCastEvents = groupCastEvents(
        playerCastEvents,
        castTimeGroupThreshold
      )

      timelineStringBuilder.addEntry(playerName)

      groupedCastEvents.forEach((castEventGroup) => {
        castEventGroup.castEvents.forEach((castEvent) => {
          const timelineEntryBuilder = new TimelineEntryBuilder()

          let castTime = castEventGroup.castTime
          let marker = ""

          if (currentState.markersEnabled) {
            const relatedMarker = currentState.markers.findLast(
              (marker) => marker.time <= castEventGroup.castTime
            )

            if (relatedMarker) {
              marker = getMarkerString(relatedMarker)
              castTime = castEventGroup.castTime - relatedMarker.time
            }
          }

          timelineEntryBuilder.addTime(castTime)
          if (marker) {
            timelineEntryBuilder.addPhase(marker)
          }
          timelineEntryBuilder.addTag(castEvent.player.name)
          timelineEntryBuilder.addSpell(castEvent.ability.ability.spellId)

          timelineStringBuilder.addEntry(timelineEntryBuilder.getString())
        })
      })

      timelineStringBuilder.addEntry("")
    })

    return timelineStringBuilder.getString()
  }

  return ""
}


function getMarkerString(marker: Marker) {
  switch (marker.type) {
    case "phase":
      return `ph:${marker.phase};`
    // NS note doesn't support event markers
    case "event":
      return ""
  }
}

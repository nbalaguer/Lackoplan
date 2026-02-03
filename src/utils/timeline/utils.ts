import theme from "config/theme"
import type { Class } from "types"
import type { CastEvent, CastEventGroup } from "utils/timeline/types"

export function wrapStringWithClassColor(
  playerClass: Class,
  string: string
) {
  const colorString = theme.colors[playerClass]
    .toLowerCase()
    .replace("#", "ff")
  return `|c${colorString}${string}|r`
}

export function groupCastEvents(
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

    if (castEvent.castTime - lastGroup.castTime < castTimeThreshold) {
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
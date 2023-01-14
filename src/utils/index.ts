import Color from "color"
import { v4 as uuid } from "uuid"
import type { PlayerAbility, Class, Player } from "types"
import abilities from "config/abilities"
import _cloneDeep from "lodash/cloneDeep"

export function getAccessibleValue(
  color: string,
  returnIfLight: string,
  returnIfDark: string
) {
  return Color(color).luminosity() > 0.179 ? returnIfDark : returnIfLight
}

export function getAccessibleTextColor(color: string) {
  return getAccessibleValue(color, "text-contrast-dark", "text-contrast-light")
}

export function createPlayer(playerClass: Class): Player {
  return {
    id: uuid(),
    class: playerClass,
    name: playerClass,
    abilities: abilities[playerClass].map((ability) => ({
      id: uuid(),
      ability: _cloneDeep(ability),
      originalAbility: _cloneDeep(ability),
      isActive: false,
      activeModifiers: ability.modifiers.map(() => false),
      castTimes: [],
    })),
  }
}

export function applyModifiers(playerAbility: PlayerAbility) {
  const modifiedAbility = playerAbility.originalAbility.modifiers.reduce(
    (ability, modifier, index) => {
      if (playerAbility.activeModifiers[index]) {
        modifier.process(ability)
      }
      return ability
    },
    _cloneDeep(playerAbility.originalAbility)
  )
  playerAbility.ability = modifiedAbility
}

export function getCastTimes(timeSlice: number, totalTime: number) {
  return [...Array(Math.floor(totalTime / timeSlice) + 1)].map(
    (_, i) => timeSlice * i
  )
}

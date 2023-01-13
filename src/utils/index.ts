import Color from "color"
import {v4 as uuid} from 'uuid'
import type { Ability, PlayerAbility, Class, Player } from "types"
import abilities from "config/abilities"

export function getAccessibleValue(color: string, returnIfLight: string, returnIfDark: string) {
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
    abilities: abilities[playerClass].map(createPlayerAbility),
  }
}

export function createPlayerAbility(ability: Ability): PlayerAbility {
  return {
    id: uuid(),
    ability,
    isActive: false,
    activeModifiers: ability.modifiers.map(() => false),
    castTimes: []
  }
}
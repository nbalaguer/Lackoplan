import { CLASSES } from "config/constants"

export type Class = (typeof CLASSES)[keyof typeof CLASSES]

export type Ability = {
  wowheadLink?: string
  name: string
  spellId: number
  shortName: string
  cooldown: number // In seconds
  icon: string
  modifiers: AbilityModifier[]
}

export type AbilityModifier = {
  icon: string
  description?: string
  wowheadLink?: string
  dependants?: number[]
  dependsOn?: number[]
  exclusiveWith?: number[]
  process: (ability: Ability) => void
}

export type PlayerAbility = {
  id: string
  ability: Ability
  readonly originalAbility: Ability
  isActive: boolean
  activeModifiers: boolean[]
  castTimes: number[]
}

export type Player = {
  id: string
  name: string
  class: Class
  abilities: PlayerAbility[]
  isActive: boolean
}

export type ExportableProps = {
  duration: number
  userNote: string
  players: {
    name: string
    class: Class
    isActive: boolean
    abilities: {
      name: string
      isActive: boolean
      activeModifiers: boolean[]
      castTimes: number[]
    }[]
  }[]
  overlays?: string[]
}

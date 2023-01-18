import { CLASSES } from "config/constants"

export type Class = (typeof CLASSES)[keyof typeof CLASSES]

export type Ability = {
  name: string
  shortName: string
  cooldown: number // seconds
  icon: string
  modifiers: AbilityModifier[]
}

export type AbilityModifier = {
  icon: string
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
}

export type ExportableProps = {
  duration: number
  players: {
    name: string
    class: Class
    abilities: {
      isActive: boolean
      activeModifiers: boolean[]
      castTimes: number[]
    }[]
  }[]
  overlays: string[]
}
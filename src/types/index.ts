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
  markers: Marker[]
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

type PhaseMarker = {
  id: string
  type: "phase"
  time: number
  phase: number
}

type EventMarker = {
  id: string
  type: "event"
  time: number
  event: string
  spell: number
  counter: number
}

export type Marker = PhaseMarker | EventMarker

export type MarkerUpdate =
  | Partial<Pick<PhaseMarker, "time" | "phase">>
  | Partial<Pick<EventMarker, "time" | "event" | "spell" | "counter">>

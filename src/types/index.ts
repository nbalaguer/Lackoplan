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
  spec?: string
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

type ExportablePropsV0 = {
  version: undefined
  duration: number
  userNote: undefined
  markers: undefined
  markersEnabled: undefined
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

type ExportablePropsV1 = {
  version: undefined
  duration: number
  userNote: string
  markers: Marker[]
  markersEnabled: boolean
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

type ExportablePropsV2 = {
  version: 2
  duration: number
  userNote: string
  markers: Marker[]
  markersEnabled: boolean
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
  overlays?: Overlay[]
}

export type ExportableProps =
  | ExportablePropsV0
  | ExportablePropsV1
  | ExportablePropsV2

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
  | Pick<PhaseMarker, "type"> & Partial<Pick<PhaseMarker, "time" | "phase">>
  | Pick<EventMarker, "type"> & Partial<Pick<EventMarker, "time" | "event" | "spell" | "counter">>


export type Crop = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type Overlay = {
  imgSrc: string;
  crop: Crop;
  opacity: number;
}
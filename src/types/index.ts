import { CLASSES } from "config/constants"

export type Class = typeof CLASSES[keyof typeof CLASSES]

export interface Ability {
  name: string,
  shortName: string,
  cooldown: number, // seconds
  icon: string,
}

export interface AbilityWithModifiers extends Ability {
  modifiers: ((x: number) => number)[],
}
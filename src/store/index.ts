import { Ability, Class } from "types"
import { create } from "zustand"

type AbilitySequence = {
  ability: Ability
  castTimes: number[]
}

type Player = {
  name: string
  class: Class
  abilities: AbilitySequence[]
}

type AppStore = {
  duration: number // seconds
  players: Player[]
  casts: AbilitySequence[]
}

export const useAppStore = create<AppStore>()((set) => ({
  duration: 120,
  players: [],
  casts: [],
}))

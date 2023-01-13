import deepmerge from "deepmerge"
import _cloneDeep from "lodash/cloneDeep"
import type { PlayerAbility, Player } from "types"
import { applyModifiers, getTimeFractions } from "utils"
import { create } from "zustand"

type AppStore = {
  duration: number // seconds
  players: Player[]
  casts: PlayerAbility[]
  addPlayer: (player: Player) => void
  removePlayer: (playerId: string) => void
  toggleAbility: (playerId: string, abilityId: string) => void
  changePlayerName: (playerId: string, name: string) => void
  toggleAbilityModifier: (
    playerId: string,
    abilityId: string,
    modifierIndex: number
  ) => void
}

export const useAppStore = create<AppStore>()((set) => ({
  duration: 60 * 9 + 17,
  players: [],
  casts: [],

  // actions
  addPlayer: (player: Player) =>
    set((state) => deepmerge(state, { players: [player] })),

  removePlayer: (playerId: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)

      nextState.players = nextState.players.filter(
        (player) => player.id !== playerId
      )

      return nextState
    }),

  toggleAbility: (playerId: string, abilityId: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const player = nextState.players.find((player) => player.id === playerId)
      if (!player) return state
      const ability = player.abilities.find(
        (ability) => ability.id === abilityId
      )
      if (!ability) return state

      ability.isActive = !ability.isActive

      return nextState
    }),

  changePlayerName: (playerId: string, name: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const player = nextState.players.find((player) => player.id === playerId)
      if (!player) return state

      player.name = name

      return nextState
    }),

  toggleAbilityModifier: (
    playerId: string,
    abilityId: string,
    modifierIndex: number
  ) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const player = nextState.players.find((player) => player.id === playerId)
      if (!player) return state
      const playerAbility = player.abilities.find(
        (ability) => ability.id === abilityId
      )
      if (!playerAbility) return state

      playerAbility.activeModifiers[modifierIndex] =
        !playerAbility.activeModifiers[modifierIndex]
      applyModifiers(playerAbility)
      playerAbility.castTimes = getTimeFractions(
        playerAbility.ability.cooldown,
        state.duration
      )

      return nextState
    }),
}))

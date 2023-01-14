import deepmerge from "deepmerge"
import _cloneDeep from "lodash/cloneDeep"
import type { PlayerAbility, Player } from "types"
import { applyModifiers, getCastTimes } from "utils"
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
  updateCastTime: (
    playerId: string,
    abilityId: string,
    castIndex: number,
    newCastTime: number
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
      const playerAbility = getPlayerAbilityFromStore(nextState, playerId, abilityId)
      if (!playerAbility) return state

      playerAbility.isActive = !playerAbility.isActive
      if (playerAbility.isActive) {
        applyModifiers(playerAbility)
        playerAbility.castTimes = getCastTimes(
          playerAbility.ability.cooldown,
          state.duration
        )
      }

      return nextState
    }),

  changePlayerName: (playerId: string, name: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const player = getPlayerFromStore(nextState, playerId)
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
      const playerAbility = getPlayerAbilityFromStore(nextState, playerId, abilityId)
      if (!playerAbility) return state

      playerAbility.activeModifiers[modifierIndex] =
        !playerAbility.activeModifiers[modifierIndex]
      applyModifiers(playerAbility)
      playerAbility.castTimes = getCastTimes(
        playerAbility.ability.cooldown,
        state.duration
      )

      return nextState
    }),

  updateCastTime: (
    playerId: string,
    abilityId: string,
    castIndex: number,
    newCastTime: number,
  ) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const playerAbility = getPlayerAbilityFromStore(nextState, playerId, abilityId)
      if (!playerAbility) return state
      playerAbility.castTimes[castIndex] = newCastTime
      nudgeCastTimesLeft(playerAbility, castIndex)
      adjustCastTimes(playerAbility, state.duration)
      return nextState
    }),
}))

function nudgeCastTimesLeft(playerAbility: PlayerAbility, from: number) {
  if (from === 0) return
  for (let i = from - 1; i >= 0; i--) {
    const cooldown = playerAbility.ability.cooldown
    const timeDifference = playerAbility.castTimes[i + 1] - playerAbility.castTimes[i]
    if (timeDifference < cooldown) {
      playerAbility.castTimes[i] = playerAbility.castTimes[i] - (cooldown - timeDifference)
    }
  }
}

function adjustCastTimes(playerAbility: PlayerAbility, duration: number) {
  const cooldown = playerAbility.ability.cooldown

  if (playerAbility.castTimes[0] < 0) playerAbility.castTimes[0] = 0

  playerAbility.castTimes.slice(1).forEach((castTime, index) => {
    const prevCastTime = playerAbility.castTimes[index]
    const timeDifference = castTime - prevCastTime
    if (timeDifference < cooldown) {
      playerAbility.castTimes[index + 1] = castTime + (cooldown - timeDifference)
    }
  })

  playerAbility.castTimes = playerAbility.castTimes.filter(castTime => castTime <= duration + 5)

  if (duration - 5 - playerAbility.castTimes[playerAbility.castTimes.length - 1] >= cooldown) {
    playerAbility.castTimes.push(duration - 5)
  }
}

export function getPlayerFromStore(state: AppStore, playerId: string) {
  return state.players.find(player => player.id === playerId)
}

export function getPlayerAbilityFromStore(state: AppStore, playerId: string, abilityId: string) {
  const player = getPlayerFromStore(state, playerId)
  if (!player) return
  const playerAbility = player.abilities.find(ability => ability.id === abilityId)
  return playerAbility
}
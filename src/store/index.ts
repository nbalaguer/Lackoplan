import deepmerge from "deepmerge"
import _cloneDeep from "lodash/cloneDeep"
import { v4 as uuid } from "uuid"
import type { PlayerAbility, Player, ExportableProps } from "types"
import { applyModifiers, createPlayer, getCastTimes } from "utils"
import { create } from "zustand"

const initialUserNote = `
# Hi!

Click on the edit button to add your own notes.

Use **all** the [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) you want!.
`

type AppStore = {
  duration: number // seconds
  userNote: string
  players: Player[]
  casts: PlayerAbility[]
  overlays: string[]
  exportState: (includeOverlays?: boolean) => ExportableProps
  importState: (stateConfig: ExportableProps) => void
  addPlayer: (player: Player) => void
  duplicatePlayer: (playerId: string) => void
  removePlayer: (playerId: string) => void
  togglePlayer: (playerId: string) => void
  movePlayer: (playerId: string, amount: number) => void
  toggleAbility: (playerId: string, abilityId: string) => void
  changePlayerName: (playerId: string, name: string) => void
  toggleAbilityModifier: (
    playerId: string,
    abilityId: string,
    modifierIndex: number
  ) => void
  updateCastTime: (options: {
    playerId: string
    abilityId: string
    castIndex: number
    newCastTime: number
    constrain?: boolean
    replicateLeft?: boolean
  }) => void
  setDuration: (duration: number) => void
  setUserNote: (userNote: string) => void
  setOverlay: (index: number, url: string) => void
}

export const useAppStore = create<AppStore>()((set, get) => ({
  duration: 60 * 9 + 17,
  userNote: initialUserNote,
  players: [],
  casts: [],
  overlays: ["", "", ""],

  exportState: (includeOverlays = false) => {
    const currentState = get()
    return getExportData(currentState, includeOverlays)
  },

  importState: (stateConfig: ExportableProps) =>
    set((state) => constructState(state, stateConfig)),

  setDuration: (duration: number) =>
    set((state) => deepmerge(state, { duration })),

  setUserNote: (userNote: string) =>
    set((state) => deepmerge(state, { userNote })),

  setOverlay: (index: number, url: string) =>
    set((state) => {
      const newState = _cloneDeep(state)
      newState.overlays[index] = url
      return newState
    }),

  addPlayer: (player: Player) =>
    set((state) => deepmerge(state, { players: [player] })),

  duplicatePlayer: (playerId: string) =>
    set((state) => {
      const playerIndex = state.players.findIndex(
        (player) => player.id === playerId
      )

      if (playerIndex != -1) {
        const playerClone = _cloneDeep(state.players[playerIndex])
        playerClone.id = uuid()

        const nextState = _cloneDeep(state)
        nextState.players.splice(playerIndex, 0, playerClone)

        return nextState
      } else return state
    }),

  removePlayer: (playerId: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)

      nextState.players = nextState.players.filter(
        (player) => player.id !== playerId
      )

      return nextState
    }),

  togglePlayer: (playerId: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const player = getPlayerFromStore(nextState, playerId)
      if (!player) return state
      player.isActive = !player.isActive
      return nextState
    }),

  movePlayer: (playerId: string, amount: number) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const playerPosition = nextState.players.findIndex(
        (player) => player.id === playerId
      )

      if (playerPosition < 0) return state

      const player = getPlayerFromStore(nextState, playerId) as Player // If playerPosition exists, player exists. We're looking for the same Id
      const newPlayerPosition = Math.max(0, playerPosition + amount)

      nextState.players = nextState.players.filter(
        (player) => player.id !== playerId
      )
      nextState.players.splice(newPlayerPosition, 0, player)

      return nextState
    }),

  toggleAbility: (playerId: string, abilityId: string) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const playerAbility = getPlayerAbilityFromStore(
        nextState,
        playerId,
        abilityId
      )
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
      const playerAbility = getPlayerAbilityFromStore(
        nextState,
        playerId,
        abilityId
      )
      if (!playerAbility) return state

      // If the modifier depends on another modifier, check if that modifier is active
      if (
        playerAbility.ability.modifiers[modifierIndex].dependsOn
          ?.map((modIndex) => playerAbility.activeModifiers[modIndex])
          .some((mod) => !mod)
      )
        return state

      playerAbility.activeModifiers[modifierIndex] =
        !playerAbility.activeModifiers[modifierIndex]

      updateModifiers(playerAbility, modifierIndex)
      applyModifiers(playerAbility)

      playerAbility.castTimes = getCastTimes(
        playerAbility.ability.cooldown,
        state.duration
      )

      return nextState
    }),

  updateCastTime: ({
    playerId,
    abilityId,
    castIndex,
    newCastTime,
    constrain = false,
    replicateLeft = false,
  }) =>
    set((state) => {
      const nextState = _cloneDeep(state)
      const playerAbility = getPlayerAbilityFromStore(
        nextState,
        playerId,
        abilityId
      )
      if (!playerAbility) return state

      const duration = state.duration
      updateCastTime(playerAbility, castIndex, newCastTime, duration, constrain)
      adjustLeft(playerAbility, castIndex)
      adjustRight(playerAbility, castIndex, duration, replicateLeft)

      return nextState
    }),
}))

function updateCastTime(
  playerAbility: PlayerAbility,
  castIndex: number,
  newCastTime: number,
  duration: number,
  constrain: boolean
) {
  if (newCastTime < 0) {
    playerAbility.castTimes[castIndex] = 0
    return
  }

  if (newCastTime > duration) {
    playerAbility.castTimes[castIndex] = duration
    return
  }

  if (constrain) {
    const cooldown = playerAbility.ability.cooldown
    if (
      castIndex > 0 &&
      newCastTime - playerAbility.castTimes[castIndex - 1] < cooldown
    ) {
      playerAbility.castTimes[castIndex] =
        playerAbility.castTimes[castIndex - 1] + cooldown
      return
    }
    if (
      castIndex < playerAbility.castTimes.length - 1 &&
      playerAbility.castTimes[castIndex + 1] - newCastTime < cooldown
    ) {
      playerAbility.castTimes[castIndex] =
        playerAbility.castTimes[castIndex + 1] - cooldown
      return
    }
  }

  playerAbility.castTimes[castIndex] = newCastTime
}

function adjustLeft(playerAbility: PlayerAbility, from: number) {
  if (from === 0) return
  for (let i = from - 1; i >= 0; i--) {
    const cooldown = playerAbility.ability.cooldown
    const timeDifference =
      playerAbility.castTimes[i + 1] - playerAbility.castTimes[i]
    if (timeDifference < cooldown) {
      playerAbility.castTimes[i] =
        playerAbility.castTimes[i] - (cooldown - timeDifference)
    }
  }
}

function adjustRight(
  playerAbility: PlayerAbility,
  castIndex: number,
  duration: number,
  replicateLeft: boolean
) {
  const cooldown = playerAbility.ability.cooldown

  if (playerAbility.castTimes[0] < 0) playerAbility.castTimes[0] = 0

  playerAbility.castTimes.slice(1).forEach((castTime, index) => {
    const prevCastTime = playerAbility.castTimes[index]
    const timeDifference = castTime - prevCastTime
    if (timeDifference < cooldown || (replicateLeft && index + 1 > castIndex)) {
      playerAbility.castTimes[index + 1] =
        playerAbility.castTimes[index] + cooldown
    }
  })

  playerAbility.castTimes = playerAbility.castTimes.filter(
    (castTime) => castTime < duration
  )

  if (
    duration - playerAbility.castTimes[playerAbility.castTimes.length - 1] >
    cooldown
  ) {
    playerAbility.castTimes.push(duration)
  }
}

function getExportData(
  state: AppStore,
  includeOverlays: boolean
): ExportableProps {
  const players = state.players.map((player) => ({
    name: player.name,
    isActive: player.isActive,
    class: player.class,
    abilities: player.abilities.map((playerAbility) => ({
      name: playerAbility.originalAbility.name,
      isActive: playerAbility.isActive,
      activeModifiers: playerAbility.activeModifiers,
      castTimes: playerAbility.castTimes,
    })),
  }))

  const exportData: ExportableProps = {
    duration: state.duration,
    userNote: state.userNote,
    players,
  }

  if (includeOverlays) exportData.overlays = state.overlays

  return exportData
}

function constructState(
  state: AppStore,
  stateConfig: ExportableProps
): AppStore {
  const newState = _cloneDeep(state)

  // Allow for importing data with no overlays without overwriting existing overlays
  if (stateConfig.overlays) newState.overlays = stateConfig.overlays

  newState.duration = stateConfig.duration

  // Properties added after initial release.
  // Check if they exist before importing for backwards compatibility
  if (stateConfig.userNote) newState.userNote = stateConfig.userNote
  // ----------------------------------------------------------------

  newState.players = stateConfig.players.map((playerConfig) => {
    const player = createPlayer(playerConfig.class)
    player.name = playerConfig.name
    player.isActive = playerConfig.isActive
    player.abilities.forEach((playerAbility) => {
      const abilityConfig = playerConfig.abilities.find(
        (ability) => ability.name === playerAbility.originalAbility.name
      )
      if (abilityConfig) {
        playerAbility.isActive = abilityConfig.isActive
        playerAbility.castTimes = abilityConfig.castTimes
        playerAbility.activeModifiers = abilityConfig.activeModifiers
        applyModifiers(playerAbility)
      }
    })
    return player
  })

  return newState
}

function deactivateDependentModifiers(
  playerAbility: PlayerAbility,
  modifierIndex: number
) {
  playerAbility.ability.modifiers[modifierIndex].dependants
    ?.filter((modIndex) => playerAbility.activeModifiers[modIndex])
    .forEach((modIndex) => {
      playerAbility.activeModifiers[modIndex] = false
      deactivateDependentModifiers(playerAbility, modIndex)
    })
}

function deactivateExclusiveModifiers(
  playerAbility: PlayerAbility,
  modifierIndex: number
) {
  playerAbility.ability.modifiers[modifierIndex].exclusiveWith
    ?.filter((modIndex) => playerAbility.activeModifiers[modIndex])
    .forEach((modIndex) => {
      playerAbility.activeModifiers[modIndex] = false
      deactivateDependentModifiers(playerAbility, modIndex)
    })
}

function updateModifiers(playerAbility: PlayerAbility, modifierIndex: number) {
  if (playerAbility.activeModifiers[modifierIndex]) {
    deactivateExclusiveModifiers(playerAbility, modifierIndex)
  } else {
    deactivateDependentModifiers(playerAbility, modifierIndex)
  }
}

export function getPlayerFromStore(state: AppStore, playerId: string) {
  return state.players.find((player) => player.id === playerId)
}

export function getPlayerAbilityFromStore(
  state: AppStore,
  playerId: string,
  abilityId: string
) {
  const player = getPlayerFromStore(state, playerId)
  if (!player) return
  const playerAbility = player.abilities.find(
    (ability) => ability.id === abilityId
  )
  return playerAbility
}

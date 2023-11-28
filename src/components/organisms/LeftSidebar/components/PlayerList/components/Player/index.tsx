import React, { useCallback, useRef, forwardRef } from "react"
import type { Player } from "types"
import { getPlayerFromStore, useAppStore } from "store"
import PlayerAbility from "../PlayerAbility"
import { motion } from "framer-motion"
import PlayerHeader from "../PlayerHeader"
import theme from "config/theme"
import _isEqual from "lodash/isEqual"
import PlayerActions from "../PlayerActions"

type PlayerProps = {
  playerId: string
  isFirst: boolean
  isLast: boolean
}

const Player = forwardRef<HTMLDivElement, PlayerProps>((props, ref) => {
  const { playerId, isFirst, isLast } = props

  // Ref for mantaining last player value before removing, so AnimatePresence works properly
  const playerRef = useRef<Player>()

  const playerState = useAppStore(
    (state) => getPlayerFromStore(state, playerId),
    _isEqual
  )
  const removePlayer = useAppStore((state) => state.removePlayer)
  const toggleAbility = useAppStore((state) => state.toggleAbility)
  const changePlayerName = useAppStore((state) => state.changePlayerName)
  const togglePlayer = useAppStore((state) => state.togglePlayer)
  const movePlayer = useAppStore((state) => state.movePlayer)
  const duplicatePlayer = useAppStore((state) => state.duplicatePlayer)

  const player = playerState || playerRef.current

  const handleRemove = useCallback(() => {
    if (!player) return
    playerRef.current = player
    removePlayer(playerId)
  }, [player, playerId, removePlayer])

  const handleChangeName = useCallback(
    (newName: string) => {
      changePlayerName(playerId, newName)
    },
    [changePlayerName, playerId]
  )

  const handleToggle = useCallback(() => {
    togglePlayer(playerId)
  }, [playerId, togglePlayer])

  const handleMoveUp = useCallback(() => {
    movePlayer(playerId, -1)
  }, [movePlayer, playerId])

  const handleMoveDown = useCallback(() => {
    movePlayer(playerId, 1)
  }, [movePlayer, playerId])

  const handleDuplicate = useCallback(() => {
    duplicatePlayer(playerId)
  }, [duplicatePlayer, playerId])

  if (!player) return null

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: player.isActive ? 1 : 0.6 }}
      exit={{ opacity: 0 }}
      transition={{
        opacity: { duration: 0.1 },
      }}
      style={{
        borderColor: player.isActive
          ? theme.colors[player.class]
          : "transparent",
      }}
      className="grid grid-cols-[1fr,auto] grid-rows-[auto,1fr] border-l-[5px] pl-3"
      ref={ref}
    >
      <PlayerHeader
        player={player}
        onChangeName={handleChangeName}
        onToggle={handleToggle}
      />
      <PlayerActions
        onRemove={handleRemove}
        disableMoveUp={isFirst}
        onMoveUp={handleMoveUp}
        disableMoveDown={isLast}
        onMoveDown={handleMoveDown}
        onDuplicate={handleDuplicate}
      />
      <div className="grid grid-cols-5 items-start gap-1 pr-2 pt-2">
        {player.abilities.map((playerAbility) => {
          return (
            <PlayerAbility
              key={playerAbility.id}
              player={player}
              playerAbility={playerAbility}
              onToggleAbility={() => toggleAbility(player.id, playerAbility.id)}
            />
          )
        })}
      </div>
    </motion.div>
  )
})

Player.displayName = "Player"

export default Player

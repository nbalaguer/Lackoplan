import React, { useCallback, useRef, forwardRef } from 'react'
import type { Player } from 'types'
import { useAppStore } from 'store'
import PlayerAbility from '../PlayerAbility'
import {motion} from 'framer-motion'
import PlayerHeader from '../PlayerHeader'

type PlayerProps = {
  playerId: string
}

const Player = forwardRef<HTMLDivElement, PlayerProps>((props, ref) => {
  const {
    playerId,
  } = props

  // Ref for mantaining last player value before removing, so AnimatePresence works properly
  const playerRef = useRef<Player>()

  const playerState = useAppStore((state) => state.players.find(player => player.id === playerId))
  const removePlayer = useAppStore((state) => state.removePlayer)
  const toggleAbility = useAppStore((state) => state.toggleAbility)
  const changePlayerName = useAppStore((state) => state.changePlayerName)

  const player = playerState || playerRef.current

  const handleRemove = useCallback(() => {
    if (!player) return
    playerRef.current = player
    removePlayer(player?.id)
  }, [player, removePlayer])

  const handleChangeName = useCallback((newName: string) => {
    if (!player) return
    changePlayerName(player.id, newName)
  }, [changePlayerName, player])

  if (!player) return null

  return (
    <motion.div
      layout
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{
        opacity: {duration: 0.1},
      }}
      className="p-2 space-y-2 border-slate-700 border-2"
      ref={ref}
    >
      <PlayerHeader
        player={player}
        onRemove={handleRemove}
        onChangeName={handleChangeName}
      />
      <div className="grid grid-cols-4 gap-2 items-start">
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
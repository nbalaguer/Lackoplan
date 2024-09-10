import React, { useCallback, forwardRef } from "react"
import type { Player } from "types"
import { getPlayerFromStore, useAppStore } from "store"
import PlayerAbility from "../PlayerAbility"
import { motion } from "framer-motion"
import PlayerHeader from "../PlayerHeader"
import theme from "config/theme"
import _omit from "lodash/omit"
import useLatestValue from "hooks/useLatestValue"
import useDeep from "hooks/useDeep"

type PlayerProps = {
  playerId: string
  isFirst: boolean
  isLast: boolean
}

const Player = forwardRef<HTMLDivElement, PlayerProps>((props, ref) => {
  const { playerId, isFirst, isLast } = props

  const storePlayer = useAppStore(
    useDeep((state) => {
      const player = getPlayerFromStore(state, playerId)
      if (!player) return

      return {
        name: player.name,
        isActive: player.isActive,
        class: player.class,
        abilityIds: player.abilities.map((ability) => ability.id),
      }
    })
  )
  // Mantain last known player value so AnimatePresence works properly
  const player = useLatestValue(storePlayer)

  const removePlayer = useAppStore((state) => state.removePlayer)
  const handleRemove = useCallback(() => {
    removePlayer(playerId)
  }, [removePlayer, playerId])

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
      className="grid grid-cols-[minmax(0,1fr)] border-l-[5px] pl-3 pb-1 gap-1"
      ref={ref}
    >
      <PlayerHeader
        playerId={playerId}
        name={player.name}
        isActive={player.isActive}
        onRemove={handleRemove}
        disableMoveUp={isFirst}
        disableMoveDown={isLast}
      />
      <div className="grid grid-cols-[repeat(7,minmax(0,auto))] gap-1 justify-start">
        {player.abilityIds?.map((playerAbilityId) => {
          return (
            <PlayerAbility
              key={playerAbilityId}
              playerId={playerId}
              playerAbilityId={playerAbilityId}
            />
          )
        })}
      </div>
    </motion.div>
  )
})

Player.displayName = "Player"

export default React.memo(Player)

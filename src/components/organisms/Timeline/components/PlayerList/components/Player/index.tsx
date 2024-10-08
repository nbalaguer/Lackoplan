import React from "react"
import Color from "color"
import theme from "config/theme"
import { useAppStore } from "store"
import _isEqual from "lodash/isEqual"
import AbilitySequence from "../AbilitySequence"
import { AnimatePresence, motion } from "framer-motion"
import useDeep from "hooks/useDeep"

function Player(props: { playerId: string }) {
  const { playerId } = props

  const playerData = useAppStore(
    useDeep((state) => {
      const player = state.players.find((player) => player.id === playerId)
      if (!player) return
      return {
        name: player.name,
        class: player.class,
        abilityData: player.abilities.map((ability) => ({
          id: ability.id,
          isActive: ability.isActive,
        })),
      }
    })
  )

  if (!playerData) return null

  return (
    <motion.div
      layout
      transition={{ duration: 0.2 }}
      className="py-0.5"
      style={{
        backgroundColor: Color(theme.colors[playerData.class])
          .alpha(0.1)
          .string(),
      }}
    >
      <motion.div layout className="px-2 text-xs font-medium">
        {playerData.name}
      </motion.div>
      <div>
        <AnimatePresence>
          {playerData.abilityData
            .filter((ability) => ability.isActive)
            .map((ability) => {
              return (
                <AbilitySequence
                  key={ability.id}
                  playerId={playerId}
                  abilityId={ability.id}
                />
              )
            })}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Player

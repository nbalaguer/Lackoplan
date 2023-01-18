import React from "react"
import WowheadIcon from "components/atoms/WowheadIcon"
import { useAppStore } from "store"
import _isEqual from "lodash/isEqual"
import AbilityCast from "../AbilityCast"
import { motion } from "framer-motion"

function AbilitySequence(props: { playerId: string; abilityId: string }) {
  const { playerId, abilityId } = props

  const abilityData = useAppStore((state) => {
    const player = state.players.find((player) => player.id === playerId)
    if (!player) return
    const playerAbility = player.abilities.find(
      (ability) => ability.id === abilityId
    )
    if (!playerAbility) return
    return {
      icon: playerAbility.ability.icon,
      numCasts: playerAbility.castTimes.length,
    }
  }, _isEqual)

  if (!abilityData) return null

  return (
    <motion.div layout className="relative flex select-none">
      <WowheadIcon name={abilityData.icon} className="invisible" size="small" />
      {[...Array(abilityData.numCasts)].map((_, index) => {
        return (
          <AbilityCast
            key={index}
            playerId={playerId}
            abilityId={abilityId}
            castIndex={index}
          />
        )
      })}
    </motion.div>
  )
}

export default AbilitySequence

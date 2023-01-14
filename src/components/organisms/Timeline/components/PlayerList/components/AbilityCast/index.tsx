import React, { useCallback, useEffect } from "react"
import WowheadIcon from "components/atoms/WowheadIcon"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { getPlayerAbilityFromStore, useAppStore } from "store"
import useMouseOffset from "hooks/useMouseOffset"

function AbilityCast(props: {
  playerId: string
  abilityId: string
  castIndex: number
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const { playerId, abilityId, castIndex, containerRef } = props

  const updateCastTime = useAppStore((state) => state.updateCastTime)
  const duration = useAppStore((state) => state.duration)
  const abilityIcon = useAppStore((state) => {
    const playerAbility = getPlayerAbilityFromStore(state, playerId, abilityId)
    if (!playerAbility) return
    return playerAbility.ability.icon
  })

  const leftMotionValue = useMotionValue("0%")
  const leftSpring = useSpring(leftMotionValue, {
    damping: 50,
    mass: 0.3,
    stiffness: 2000,
  })

  useEffect(() => {
    const playerAbility = getPlayerAbilityFromStore(
      useAppStore.getState(),
      playerId,
      abilityId
    )
    if (!playerAbility) return
    leftSpring.jump((playerAbility.castTimes[castIndex] / duration) * 100 + "%")

    useAppStore.subscribe((state, prevState) => {
      const playerAbility = getPlayerAbilityFromStore(
        state,
        playerId,
        abilityId
      )
      const prevPlayerAbility = getPlayerAbilityFromStore(
        prevState,
        playerId,
        abilityId
      )
      if (!playerAbility || !prevPlayerAbility) return
      const cooldownChanged =
        playerAbility.ability.cooldown !== prevPlayerAbility.ability.cooldown
      const newSpringValue =
        (playerAbility.castTimes[castIndex] / duration) * 100 + "%"
      if (cooldownChanged) {
        leftSpring.jump(newSpringValue)
      } else {
        leftSpring.set(newSpringValue)
      }
    })
  }, [abilityId, castIndex, duration, leftSpring, playerId])

  const handleMouseOffset = useCallback(
    (offsetX: number) => {
      const currentPlayerAbility = getPlayerAbilityFromStore(
        useAppStore.getState(),
        playerId,
        abilityId
      )
      if (!containerRef.current || !currentPlayerAbility) return

      const containerWidth = containerRef.current.clientWidth
      const currentCastTime = currentPlayerAbility.castTimes[castIndex]
      const newCastTime =
        currentCastTime + duration * (offsetX / containerWidth)
      updateCastTime(playerId, abilityId, castIndex, newCastTime)
    },
    [abilityId, castIndex, containerRef, duration, playerId, updateCastTime]
  )

  const start = useMouseOffset(handleMouseOffset)

  return (
    <motion.div
      className="absolute top-0"
      onMouseDown={start}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.2,
      }}
      style={{
        left: leftSpring,
      }}
    >
      <WowheadIcon
        name={abilityIcon || ""}
        size="small"
        className="pointer-events-none"
      />
    </motion.div>
  )
}

export default AbilityCast

import React, { useEffect, useState } from "react"
import WowheadIcon from "components/atoms/WowheadIcon"
import { motion, useSpring } from "framer-motion"
import { getPlayerAbilityFromStore, useAppStore } from "store"
import useTrackMouseOffset from "hooks/useMouseOffset"
import useTimelineContext from "components/organisms/Timeline/context/useTimelineContext"
import _debounce from "lodash/debounce"
import TimestampHint from "./TimestampHint"

function AbilityCast(props: {
  playerId: string
  abilityId: string
  castIndex: number
}) {
  const { playerId, abilityId, castIndex } = props

  const { panelWidth } = useTimelineContext()

  const [isDragging, setIsDragging] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const showTimestamp = isDragging || isHovering

  const updateCastTime = useAppStore((state) => state.updateCastTime)
  const duration = useAppStore((state) => state.duration)
  const abilityIcon = useAppStore((state) => {
    const playerAbility = getPlayerAbilityFromStore(state, playerId, abilityId)
    if (!playerAbility) return
    return playerAbility.ability.icon
  })

  const x = useSpring(0, {
    bounce: 0,
    stiffness: 1000,
    damping: 50,
  })

  useEffect(() => {
    const playerAbility = getPlayerAbilityFromStore(
      useAppStore.getState(),
      playerId,
      abilityId
    )
    if (!playerAbility || !panelWidth) return
    x.jump((panelWidth * playerAbility.castTimes[castIndex]) / duration)

    return useAppStore.subscribe((state, prevState) => {
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
      if (!playerAbility || !prevPlayerAbility || !panelWidth) return

      const cooldownChanged =
        playerAbility.ability.cooldown !== prevPlayerAbility.ability.cooldown
      const newX = (panelWidth * playerAbility.castTimes[castIndex]) / duration

      if (cooldownChanged) {
        x.jump(newX)
      } else {
        x.set(newX)
      }
    })
  }, [abilityId, castIndex, duration, x, playerId, panelWidth])

  function handleMouseOffset(event: MouseEvent, offsetX: number) {
    const currentPlayerAbility = getPlayerAbilityFromStore(
      useAppStore.getState(),
      playerId,
      abilityId
    )
    if (!panelWidth || !currentPlayerAbility) return

    const multiplier = event.altKey ? 0.1 : 1

    const currentCastTime = currentPlayerAbility.castTimes[castIndex]
    const newCastTime =
      currentCastTime + duration * (offsetX / panelWidth) * multiplier

    updateCastTime({
      playerId,
      abilityId,
      castIndex,
      newCastTime,
      constrain: event.ctrlKey,
      replicateLeft: event.shiftKey,
    })
  }

  const startTracking = useTrackMouseOffset({
    onStart: () => setIsDragging(true),
    onChange: handleMouseOffset,
    onEnd: () => setIsDragging(false),
  })

  return (
    <motion.div
      className="absolute top-0 left-0"
      onMouseDown={startTracking}
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
        x,
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTimestamp ? 1 : 0 }}
        className="absolute bottom-[120%] left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <TimestampHint
          playerId={playerId}
          abilityId={abilityId}
          castIndex={castIndex}
        />
      </motion.div>
      <WowheadIcon
        name={abilityIcon || ""}
        size="small"
        className="pointer-events-none aspect-[5/4] object-cover"

      />
    </motion.div>
  )
}

export default AbilityCast

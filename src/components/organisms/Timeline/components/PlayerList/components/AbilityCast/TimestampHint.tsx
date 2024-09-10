import React from 'react'
import { getPlayerAbilityFromStore, useAppStore } from 'store'
import { getTimeString } from 'utils'

function TimestampHint(props: {
  playerId: string
  abilityId: string
  castIndex: number
}) {
  const { playerId, abilityId, castIndex } = props

  const abilityCastTimestamp = useAppStore((state) => {
    const playerAbility = getPlayerAbilityFromStore(state, playerId, abilityId)
    if (!playerAbility) return 0
    return playerAbility.castTimes[castIndex]
  })

  return (
    <span className="text-xs p-1 bg-slate-950">
      {getTimeString(abilityCastTimestamp)}
    </span>
  )
}

export default TimestampHint
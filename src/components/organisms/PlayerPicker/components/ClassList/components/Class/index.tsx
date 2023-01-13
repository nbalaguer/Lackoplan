import React from 'react'
import WowheadIcon from 'components/atoms/WowheadIcon'
import { classIcons } from 'config/classes'
import { useAppStore } from 'store'
import type { Class } from 'types'
import { createPlayer, getTimeFractions } from 'utils'

function Class(props: {
  classKey: Class
}) {
  const {
    classKey
  } = props

  const addPlayer = useAppStore((state) => state.addPlayer)
  const duration = useAppStore((state) => state.duration)

  return (
    <button
      className="flex outline outline-2 outline-transparent transition-[outline-color] duration-100 hover:outline-slate-500"
      onClick={() => {
        const newPlayer = createPlayer(classKey)
        newPlayer.abilities
          .forEach(playerAbility => playerAbility.castTimes = getTimeFractions(playerAbility.ability.cooldown, duration))
        addPlayer(newPlayer)
      }}
    >
      <WowheadIcon name={classIcons[classKey]} />
    </button>
  )
}

export default Class
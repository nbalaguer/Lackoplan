import React from 'react'
import type { Player, PlayerAbility } from 'types'
import WowheadIcon from 'components/atoms/WowheadIcon'
import classNames from 'classnames'
import { useAppStore } from 'store'

function PlayerAbility(props: {
  player: Player
  playerAbility: PlayerAbility
  onToggleAbility: () => void
}) {
  const {
    player,
    playerAbility,
    onToggleAbility,
  } = props

  const toggleAbilityModifier = useAppStore((state) => state.toggleAbilityModifier)

  return (
    <div className="flex flex-col gap-1 w-full items-start content-start place-content-start place-items-start">
      <button
        onClick={onToggleAbility}
        className={classNames(
          "flex",
          "outline outline-2 outline-transparent transition-[outline-color] duration-100", {
            "hover:outline-slate-500": !playerAbility.isActive,
            "outline-slate-300": playerAbility.isActive
          }
        )}
      >
        <WowheadIcon name={playerAbility.ability.icon} size="full" />
      </button>
      <div className="grid grid-cols-2 gap-0.5">
        {playerAbility.ability.modifiers.map((modifier, index) => {
          const isActive = playerAbility.activeModifiers[index]
          return (
            <button
              key={modifier.icon}
              onClick={() => toggleAbilityModifier(player.id, playerAbility.id, index)}
              className={classNames(
                "flex opacity-50 transition-opacity duration-100", {
                "opacity-100": isActive,
              })}
            >
              <WowheadIcon name={modifier.icon} size="mini" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerAbility
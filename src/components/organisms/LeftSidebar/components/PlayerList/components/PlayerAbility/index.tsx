import React from "react"
import type { Player, PlayerAbility } from "types"
import WowheadIcon from "components/atoms/WowheadIcon"
import classNames from "classnames"
import { useAppStore } from "store"

function PlayerAbility(props: {
  player: Player
  playerAbility: PlayerAbility
  onToggleAbility: () => void
}) {
  const { player, playerAbility, onToggleAbility } = props

  function handleAbilityClick(event: React.MouseEvent) {
    if (event.ctrlKey) {
      if (playerAbility.ability.wowheadLink) {
        window.open(playerAbility.ability.wowheadLink, "_blank")
      }
    } else {
      onToggleAbility()
    }
  }

  const toggleAbilityModifier = useAppStore(
    (state) => state.toggleAbilityModifier
  )

  return (
    <div className="flex w-full flex-col place-content-start place-items-start content-start items-start gap-1">
      <button
        title={playerAbility.ability.name}
        onClick={handleAbilityClick}
        className="flex outline outline-2 outline-transparent transition-[outline] duration-100 hover:outline-slate-500"
      >
        <WowheadIcon
          name={playerAbility.ability.icon}
          size="full"
          className={classNames(
            "aspect-[4/3] object-cover grayscale transition-[filter] duration-100",
            {
              "filter-none": playerAbility.isActive,
            }
          )}
        />
      </button>
      <div className="grid grid-cols-2 gap-0.5">
        {playerAbility.ability.modifiers.map((modifier, index) => {
          const isActive = playerAbility.activeModifiers[index]
          return (
            <button
              key={modifier.icon}
              title={modifier.description}
              onClick={(event) => {
                if (event.ctrlKey) {
                  if (modifier.wowheadLink) {
                    window.open(modifier.wowheadLink, "_blank")
                  }
                } else {
                  toggleAbilityModifier(player.id, playerAbility.id, index)
                }
              }}
              className="flex"
            >
              <WowheadIcon
                name={modifier.icon}
                size="mini"
                className={classNames(
                  "grayscale transition-[filter] duration-100",
                  {
                    "filter-none": isActive,
                  }
                )}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default PlayerAbility

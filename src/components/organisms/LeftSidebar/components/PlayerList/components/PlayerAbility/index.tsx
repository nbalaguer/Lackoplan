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
      window.open(playerAbility.ability.wowheadLink, "_blank")
    }
    else {
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
        className="flex outline outline-2 outline-transparent hover:outline-slate-500 transition-[outline] duration-100"
      >
        <WowheadIcon
          name={playerAbility.ability.icon}
          size="full"
          className={classNames(
            "grayscale transition-[filter] duration-100",
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
              onClick={() =>
                toggleAbilityModifier(player.id, playerAbility.id, index)
              }
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

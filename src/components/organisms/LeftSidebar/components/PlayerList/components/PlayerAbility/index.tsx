import React from "react"
import type { PlayerAbility } from "types"
import WowheadIcon from "components/atoms/WowheadIcon"
import classNames from "classnames"
import { getPlayerAbilityFromStore, useAppStore } from "store"
import { useShallow } from "zustand/react/shallow"
import _omit from "lodash/omit"
import useLatestValue from "hooks/useLatestValue"

function PlayerAbility(props: {
  playerId: string
  playerAbilityId: string
}) {
  const { playerId, playerAbilityId } = props

  const storePlayerAbility = useAppStore(
    useShallow((state) => {
      const playerAbility = getPlayerAbilityFromStore(state, playerId, playerAbilityId)
      if (!playerAbility) return
      return {
        id: playerAbility.id,
        ability: playerAbility.ability,
        isActive: playerAbility.isActive,
        activeModifiers: playerAbility.activeModifiers,
      }
    })
  )

  // Mantain last known player value so AnimatePresence works properly
  const playerAbility = useLatestValue(storePlayerAbility)

  const toggleAbility = useAppStore((state) => state.toggleAbility)
  function handleAbilityClick(event: React.MouseEvent) {
    if (event.ctrlKey) {
      if (playerAbility?.ability.wowheadLink) {
        window.open(playerAbility.ability.wowheadLink, "_blank")
      }
    } else {
      toggleAbility(playerId, playerAbilityId)
    }
  }

  const toggleAbilityModifier = useAppStore(
    (state) => state.toggleAbilityModifier
  )

  if (!playerAbility) return null

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
                  toggleAbilityModifier(playerId, playerAbilityId, index)
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

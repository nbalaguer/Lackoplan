import Color from "color"
import Modal from "components/templates/Modal"
import theme from "config/theme"
import React, { useCallback, useState } from "react"
import { useAppStore } from "store"
import { getTimeString } from "utils"

function ExportMDTString() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getMDTString = useCallback(() => {
    const state = useAppStore.getState()

    const activePlayers = state.players.filter((player) =>
      player.abilities.some((ability) => ability.isActive)
    )

    return activePlayers
      .map((player) => {
        const playerColor = Color(theme.colors[player.class])
        const playerColorArray = playerColor
          .hexa()
          .toLowerCase()
          .split("")
          .slice(1)
        const playerMDTColorCode = [
          ...playerColorArray.slice(-2),
          ...playerColorArray.slice(0, -2),
        ].join("")

        const activeAbilities = player.abilities.filter(
          (ability) => ability.isActive
        )
        const playerCasts = activeAbilities
          .map((playerAbility) =>
            playerAbility.castTimes.map((castTime) => ({
              castTime,
              name: playerAbility.ability.shortName,
            }))
          )
          .flat()
          .sort((cast1, cast2) => cast1.castTime - cast2.castTime)

        return [
          player.name,
          ...playerCasts.map(
            (playerCast) =>
              `{time:${getTimeString(
                playerCast.castTime
              )}} |c${playerMDTColorCode}${playerCast.name}|r`
          ),
        ].join("\n")
      })
      .join("\n")
  }, [])

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="border-2 border-slate-500 bg-slate-700 px-2 text-xs font-medium text-slate-200 transition-colors duration-100 hover:bg-slate-600"
      >
        Export MDT
      </button>
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="h-2/3 w-full max-w-screen-lg p-4"
      >
        <textarea
          className="h-full border-2 border-slate-600 bg-transparent px-3 py-2 text-sm outline-none"
          value={getMDTString()}
          readOnly
        />
      </Modal>
    </>
  )
}

export default ExportMDTString

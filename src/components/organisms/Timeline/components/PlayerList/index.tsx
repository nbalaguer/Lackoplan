import React from "react"
import { useAppStore } from "store"
import Player from "./components/Player"
import { LayoutGroup } from "framer-motion"
import { useShallow } from "zustand/react/shallow"

function PlayerList() {
  const playerIds = useAppStore(
    useShallow((state) =>
      state.players
        .filter((player) => player.isActive)
        .map((player) => player.id)
    )
  )

  const overlay = useAppStore((state) => state.overlays[0])

  return (
    <div className="relative flex-grow">
      {!!overlay && (
        <img
          src={overlay}
          alt=""
          className="absolute top-0 left-0 -z-10 h-full w-full opacity-20"
        />
      )}
      <div className="absolute top-0 bottom-0 -left-4 -right-4 overflow-x-hidden overflow-y-auto">
        <div className="flex min-h-full flex-col justify-end px-4">
          <LayoutGroup>
            {playerIds.map((playerId) => {
              return <Player key={playerId} playerId={playerId} />
            })}
          </LayoutGroup>
        </div>
      </div>
    </div>
  )
}

export default PlayerList

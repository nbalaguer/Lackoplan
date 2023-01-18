import React from "react"
import { useAppStore } from "store"
import { shallow } from "zustand/shallow"
import Player from "./components/Player"
import { LayoutGroup } from "framer-motion"

function PlayerList() {
  const playerIds = useAppStore(
    (state) => state.players.map((player) => player.id),
    shallow
  )

  const overlay = useAppStore((state) => state.overlays[0])

  return (
    <div className="relative flex flex-grow flex-col justify-end">
      {!!overlay && <img src={overlay} alt="" className="absolute top-0 left-0 w-full h-full opacity-20 -z-10" />}
      <LayoutGroup>
        {playerIds.map((playerId) => {
          return <Player key={playerId} playerId={playerId} />
        })}
      </LayoutGroup>
    </div>
  )
}

export default PlayerList

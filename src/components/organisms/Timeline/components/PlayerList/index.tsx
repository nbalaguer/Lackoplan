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

  return (
    <div className="flex flex-grow flex-col justify-end">
      <LayoutGroup>
        {playerIds.map((playerId) => {
          return <Player key={playerId} playerId={playerId} />
        })}
      </LayoutGroup>
    </div>
  )
}

export default PlayerList

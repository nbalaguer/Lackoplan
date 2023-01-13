import React from "react"
import { useAppStore } from "store"
import { shallow } from "zustand/shallow"
import Player from "./components/Player"

function PlayerList() {
  const playerIds = useAppStore(
    (state) => state.players.map((player) => player.id),
    shallow
  )

  return (
    <div className="flex flex-grow flex-col justify-end">
      {playerIds.map((playerId) => {
        return <Player key={playerId} playerId={playerId} />
      })}
    </div>
  )
}

export default PlayerList

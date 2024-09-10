import React from "react"
import Player from "./components/Player"
import { useAppStore } from "store"
import { AnimatePresence } from "framer-motion"
import { useShallow } from "zustand/react/shallow"

function PlayerList() {
  const playerIds = useAppStore(useShallow((state) => state.players.map((player) => player.id)))

  return (
    <div className="overflow-auto p-2 space-y-2">
      <AnimatePresence mode="popLayout">
        {playerIds.map((playerId, index) => {
          return (
            <Player
              key={playerId}
              playerId={playerId}
              isFirst={index === 0}
              isLast={index === playerIds.length - 1}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

export default PlayerList

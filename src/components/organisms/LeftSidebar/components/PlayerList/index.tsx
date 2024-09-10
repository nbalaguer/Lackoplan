import React from "react"
import Player from "./components/Player"
import { useAppStore } from "store"
import { AnimatePresence } from "framer-motion"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"
import { useShallow } from "zustand/react/shallow"

function PlayerList() {
  const playerIds = useAppStore(useShallow((state) => state.players.map((player) => player.id)))

  return (
    <div className="relative flex-grow">
      <div className="absolute inset-0">
        <OverlayScrollbarsComponent
          element="div"
          defer
          className="h-full"
          options={{
            scrollbars: {
              theme: "os-theme-light",
              autoHide: "scroll",
              autoHideDelay: 300,
            },
          }}
        >
          <div className="space-y-3 py-3 pr-2">
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
        </OverlayScrollbarsComponent>
      </div>
    </div>
  )
}

export default PlayerList

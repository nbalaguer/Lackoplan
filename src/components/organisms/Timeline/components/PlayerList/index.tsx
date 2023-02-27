import React from "react"
import { useAppStore } from "store"
import { shallow } from "zustand/shallow"
import Player from "./components/Player"
import { LayoutGroup } from "framer-motion"
import { OverlayScrollbarsComponent } from "overlayscrollbars-react"

function PlayerList() {
  const playerIds = useAppStore(
    (state) =>
      state.players
        .filter((player) => player.isActive)
        .map((player) => player.id),
    shallow
  )

  const overlay = useAppStore((state) => state.overlays[0])

  return (
    <div className="relative flex-grow">
      {!!overlay && (
        <img
          src={overlay}
          alt=""
          className="absolute top-0 left-0 w-full h-full -z-10 opacity-20"
        />
      )}
      <div className="absolute top-0 bottom-0 -left-4 -right-4">
        <OverlayScrollbarsComponent
          element="div"
          defer
          className="w-full h-full"
          options={{
            scrollbars: {
              theme: "os-theme-light",
              autoHide: "scroll",
              autoHideDelay: 300,
            },
            overflow: {
              x: "hidden",
            },
          }}
        >
          <div className="min-h-full flex flex-col justify-end px-4">
            <LayoutGroup>
              {playerIds.map((playerId) => {
                return <Player key={playerId} playerId={playerId} />
              })}
            </LayoutGroup>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  )
}

export default PlayerList

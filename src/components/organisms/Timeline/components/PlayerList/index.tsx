import React from "react"
import { useAppStore } from "store"
import Player from "./components/Player"
import { LayoutGroup } from "framer-motion"
import { useShallow } from "zustand/react/shallow"
import classNames from "classnames"

function PlayerList() {
  const playerIds = useAppStore(
    useShallow((state) =>
      state.players
        .filter((player) => player.isActive)
        .map((player) => player.id)
    )
  )

  const overlays = useAppStore((state) => state.overlays.slice(0, 2))

  return (
    <div className="relative flex-grow">
      {overlays.map((overlay, index) => {
        if (!overlay.imgSrc) {
          return null
        }

        const zoomX = 100 / (overlay.crop.endX - overlay.crop.startX)
        const zoomY = 100 / (overlay.crop.endY - overlay.crop.startY)

        return (
          <div
            key={index}
            className={classNames(
              "absolute left-0 w-full overflow-hidden -z-20",
              index === 0 && "top-0 h-[35%]",
              index === 1 && "bottom-0 h-[65%]"
            )}
          >
            <img
              src={overlay.imgSrc}
              alt=""
              className="absolute opacity-30 object-fill max-w-[revert] max-h-[revert]"
              style={{
                top: `-${overlay.crop.startY * zoomY}%`,
                left: `-${overlay.crop.startX * zoomX}%`,
                width: `${100 * zoomX}%`,
                height: `${100 * zoomY}%`,
                opacity: overlay.opacity,
              }}
            />
          </div>
        )
      })}
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

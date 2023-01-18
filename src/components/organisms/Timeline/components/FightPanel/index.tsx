import React from "react"
import _isEqual from "lodash/isEqual"
import { useAppStore } from "store"

function FightPanel() {
  const overlays = useAppStore((state) => state.overlays.slice(1), _isEqual)

  return (
    <div className="relative min-h-[300px]">
      {overlays
        .filter((overlay) => !!overlay)
        .map((overlay, index) => {
          return (
            <img
              key={index}
              src={overlay}
              alt=""
              className="absolute top-0 left-0 -z-10 h-full w-full opacity-30"
            />
          )
        })}
    </div>
  )
}

export default FightPanel

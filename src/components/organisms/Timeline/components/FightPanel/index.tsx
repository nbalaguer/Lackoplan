import React from "react"
import { useAppStore } from "store"
import { useShallow } from "zustand/react/shallow"

function FightPanel() {
  const overlays = useAppStore(useShallow((state) => state.overlays.slice(1)))

  return (
    <div className="relative min-h-[222px]">
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

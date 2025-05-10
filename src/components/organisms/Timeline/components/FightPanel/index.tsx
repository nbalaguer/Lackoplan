import React from "react"
import { useAppStore } from "store"
import { useShallow } from "zustand/react/shallow"

function FightPanel() {
  const overlays = useAppStore(useShallow((state) => state.overlays.slice(2)))

  return (
    <div className="relative min-h-[250px] -z-20">
      {overlays
        .filter((overlay) => !!overlay.imgSrc)
        .map((overlay, index) => {
          const zoomX = 100 / (overlay.crop.endX - overlay.crop.startX)
          const zoomY = 100 / (overlay.crop.endY - overlay.crop.startY)

          return (
            <div key={index} className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <img
                src={overlay.imgSrc}
                alt=""
                className="absolute object-fill max-w-[revert] max-h-[revert]"
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
    </div>
  )
}

export default FightPanel

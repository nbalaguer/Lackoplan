import React from "react"
import { useAppStore } from "store"
import Overlay from "./components/Overlay"
import { useShallow } from "zustand/react/shallow"

function OverlayConfig() {
  const setOverlay = useAppStore((state) => state.setOverlay)
  const setOverlayCrop = useAppStore((state) => state.setOverlayCrop)
  const setOverlayOpacity = useAppStore((state) => state.setOverlayOpacity)
  const overlays = useAppStore(useShallow((state) => state.overlays))

  return (
    <div className="space-y-3 p-3">
      <h3 className="text-md font-bold">Overlays</h3>
      <div className="space-y-3">
        {overlays.map((overlay, index) => {
          return (
            <React.Fragment key={index}>
              {index === 2 && <div className="border-b-2 border-slate-600" />}
              <Overlay
                overlay={overlay}
                onOverlayChange={(src) => setOverlay(index, src)}
                onOverlayCropChange={(crop) => setOverlayCrop(index, crop)}
                onOverlayOpacityChange={(opacity) => setOverlayOpacity(index, opacity)}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default OverlayConfig

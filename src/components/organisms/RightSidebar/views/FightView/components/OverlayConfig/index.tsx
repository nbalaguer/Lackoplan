import React from "react"
import { useAppStore } from "store"
import Overlay from "./components/Overlay"
import _isEqual from "lodash/isEqual"

function OverlayConfig() {
  const setOverlay = useAppStore((state) => state.setOverlay)
  const overlays = useAppStore((state) => state.overlays, _isEqual)

  return (
    <div className="mt-auto space-y-3 p-3">
      <h3 className="text-md font-bold">Overlays</h3>
      <div className="space-y-3">
        {overlays.map((overlay, index) => {
          return (
            <React.Fragment key={index}>
              {index === 1 && <div className="border-b-2 border-slate-600" />}
              <Overlay
                src={overlay}
                onOverlay={(src) => setOverlay(index, src)}
              />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default OverlayConfig

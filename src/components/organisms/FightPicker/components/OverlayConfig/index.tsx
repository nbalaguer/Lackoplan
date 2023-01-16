import React from 'react'
import { useAppStore } from 'store'
import Overlay from './components/Overlay'
import _isEqual from 'lodash/isEqual'

function OverlayConfig() {

  const setOverlay = useAppStore((state) => state.setOverlay)
  const overlays = useAppStore((state) => state.overlays, _isEqual)

  console.log("overlays render")

  return (
    <div className="p-3 space-y-3">
      <div className="flex justify-between items-center">
        Overlays
      </div>
      <div className="space-y-3">
        {overlays.map((overlay, index) => {
          return (
            <>
              {index === 1 && <div className="border-b-2 border-slate-600" />}
              <Overlay src={overlay} key={index} onOverlay={(src) => setOverlay(index, src)} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default OverlayConfig
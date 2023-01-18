import React from 'react'
import { useAppStore } from 'store'
import Overlay from './components/Overlay'
import _isEqual from 'lodash/isEqual'

function OverlayConfig() {

  const setOverlay = useAppStore((state) => state.setOverlay)
  const overlays = useAppStore((state) => state.overlays, _isEqual)

  return (
    <div className="p-3 space-y-3">
      <div className="flex justify-between items-center">
        Overlays
      </div>
      <div className="space-y-3">
        {overlays.map((overlay, index) => {
          return (
            <React.Fragment key={index}>
              {index === 1 && <div className="border-b-2 border-slate-600" />}
              <Overlay src={overlay} onOverlay={(src) => setOverlay(index, src)} />
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default OverlayConfig
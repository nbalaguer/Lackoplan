import React from "react"
import Marker from "./Marker"
import { useAppStore } from "store"
import {useShallow} from "zustand/react/shallow"

function Markers() {
  const markers = useAppStore(useShallow((state) => state.markers))
  const markersEnabled = useAppStore((state) => state.markersEnabled)

  return (
    <div>
      {markers.map((marker) => (
        <Marker marker={marker} key={marker.id} disabled={!markersEnabled} />
      ))}
    </div>
  )
}

export default Markers

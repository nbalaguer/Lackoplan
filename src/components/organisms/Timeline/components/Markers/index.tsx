import React from "react"
import Marker from "./Marker"
import { useAppStore } from "store"

function Markers() {
  const markerIds = useAppStore((state) => state.markers.map((m) => m.id))
  const markersEnabled = useAppStore((state) => state.markersEnabled)

  return (
    <div>
      {markerIds.map((markerId) => (
        <Marker markerId={markerId} key={markerId} disabled={!markersEnabled} />
      ))}
    </div>
  )
}

export default Markers

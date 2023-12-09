import React from "react"
import Marker from "./Marker"
import { useAppStore } from "store"

function Markers() {
  const markerIds = useAppStore((state) => state.markers.map((m) => m.id))

  return (
    <div>
      {markerIds.map((markerId) => (
        <Marker markerId={markerId} key={markerId} />
      ))}
    </div>
  )
}

export default Markers

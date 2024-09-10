import React from "react"
import { useAppStore } from "store"
import MarkerForm from "./MarkerForm"
import Button from "components/atoms/Button"
import Switch from "components/atoms/Switch"
import { useShallow } from "zustand/react/shallow"

function MarkerConfig() {
  const markersEnabled = useAppStore((state) => state.markersEnabled)
  const toggleMarkers = useAppStore((state) => state.toggleMarkers)
  const markerIds = useAppStore(useShallow((state) => state.markers.map((m) => m.id)))
  const addMarker = useAppStore((state) => state.addMarker)

  return (
    <div className="space-y-3 p-3">
      <h3 className="text-md font-bold flex justify-between">
        <span>Markers</span>
        <Switch
          checked={markersEnabled}
          onChange={() => toggleMarkers()}
          label=""
        />
      </h3>
      <div className="space-y-2">
        <Button
          className="w-full"
          onClick={() => addMarker("phase")}
          text="Add phase marker"
        />
        <Button
          className="w-full"
          onClick={() => addMarker("event")}
          text="Add event marker"
        />
      </div>
      <div className="space-y-2">
        {markerIds.map((markerId) => (
          <MarkerForm markerId={markerId} key={markerId} />
        ))}
      </div>
    </div>
  )
}

export default MarkerConfig

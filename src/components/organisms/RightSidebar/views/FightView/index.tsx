import React from "react"
import FightConfig from "./components/FightConfig"
import OverlayConfig from "./components/OverlayConfig"
import MarkerConfig from "./components/MarkerConfig"

function FightView() {
  return (
    <div className="flex flex-col divide-y-2 divide-slate-700">
      <FightConfig />
      <MarkerConfig />
      <OverlayConfig />
    </div>
  )
}

export default FightView

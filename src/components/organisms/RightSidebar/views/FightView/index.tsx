import React from "react"
import FightConfig from "./components/FightConfig"
import OverlayConfig from "./components/OverlayConfig"
import MarkerConfig from "./components/MarkerConfig"

function FightView() {
  return (
    <div className="grid grid-rows-[auto_minmax(0px,1fr)_auto] divide-y-2 divide-slate-700">
      <FightConfig />
      <MarkerConfig />
      <OverlayConfig />
    </div>
  )
}

export default FightView

import React from "react"
import FightConfig from "./components/FightConfig"
import OverlayConfig from "./components/OverlayConfig"

function FightView() {
  return (
    <div className="flex flex-col divide-y-2 divide-slate-700">
      <FightConfig />
      <OverlayConfig />
    </div>
  )
}

export default FightView

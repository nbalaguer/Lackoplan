import React from "react"
import Time from "./components/Time"

function Toolbar() {
  return (
    <div className="flex justify-between mb-2">
      <div className="text-sm text-slate-400">
        <Time />
      </div>
    </div>
  )
}

export default Toolbar

import React from "react"
import Time from "./components/Time"

function Toolbar() {
  return (
    <div className="mb-2 flex justify-center">
      <div className="text-sm text-slate-400">
        <Time />
      </div>
    </div>
  )
}

export default Toolbar

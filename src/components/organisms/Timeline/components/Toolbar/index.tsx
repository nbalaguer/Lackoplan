import React from "react"
import ExportMRTString from "./components/ExportMRTString"
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"
import Time from "./components/Time"

function Toolbar() {
  return (
    <div className="flex justify-between mb-2">
      <div className="text-sm text-slate-400">
        <Time />
      </div>
      <div className="space-x-2">
        <ImportString />
        <ExportString />
        <ExportMRTString />
      </div>
    </div>
  )
}

export default Toolbar

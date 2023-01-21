import React from "react"
import ExportMRTString from "./components/ExportMRTString"
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"

function Toolbar() {
  return (
    <div className="absolute top-0 left-0 z-30 flex w-full justify-between">
      <div></div>
      <div className="space-x-2">
        <ImportString />
        <ExportString />
        <ExportMRTString />
      </div>
    </div>
  )
}

export default Toolbar

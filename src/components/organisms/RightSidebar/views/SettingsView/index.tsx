import React from "react"
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"
import LoadFile from "./components/LoadFile"
import SaveFile from "./components/SaveFile"
import SaveFileAs from "./components/SaveFileAs"

function SettingsView() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <LoadFile />
        <ImportString />
        <SaveFile />
        <ExportString />
        <SaveFileAs />
      </div>
    </div>
  )
}

export default SettingsView

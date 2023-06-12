import React from 'react'
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"
import Button from 'components/atoms/Button'

function SettingsView() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 p-3">
        <Button text="Load" />
        <ImportString />
        <Button text="Save" />
        <ExportString />
        <Button text="Save As" />
      </div>
    </div>
  )
}

export default SettingsView
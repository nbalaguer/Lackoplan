import React from 'react'
import ExportMDTString from './components/ExportMDTString'
import ExportString from './components/ExportString'
import ImportString from './components/ImportString'

function Toolbar() {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-between z-30">
      <div></div>
      <div className="space-x-2">
        <ImportString />
        <ExportString />
        <ExportMDTString />
      </div>
    </div>
  )
}

export default Toolbar
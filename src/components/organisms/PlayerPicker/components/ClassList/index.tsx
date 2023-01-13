import React from "react"
import { CLASSES } from "config/constants"
import Class from "./components/Class"

function ClassList() {
  return (
    <div className="grid grid-cols-5 gap-2 border-b-2 border-slate-700 p-4">
      {Object.values(CLASSES).map((classKey) => {
        return <Class key={classKey} classKey={classKey} />
      })}
    </div>
  )
}

export default ClassList

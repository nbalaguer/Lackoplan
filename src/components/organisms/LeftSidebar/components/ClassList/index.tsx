import React from "react"
import { CLASSES } from "config/constants"
import Class from "./components/Class"
import abilities from "config/abilities"
import { classIcons } from "config/classes"
import WowheadIcon from "components/atoms/WowheadIcon"

function ClassList() {
  return (
    <div className="grid grid-cols-[repeat(5,auto)] gap-2 border-b-2 border-slate-700 p-4 px-10 justify-center">
      {Object.values(CLASSES).map((classKey) => {
        const hasAbilities = !!abilities[classKey].length
        if (hasAbilities) return <Class key={classKey} classKey={classKey} />
        return (
          <WowheadIcon
            key={classKey}
            name={classIcons[classKey]}
            className="opacity-30"
            size="large"
          />
        )
      })}
    </div>
  )
}

export default ClassList

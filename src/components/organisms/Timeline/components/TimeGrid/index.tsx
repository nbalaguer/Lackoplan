import React from "react"
import classNames from "classnames"
import { useAppStore } from "store"
import { getCastTimes } from "utils"

function TimeGrid() {
  const duration = useAppStore((state) => state.duration)

  return (
    <div className="-z-10">
      {getCastTimes(15, duration).map((castTime, index) => {
        const isMinute = index % 4 === 0
        const isHalfMinute = !isMinute && (index % 2 === 0)
        return (
          <div
            key={castTime}
            className={classNames("absolute top-0 bottom-0 w-px", {
              "bg-slate-600/50": isMinute,
              "bg-slate-700/50": isHalfMinute,
              "bg-slate-800/75": !isMinute && !isHalfMinute,
            })}
            style={{ left: `${(castTime / duration) * 100}%` }}
          />
        )
      })}
    </div>
  )
}

export default TimeGrid

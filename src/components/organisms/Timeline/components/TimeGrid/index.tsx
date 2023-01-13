import React from "react"
import classNames from "classnames"
import { useAppStore } from "store"
import { getTimeFractions } from "utils"

function TimeGrid() {
  const duration = useAppStore((state) => state.duration)

  return (
    <div className="-z-10">
      {getTimeFractions(15, duration).map((fraction, index) => {
        const isMinute = index % 4 === 0
        return (
          <div
            key={fraction}
            className={classNames("absolute top-0 bottom-0 w-px", {
              "bg-slate-700/50": isMinute,
              "bg-slate-800/50": !isMinute,
            })}
            style={{ left: `${fraction * 100}%` }}
          />
        )
      })}
    </div>
  )
}

export default TimeGrid

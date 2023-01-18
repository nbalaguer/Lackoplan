import React from "react"
import { useAppStore } from "store"
import { getCastTimes } from "utils"

function TimeBar() {
  const duration = useAppStore((state) => state.duration)
  const minutes = getCastTimes(60, duration)

  return (
    <div>
      <div className="h-px bg-slate-500" />
      <div className="relative text-slate-500">
        {minutes.map((castTime, i) => {
          return (
            <span
              key={i}
              className="absolute top-0 -translate-x-1/2 bg-slate-900"
              style={{ left: `${(castTime / duration) * 100}%` }}
            >
              {i}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TimeBar

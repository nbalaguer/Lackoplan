import React from "react"
import { useAppStore } from "store"
import { getCastTimes } from "utils"

function TimeBar() {
  const duration = useAppStore((state) => state.duration)
  const minutes = getCastTimes(60, duration)

  return (
    <div>
      <div className="h-px bg-slate-500" />
      <div
        className="flex items-center justify-between bg-slate-900 text-slate-500"
        style={{
          width: `calc(0.6rem + ${(minutes[minutes.length - 1] / duration) * 100}%)`,
          marginLeft: "-0.3em",
        }}
      >
        {minutes.map((_, i) => {
          return <span key={i}>{i}</span>
        })}
      </div>
    </div>
  )
}

export default TimeBar

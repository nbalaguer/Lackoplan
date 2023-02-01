import React, { useEffect } from "react"
import { useAppStore } from "store"
import { getCastTimes } from "utils"
import useTimelineContext from "components/organisms/Timeline/context/useTimelineContext"
import { motion, useSpring } from "framer-motion"

function TimeBar() {
  const duration = useAppStore((state) => state.duration)
  const minutes = getCastTimes(60, duration)

  const {panelRef} = useTimelineContext()
  const x = useSpring(0, {
    bounce: 0,
    stiffness: 8000,
    damping: 100,
    mass: 1,
  })

  useEffect(() => {
    if (!panelRef.current) return
    const panel = panelRef.current

    function handleMove(event: MouseEvent) {
      x.set(event.clientX - panel.offsetLeft)
    }

    panel.addEventListener("mousemove", handleMove)
    return () => {
      panel.removeEventListener("mousemove", handleMove)
    }
  }, [panelRef, x])

  return (
    <div>
      <motion.div
        className="absolute top-0 left-0 w-0 h-full border-l-[1px] border-slate-700/75 border-dashed -z-10"
        style={{x}}
      />
      <div className="h-px bg-slate-500" />
      <div className="relative text-slate-500">
        <span className="invisible">sizer</span>
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

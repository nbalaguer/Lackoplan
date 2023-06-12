import React, { useEffect, useState } from "react"
import { useAppStore } from "store"
import { getCastTimes } from "utils"
import useTimelineContext from "components/organisms/Timeline/context/useTimelineContext"
import { motion, useSpring } from "framer-motion"
import classNames from "classnames"

function TimeBar() {
  const duration = useAppStore((state) => state.duration)
  const minutes = getCastTimes(60, duration)

  const [isGuideVisible, setIsGuideVisible] = useState<boolean>(false)

  const { panelRef } = useTimelineContext()
  const x = useSpring(0, {
    bounce: 0,
    stiffness: 8000,
    damping: 100,
    mass: 1,
  })

  useEffect(() => {
    if (!panelRef.current) return
    const panel = panelRef.current

    function handleEnter() {
      setIsGuideVisible(true)
    }

    function handleLeave() {
      setIsGuideVisible(false)
    }

    function handleMove(event: MouseEvent) {
      x.set(event.clientX - panel.offsetLeft)
    }

    panel.addEventListener("mousemove", handleMove)
    panel.addEventListener("mouseenter", handleEnter)
    panel.addEventListener("mouseleave", handleLeave)
    return () => {
      panel.removeEventListener("mousemove", handleMove)
      panel.removeEventListener("mouseenter", handleEnter)
      panel.removeEventListener("mouseleave", handleLeave)
    }
  }, [panelRef, x])

  return (
    <div>
      <motion.div
        className={classNames(
          "absolute top-0 left-0 -z-10 h-full w-0 border-l-[1px] border-dashed border-slate-700/75 transition-opacity duration-100",
          { ["opacity-0 duration-500"]: !isGuideVisible }
        )}
        style={{ x }}
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

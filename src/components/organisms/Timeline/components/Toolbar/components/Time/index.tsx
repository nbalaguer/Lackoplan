import useTimelineContext from "components/organisms/Timeline/context/useTimelineContext"
import React, { useEffect, useState } from "react"
import { useAppStore } from "store"
import { getTimeString } from "utils"

function Time() {
  const duration = useAppStore((state) => state.duration)
  const [time, setTime] = useState("0:00")
  const { panelRef } = useTimelineContext()

  useEffect(() => {
    if (!panelRef.current) return
    const panel = panelRef.current

    function handleMove(event: MouseEvent) {
      const timestamp = (duration * (event.clientX - panel.offsetLeft)) / panel.clientWidth
      if (timestamp < 0 || timestamp > duration) setTime("--:--")
      else setTime(getTimeString(timestamp)
      )
    }

    panel.addEventListener("mousemove", handleMove)
    return () => {
      panel.removeEventListener("mousemove", handleMove)
    }
  }, [panelRef, duration])

  return <>{`${time}`}</>
}

export default Time

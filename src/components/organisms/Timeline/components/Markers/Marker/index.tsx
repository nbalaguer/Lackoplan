import React, { useEffect } from "react"
import useMouseOffset from "hooks/useMouseOffset"
import type { Marker } from "types"
import { motion, useSpring } from "framer-motion"
import { useAppStore } from "store"
import useTimelineContext from "components/organisms/Timeline/context/useTimelineContext"
import classNames from "classnames"

function Marker(props: { markerId: string; disabled?: boolean }) {
  const { markerId, disabled } = props

  const { panelWidth } = useTimelineContext()
  const marker = useAppStore((state) =>
    state.markers.find((m) => m.id === markerId)
  )
  const duration = useAppStore((state) => state.duration)
  const updateMarker = useAppStore((state) => state.updateMarker)

  const x = useSpring(0, {
    bounce: 0,
    stiffness: 1000,
    damping: 50,
  })

  useEffect(() => {
    if (!panelWidth) return
    const marker = useAppStore.getState().markers.find((m) => m.id === markerId)
    if (!marker) return
    const newX =
      (panelWidth * (marker.time > duration ? duration : marker.time)) /
      duration
    x.jump(newX)

    return useAppStore.subscribe((state) => {
      const marker = state.markers.find((m) => m.id === markerId)
      if (!marker) return
      const newX = (panelWidth * marker.time) / duration
      if (x.get() !== newX) {
        x.set(newX)
      }
    })
  }, [duration, markerId, panelWidth, x])

  const track = useMouseOffset((event, offsetX) => {
    if (!panelWidth) return
    const marker = useAppStore.getState().markers.find((m) => m.id === markerId)
    if (!marker) return

    const multiplier = event.altKey ? 0.1 : 1

    updateMarker(markerId, {
      time: marker.time + duration * (offsetX / panelWidth) * multiplier,
    })
  })

  return (
    <div className={classNames("group", { ["opacity-50"]: disabled })}>
      <motion.div
        className="absolute top-4 -left-2 z-10 p-1"
        onMouseDown={!disabled ? track : undefined}
        style={{ x }}
      >
        <div
          className={classNames(
            "h-0 w-[9px] border-x-4 border-t-4 border-transparent border-t-yellow-500 opacity-100 transition-colors",
            { ["group-hover:border-t-yellow-300"]: !disabled }
          )}
        />
      </motion.div>
      <motion.div
        className="absolute top-4 left-0 p-2 text-xs font-thin text-slate-400"
        style={{ x }}
      >
        {marker?.type === "phase" && <div>{marker.phase}</div>}
        {marker?.type === "event" && (
          <>
            <div>{marker.event}</div>
            <div>{marker.spell}</div>
            <div>{marker.counter}</div>
          </>
        )}
      </motion.div>
      <motion.div
        className={classNames(
          "absolute top-6 left-0 bottom-0 w-px bg-yellow-500 opacity-60 transition-opacity",
          { ["group-hover:opacity-80"]: !disabled }
        )}
        style={{ x }}
      />
    </div>
  )
}

export default Marker

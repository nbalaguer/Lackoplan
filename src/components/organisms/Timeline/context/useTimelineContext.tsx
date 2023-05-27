import React, { useMemo, useContext } from "react"
import useResizeObserver from "use-resize-observer"

type TimelineContextType = {
  panelRef: React.RefObject<HTMLDivElement>
  panelWidth?: number
}

const TimelineContext = React.createContext<TimelineContextType | null>(null)

export function TimelineContextProvider(props: {
  panelRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}) {
  const { panelRef, children } = props
  const {width} = useResizeObserver({ref: panelRef})

  const contextValue = useMemo(() => {
    return {
      panelRef,
      panelWidth: width,
    }
  }, [panelRef, width])

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

function useTimelineContext() {
  const timelineContext = useContext(TimelineContext)

  if (!timelineContext) {
    throw new Error(
      "useTimelineContext must be used within <TimelineContextProvider>"
    )
  }

  return timelineContext
}

export default useTimelineContext

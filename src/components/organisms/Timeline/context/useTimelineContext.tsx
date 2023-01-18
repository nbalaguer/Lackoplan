import React, { useMemo, useContext } from "react"

type TimelineContextType = {
  panelRef: React.RefObject<HTMLDivElement>
}

const TimelineContext = React.createContext<TimelineContextType | null>(null)

export function TimelineContextProvider(props: {
  panelRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}) {
  const { panelRef, children } = props

  const contextValue = useMemo(() => {
    return {
      panelRef,
    }
  }, [panelRef])

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

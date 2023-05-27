import useWindowResize from "hooks/useWindowResize"
import React, { useMemo, useContext, useState, useEffect } from "react"

type TimelineContextType = {
  panelRef: React.RefObject<HTMLDivElement>
  panelWidth: number
}

const TimelineContext = React.createContext<TimelineContextType | null>(null)

export function TimelineContextProvider(props: {
  panelRef: React.RefObject<HTMLDivElement>
  children: React.ReactNode
}) {
  const { panelRef, children } = props
  const [panelWidth, setPanelWidth] = useState(0)

  useEffect(() => {
    if (panelRef.current) {
      setPanelWidth(panelRef.current.clientWidth)
    }
  }, [panelRef])

  useWindowResize(() => {
    if (panelRef.current) {
      setPanelWidth(panelRef.current.clientWidth)
    }
  })

  const contextValue = useMemo(() => {
    return {
      panelRef,
      panelWidth,
    }
  }, [panelRef, panelWidth])

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

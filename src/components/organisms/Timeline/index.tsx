import React, { useRef } from "react"
import PlayerList from "./components/PlayerList"
import TimeGrid from "./components/TimeGrid"
import TimeBar from "./components/TimeBar"
import FightPanel from "./components/FightPanel"
import { TimelineContextProvider } from "./context/useTimelineContext"
import Toolbar from "./components/Toolbar"
import Markers from "./components/Markers"

function Timeline() {
  const panelRef = useRef<HTMLDivElement>(null)

  return (
    <div className="grid select-none bg-slate-900 py-3 px-5">
      <div ref={panelRef} className="relative z-0 flex flex-col">
        <TimelineContextProvider panelRef={panelRef}>
          <Toolbar />
          <TimeGrid />
          <Markers />
          <PlayerList />
          <TimeBar />
          <FightPanel />
        </TimelineContextProvider>
      </div>
    </div>
  )
}

export default Timeline

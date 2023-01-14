import React from "react"
import PlayerList from "./components/PlayerList"
import TimeGrid from "./components/TimeGrid"
import TimeBar from "./components/TimeBar"

function Timeline() {
  return (
    <div className="grid bg-slate-900 py-3 px-5">
      <div className="relative z-0 flex flex-col">
        <TimeGrid />
        <PlayerList />
        <TimeBar />
        <div>CastsArea</div>
      </div>
    </div>
  )
}

export default Timeline
import React from 'react'
import PlayerList from './components/PlayerList'
import TimeGrid from './components/TimeGrid'
import TimeBar from './components/TimeBar'

function Timeline() {
  return (
    <div className="bg-slate-900 py-3 px-5 grid">
      <div className="flex flex-col relative z-0">
        <TimeGrid />
        <PlayerList />
        <TimeBar />
        <div>CastsArea</div>
      </div>
    </div>
  )
}

export default Timeline
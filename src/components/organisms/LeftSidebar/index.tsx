import React from "react"
import ClassList from "./components/ClassList"
import PlayerList from "./components/PlayerList"

function LeftSidebar() {
  return (
    <div className="flex flex-col border-r-2 border-r-slate-700">
      <ClassList />
      <PlayerList />
    </div>
  )
}

export default LeftSidebar

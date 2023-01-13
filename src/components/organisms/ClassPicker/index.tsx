import React from 'react'
import ClassList from './components/ClassList'
import PlayerList from './components/PlayerList'

function ClassPicker() {

  return (
    <div className="grid grid-cols-1 grid-rows-[auto_minmax(0px,_1fr)] border-r-2 border-r-slate-700">
      <ClassList />
      <PlayerList />
    </div>
  )
}

export default ClassPicker
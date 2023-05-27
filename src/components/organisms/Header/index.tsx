import React, { useState } from "react"
// import OptionsDrawer from "./components/OptionsDrawer"
import IconButton from "components/atoms/IconButton"
import NotesDrawer from "./components/NotesDrawer"

function Header() {
  const [isNotesOpen, setIsNotesOpen] = useState(false)
  // const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  return (
    <>
    <header className="relative border-b-2 border-slate-700 py-3 flex justify-center">
      <h1 className="font-semibold text-2xl">Lackoplan</h1>
      <div className="absolute top-0 bottom-0 right-0 flex items-center px-3 text-xl gap-2">
        <IconButton icon="note" onClick={() => setIsNotesOpen(true)} />
        {/* <IconButton icon="settings" onClick={() => setIsOptionsOpen(true)} /> */}
      </div>
    </header>
    <NotesDrawer isOpen={isNotesOpen} onCloseRequest={() => setIsNotesOpen(false)} />
    {/* <OptionsDrawer isOpen={isOptionsOpen} onCloseRequest={() => setIsOptionsOpen(false)} /> */}
    </>
  )
}

export default Header

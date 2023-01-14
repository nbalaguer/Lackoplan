import React from "react"
import Header from "components/organisms/Header"
import PlayerPicker from "components/organisms/PlayerPicker"
import Timeline from "components/organisms/Timeline"
import FightPicker from "components/organisms/FightPicker"

function App() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-[auto_1fr_auto]">
        <PlayerPicker />
        <Timeline />
        <FightPicker />
      </main>
    </>
  )
}

export default App

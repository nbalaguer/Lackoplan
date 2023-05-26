import React from "react"
import Header from "components/organisms/Header"
import LeftSidebar from "components/organisms/LeftSidebar"
import Timeline from "components/organisms/Timeline"
import RightSidebar from "components/organisms/RightSidebar"

function App() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-[auto_1fr_auto]">
        <LeftSidebar />
        <Timeline />
        <RightSidebar />
      </main>
    </>
  )
}

export default App

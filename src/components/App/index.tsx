import React from "react"
import Header from "components/organisms/Header"
import LeftSidebar from "components/organisms/LeftSidebar"
import Timeline from "components/organisms/Timeline"
import RightSidebar from "components/organisms/RightSidebar"
import { FileContextProvider } from "context/FileContext"

function App() {
  return (
    <FileContextProvider>
      <Header />
      <main className="grid grid-cols-[auto_1fr_auto] grid-rows-[minmax(0,auto)]">
        <LeftSidebar />
        <Timeline />
        <RightSidebar />
      </main>
    </FileContextProvider>
  )
}

export default App

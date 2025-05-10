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
      <main className="grid grid-cols-[auto_minmax(0px,1fr)_auto] grid-rows-[minmax(0px,auto)] min-h-[900px]">
        <LeftSidebar />
        <Timeline />
        <RightSidebar />
      </main>
    </FileContextProvider>
  )
}

export default App

import React from "react"
import Header from "components/organisms/Header"
import ClassPicker from "components/organisms/ClassPicker"
import Timeline from "components/organisms/Timeline"

function App() {
  return (
    <>
      <Header />
      <main className="grid grid-cols-[auto_1fr_auto]">
        <ClassPicker />
        <Timeline />
        <div>3</div>
      </main>
    </>
  )
}

export default App

import React from 'react'
import { useAppStore } from 'store'

function App() {
  const duration = useAppStore((state) => state.duration)

  return (
    <>
    <div>header</div>
    <main className="">App {duration}</main>
    <div>footer</div>
    </>
  )
}

export default App
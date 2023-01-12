import React from 'react'
import { useAppStore } from 'store'

function App() {
  const duration = useAppStore((state) => state.duration)

  return (
    <div className="">App {duration}</div>
  )
}

export default App
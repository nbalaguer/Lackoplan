import React from 'react'
import theme from 'config/theme'
import { useAppStore } from 'store'
import { getColorType } from 'utils'

function App() {
  const duration = useAppStore((state) => state.duration)

  return (
    <>
    <div className={`bg-slate-400 text-contrast-${getColorType(theme.colors.slate[400])}`}>header</div>
    <main className="">App {duration}</main>
    <div>footer</div>
    </>
  )
}

export default App
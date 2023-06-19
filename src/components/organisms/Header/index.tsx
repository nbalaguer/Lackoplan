import useFileContext from "context/FileContext"
import React from "react"
import Help from "./components/Help"

function Header() {
  const { fileHandle, isFileSystemSupported } = useFileContext()

  return (
    <header className="relative flex items-baseline justify-center border-b-2 border-slate-700 py-3">
      <h1 className="text-2xl font-semibold">Lackoplan</h1>
      {isFileSystemSupported && fileHandle && (
        <span className="ml-2 text-sm text-slate-400">{`[${fileHandle.name}]`}</span>
      )}
      <div className="absolute right-0 top-0 flex h-full items-center gap-4 pr-3">
        <a
          className="rounded-md border-2 border-yellow-600 bg-yellow-400 px-2 py-1 text-sm font-medium text-slate-800 transition-transform hover:scale-105"
          href="https://www.buymeacoffee.com/lackobread"
          rel="noreferrer noopener"
          target="_blank"
        >
          🍞 Buy me a toast
        </a>
        <Help />
      </div>
    </header>
  )
}

export default Header

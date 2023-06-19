import useFileContext from "context/FileContext"
import React from "react"
import Help from "./components/Help"

function Header() {
  const {fileHandle, isFileSystemSupported} = useFileContext()

  return (
    <header className="relative flex justify-center border-b-2 items-baseline border-slate-700 py-3">
      <h1 className="text-2xl font-semibold">Lackoplan</h1>
      {(isFileSystemSupported && fileHandle) && (
        <span className="text-sm text-slate-400 ml-2">{`[${fileHandle.name}]`}</span>
      )}
      <div className="absolute right-0 top-0 h-full flex items-center pr-3 gap-4">
        <a className="px-2 py-1 rounded-md bg-yellow-400 text-slate-800 text-sm font-medium border-yellow-600 border-2 hover:scale-105 transition-transform" href="https://www.buymeacoffee.com/lackobread" rel="noreferrer noopener" target="_blank">
          🍞 Buy me a toast
        </a>
        <Help />
      </div>
    </header>
  )
}

export default Header

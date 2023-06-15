import React, { useContext, useMemo, useState } from "react"
import { isFileSystemSupported } from "./utils"

type FileContextValue = {
  isFileSystemSupported: boolean
  // eslint-disable-next-line no-undef
  fileHandle: FileSystemFileHandle | null
  // eslint-disable-next-line no-undef
  setFileHandle: React.Dispatch<
    React.SetStateAction<FileSystemFileHandle | null>
  >
}

const FileContext = React.createContext<FileContextValue | null>(null)

export function FileContextProvider(props) {
  const { children } = props

  // eslint-disable-next-line no-undef
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(
    null
  )

  const contextValue = useMemo(() => {
    return {
      isFileSystemSupported,
      fileHandle,
      setFileHandle,
    }
  }, [fileHandle])

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  )
}

function useFileContext() {
  const contextValue = useContext(FileContext)
  if (!contextValue) throw new Error("ContextProvider not found")
  return contextValue
}

export default useFileContext

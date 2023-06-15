import Button from "components/atoms/Button"
import useFileContext from "components/context/FileContext"
import { requestLoadFile } from "components/context/FileContext/utils"
import { Base64 } from "js-base64"
import React, { useCallback } from "react"
import { useAppStore } from "store"

function LoadFile() {
  const importState = useAppStore((state) => state.importState)
  const { isFileSystemSupported, setFileHandle } = useFileContext()

  const handleLoad = useCallback(async () => {
    try {
      const handle = await requestLoadFile()
      setFileHandle(handle)
      const file = await handle.getFile()
      const importString = await file.text()
      importState(JSON.parse(Base64.decode(importString)))
    } catch {
      // User aborted, ignore
    }
  }, [importState, setFileHandle])

  if (!isFileSystemSupported) return null

  return <Button text="Load" onClick={handleLoad} />
}

export default LoadFile

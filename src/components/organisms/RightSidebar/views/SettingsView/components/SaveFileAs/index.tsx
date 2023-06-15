import Button from "components/atoms/Button"
import useFileContext from "components/context/FileContext"
import { requestSaveFileAs } from "components/context/FileContext/utils"
import { Base64 } from "js-base64"
import React, { useCallback } from "react"
import { useAppStore } from "store"

function SaveFileAs() {
  const exportState = useAppStore((state) => state.exportState)
  const { isFileSystemSupported, setFileHandle } = useFileContext()

  const handleSaveAs = useCallback(async () => {
    const exportedState = exportState(true)
    const exportString = Base64.encode(JSON.stringify(exportedState))

    try {
      const newFileHandle = await requestSaveFileAs(exportString)
      setFileHandle(newFileHandle)
      alert("File Saved")
    } catch (error) {
      console.error(error)
    }
  }, [exportState, setFileHandle])

  if (!isFileSystemSupported) return null

  return <Button text="Save as..." onClick={handleSaveAs} />
}

export default SaveFileAs

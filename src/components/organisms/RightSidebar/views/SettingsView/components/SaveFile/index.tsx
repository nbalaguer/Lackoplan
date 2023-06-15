import Button from 'components/atoms/Button'
import useFileContext from 'components/context/FileContext'
import { requestSaveFile } from 'components/context/FileContext/utils'
import { Base64 } from 'js-base64'
import React, {useCallback} from 'react'
import { useAppStore } from 'store'

function SaveFileAs() {
  const exportState = useAppStore((state) => state.exportState)
  const {isFileSystemSupported, fileHandle} = useFileContext()

  const handleSave = useCallback(async () => {
    if (!fileHandle) return

    const exportedState = exportState(true)
    const exportString = Base64.encode(JSON.stringify(exportedState))

    try {
      await requestSaveFile(fileHandle, exportString)
      alert("File Saved")
    }
    catch(error) {
      console.error(error)
    }
  }, [exportState, fileHandle])

  if (!isFileSystemSupported) return null

  return (
    <Button text="Save" onClick={handleSave} disabled={!fileHandle} />
  )
}

export default SaveFileAs
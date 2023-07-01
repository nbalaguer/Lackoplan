import Modal from "components/templates/Modal"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { useAppStore } from "store"
import { Base64 } from "js-base64"
import Switch from "components/atoms/Switch"
import Button from "components/atoms/Button"
import IconButton from "components/atoms/IconButton"

function ExportString() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const exportState = useAppStore((state) => state.exportState)
  const [checked, setChecked] = useState(false)
  const [exportString, setExportString] = useState("")

  const getExportString = useCallback(
    (includeOverlays: boolean) => {
      const exportedState = exportState(includeOverlays)
      return Base64.encode(JSON.stringify(exportedState))
    },
    [exportState]
  )

  const handleExportOverlaysChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      const exportOverlayConfig = event.target.checked
      setChecked(exportOverlayConfig)
      setExportString(getExportString(exportOverlayConfig))
    },
    [getExportString]
  )

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return
    inputRef.current.select()
  }, [isModalOpen, exportString])

  return (
    <>
      <Button
        text="Export string"
        onClick={() => {
          setIsModalOpen(true)
          setExportString(getExportString(checked))
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="relative h-2/3 w-full max-w-screen-lg space-y-2 border-2 border-slate-700 p-4"
      >
        <div className="flex items-center justify-between">
          <Switch
            label="Include overlays"
            checked={checked}
            onChange={handleExportOverlaysChange}
            reverse
          />
          <IconButton
            icon="close"
            onClick={() => setIsModalOpen(false)}
            className="text-md"
          />
        </div>
        <textarea
          ref={inputRef}
          className="h-full resize-none bg-slate-900/60 px-3 py-2 text-sm outline-none"
          value={exportString}
          readOnly
        />
      </Modal>
    </>
  )
}

export default ExportString

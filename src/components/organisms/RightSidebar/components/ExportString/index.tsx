import Modal from "components/templates/Modal"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { useAppStore } from "store"
import { Base64 } from "js-base64"
import Switch from "components/atoms/Switch"
import Button from 'components/atoms/Button'

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
      <Button text="Export string" onClick={() => {
          setIsModalOpen(true)
          setExportString(getExportString(checked))
        }} />
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="h-2/3 w-full max-w-screen-lg space-y-2 p-4"
      >
        <div className="flex justify-end">
          <Switch
            label="Include overlays"
            checked={checked}
            onChange={handleExportOverlaysChange}
            reverse
          />
        </div>
        <textarea
          ref={inputRef}
          className="h-full border-2 border-slate-600 bg-transparent px-3 py-2 text-sm outline-none"
          value={exportString}
          readOnly
        />
      </Modal>
    </>
  )
}

export default ExportString

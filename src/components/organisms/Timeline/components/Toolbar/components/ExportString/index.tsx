import Modal from "components/templates/Modal"
import React, { useState, useCallback, useEffect, useRef } from "react"
import { useAppStore } from "store"
import { Base64 } from "js-base64"
import Switch from "components/atoms/Switch"

function ExportString() {
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const exportState = useAppStore((state) => state.exportState)
  const [checked, setChecked] = useState(false)
  const [exportString, setExportString] = useState("")

  const getExportString = useCallback((includeOverlays: boolean) => {
    const exportedState = exportState(includeOverlays)
    return Base64.encode(JSON.stringify(exportedState))
  }, [exportState])

  const handleExportOverlaysChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const exportOverlayConfig = event.target.checked
    setChecked(exportOverlayConfig)
    setExportString(getExportString(exportOverlayConfig))
  }, [getExportString])

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return
    inputRef.current.select()
  }, [isModalOpen, exportString])

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true)
          setExportString(getExportString(checked))
        }}
        className="border-2 border-slate-500 bg-slate-700 px-2 text-xs font-medium text-slate-200 transition-colors duration-100 hover:bg-slate-600"
      >
        Export string
      </button>
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="h-2/3 w-full max-w-screen-lg p-4 space-y-2"
      >
        <div className="flex justify-end">
          <Switch label="Include overlays" checked={checked} onChange={handleExportOverlaysChange} reverse />
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

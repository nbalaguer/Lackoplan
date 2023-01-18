import Modal from 'components/templates/Modal'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAppStore } from 'store'
import { Base64 } from 'js-base64'

function ExportString() {

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const exportState = useAppStore((state) => state.exportState)

  const getExportString = useCallback(() => {
    const exportedState = exportState()
    return Base64.encode(JSON.stringify(exportedState))
  }, [exportState])

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return
    inputRef.current.select()
  }, [isModalOpen])

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-slate-700 text-slate-200 px-2 text-xs font-medium border-2 border-slate-500 hover:bg-slate-600 transition-colors duration-100"
      >
        Export string
      </button>
      <Modal isOpen={isModalOpen} onCloseRequest={() => setIsModalOpen(false)} className="max-w-screen-lg w-full p-4 h-2/3">
        <textarea ref={inputRef} className="bg-transparent h-full border-2 border-slate-600 px-3 py-2 text-sm outline-none" value={getExportString()} readOnly />
      </Modal>
    </>
  )
}

export default ExportString
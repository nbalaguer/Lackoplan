import React, { useState, useCallback } from 'react'
import Modal from 'components/templates/Modal'
import { useAppStore } from 'store'
import { Base64 } from 'js-base64'
import { useForm } from 'react-hook-form'

type FormData = {
  importString: string,
}

function ImportString() {

  const importState = useAppStore((state) => state.importState)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {register, handleSubmit, reset} = useForm<FormData>()

  const onSubmit = useCallback((data: FormData) => {
    importState(JSON.parse(Base64.decode(data.importString)))
  }, [importState])

  const handleOpen = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-slate-700 text-slate-200 px-2 text-xs font-medium border-2 border-slate-500 hover:bg-slate-600 transition-colors duration-100"
      >
        Import string
      </button>
      <Modal
        isOpen={isModalOpen}
        className="max-w-screen-lg w-full p-4 h-2/3"
        onCloseRequest={handleOpen}
      >
        <form className="flex flex-col h-full gap-2" onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register("importString")} className="bg-transparent h-full border-2 border-slate-600 px-3 py-2 text-sm outline-none" />
          <button type="submit" className="self-end bg-slate-700 text-slate-200 px-4 py-1 text-md font-medium border-2 border-slate-500 hover:bg-slate-600 transition-colors duration-100">Import</button>
        </form>
      </Modal>
    </>
  )
}

export default ImportString
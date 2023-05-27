import React, { useState, useCallback } from "react"
import Modal from "components/templates/Modal"
import { useAppStore } from "store"
import { Base64 } from "js-base64"
import { useForm } from "react-hook-form"
import Button from "components/atoms/Button"

type FormData = {
  importString: string
}

function ImportString() {
  const importState = useAppStore((state) => state.importState)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { register, handleSubmit, reset } = useForm<FormData>()

  const onSubmit = useCallback(
    (data: FormData) => {
      importState(JSON.parse(Base64.decode(data.importString)))
      setIsModalOpen(false)
    },
    [importState]
  )

  const handleOpen = useCallback(() => {
    setIsModalOpen(false)
    reset()
  }, [reset])

  return (
    <>
      <Button text="Import string" onClick={() => setIsModalOpen(true)} />
      <Modal
        isOpen={isModalOpen}
        className="h-2/3 w-full max-w-screen-lg p-4"
        onCloseRequest={handleOpen}
      >
        <form
          className="flex h-full flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("importString")}
            className="h-full border-2 border-slate-600 bg-transparent px-3 py-2 text-sm outline-none"
          />
          <button
            type="submit"
            className="text-md self-end border-2 border-slate-500 bg-slate-700 px-4 py-1 font-medium text-slate-200 transition-colors duration-100 hover:bg-slate-600"
          >
            Import
          </button>
        </form>
      </Modal>
    </>
  )
}

export default ImportString

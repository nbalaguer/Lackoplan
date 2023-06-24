import React, { useState, useCallback } from "react"
import Modal from "components/templates/Modal"
import { useAppStore } from "store"
import { Base64 } from "js-base64"
import { useForm } from "react-hook-form"
import Button from "components/atoms/Button"
import IconButton from "components/atoms/IconButton"

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
        className="h-2/3 w-full max-w-screen-lg space-y-2 border-2 border-slate-700 p-4"
        onCloseRequest={handleOpen}
      >
        <div className="flex justify-end">
          <IconButton
            icon="close"
            onClick={() => setIsModalOpen(false)}
            className="text-md"
          />
        </div>
        <form
          className="flex h-full flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("importString")}
            className="h-full resize-none bg-slate-900/60 px-3 py-2 text-sm outline-none"
          />
          <Button text="Import" htmlType="submit" className="self-end" />
        </form>
      </Modal>
    </>
  )
}

export default ImportString

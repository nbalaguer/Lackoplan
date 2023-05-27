import Button from "components/atoms/Button"
import IconButton from "components/atoms/IconButton"
import Markdown from "components/atoms/Markdown"
import Drawer from "components/templates/Drawer"
import React, { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"

type FormData = {
  userNote: string
}

function NotesDrawer(props: { isOpen: boolean; onCloseRequest: () => void }) {
  const { isOpen, onCloseRequest } = props

  const [isEditMode, setIsEditMode] = useState(false)
  const userNote = useAppStore((state) => state.userNote)
  const setUserNote = useAppStore((state) => state.setUserNote)

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      userNote,
    },
  })

  useEffect(() => {
    if (isOpen) {
      reset({ userNote })
    }
  }, [isOpen, reset, userNote])

  const onSubmit = useCallback(
    (data: FormData) => {
      setUserNote(data.userNote)
      setIsEditMode(false)
    },
    [setUserNote]
  )

  return (
    <Drawer
      isOpen={isOpen}
      side="right"
      onCloseRequest={onCloseRequest}
      className="flex w-[900px] max-w-[90%] flex-col gap-4 border-l-2 border-slate-700 p-3"
    >
      <div className="flex items-center justify-between">
        {!isEditMode && (
          <Button text="edit" onClick={() => setIsEditMode(true)} />
        )}
        {isEditMode && <Button htmlForm="noteForm" text="done" />}
        <IconButton icon="close" onClick={onCloseRequest} />
      </div>
      {!isEditMode && (
        <div className="flex-grow overflow-auto">
          <Markdown markdown={userNote} />
        </div>
      )}
      {isEditMode && (
        <form
          id="noteForm"
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow"
        >
          <textarea
            {...register("userNote")}
            className="w-full resize-none border-2 border-slate-600 bg-transparent px-3 py-2 text-sm outline-none"
          />
        </form>
      )}
    </Drawer>
  )
}

export default NotesDrawer

import IconButton from "components/atoms/IconButton"
import Markdown from "components/atoms/Markdown"
import React, { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"

type FormData = {
  userNote: string
}

function NoteView() {
  const [isEditMode, setIsEditMode] = useState(false)
  const userNote = useAppStore((state) => state.userNote)
  const setUserNote = useAppStore((state) => state.setUserNote)

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      userNote,
    },
  })

  const onSubmit = useCallback(
    (data: FormData) => {
      setUserNote(data.userNote)
      setIsEditMode(false)
    },
    [setUserNote]
  )

  return (
    <div className="flex w-[450px] flex-col gap-2 p-4">
      <div className="-mx-2 -mt-2 flex items-center justify-end">
        {isEditMode ? (
          <IconButton key="done" icon="check" htmlForm="noteForm" />
        ) : (
          <IconButton
            key="edit"
            icon="edit"
            onClick={() => setIsEditMode(true)}
          />
        )}
      </div>
      {!isEditMode && (
        <div className="flex-grow overflow-auto break-words">
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
            className="w-full resize-none px-3 py-2 text-sm outline-none border-2 bg-slate-800 border-slate-600"
          />
        </form>
      )}
    </div>
  )
}

export default NoteView

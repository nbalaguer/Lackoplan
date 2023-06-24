import Modal from "components/templates/Modal"
import React, { useCallback, useState, useRef, useEffect } from "react"
import { MRTGetTimelineString } from "utils/MRT"
import Switch from "components/atoms/Switch"
import Button from "components/atoms/Button"
import CopyButton from "components/molecules/CopyButton"
import IconButton from "components/atoms/IconButton"

function ExportMRTString() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [MRTString, setMRTString] = useState("")
  const [checked, setChecked] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleGroupingChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const groupByConfig = event.target.checked ? "player" : "none"
    setMRTString(MRTGetTimelineString({ groupBy: groupByConfig }))
    setChecked(event.target.checked)
  }, [])

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return
    inputRef.current.select()
  }, [isModalOpen, MRTString])

  return (
    <>
      <Button
        text="Export MRT"
        onClick={() => {
          setIsModalOpen(true)
          setMRTString(
            MRTGetTimelineString({ groupBy: checked ? "player" : "none" })
          )
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="relative h-2/3 w-full max-w-screen-lg space-y-2 border-2 border-slate-700 p-4"
      >
        <div className="flex items-center justify-between">
          <Switch
            label="Group by player"
            checked={checked}
            onChange={handleGroupingChange}
          />
          <IconButton
            icon="close"
            onClick={() => setIsModalOpen(false)}
            className="text-md"
          />
        </div>
        <textarea
          className="h-full resize-none bg-slate-900/60 px-3 py-2 text-sm outline-none"
          value={MRTString}
          readOnly
          ref={inputRef}
        />
        <CopyButton
          clipboardData={MRTString}
          className="absolute bottom-7 right-6 text-lg"
        />
      </Modal>
    </>
  )
}

export default ExportMRTString

import Modal from "@/components/templates/Modal"
import React, { useCallback, useState, useRef, useEffect } from "react"
import { NSGetTimelineString } from "@/utils/timeline/NS"
import Switch from "@/components/inputs/Switch"
import Button from "@/components/atoms/Button"
import IconButton from "@/components/atoms/IconButton"

function ExportNSString() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [NSString, setNSString] = useState("")
  const [checked, setChecked] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const handleGroupingChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const groupByConfig = event.target.checked ? "player" : "none"
    setNSString(NSGetTimelineString({ groupBy: groupByConfig }))
    setChecked(event.target.checked)
  }, [])

  useEffect(() => {
    if (!isModalOpen || !inputRef.current) return
    inputRef.current.select()
  }, [isModalOpen, NSString])

  return (
    <>
      <Button
        text="Export NS"
        onClick={() => {
          setIsModalOpen(true)
          setNSString(
            NSGetTimelineString({ groupBy: checked ? "player" : "none" })
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
          value={NSString}
          readOnly
          ref={inputRef}
        />
      </Modal>
    </>
  )
}

export default ExportNSString

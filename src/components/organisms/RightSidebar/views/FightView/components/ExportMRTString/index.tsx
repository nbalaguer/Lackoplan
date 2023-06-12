import Modal from "components/templates/Modal"
import React, { useCallback, useState } from "react"
import { MRTGetTimelineString } from "utils/MRT"
import Switch from "components/atoms/Switch"
import Button from "components/atoms/Button"

function ExportMRTString() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [MRTString, setMRTString] = useState("")
  const [checked, setChecked] = useState(false)

  const handleGroupingChange = useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((event) => {
    const groupByConfig = event.target.checked ? "player" : "none"
    setMRTString(MRTGetTimelineString({ groupBy: groupByConfig }))
    setChecked(event.target.checked)
  }, [])

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
        className="h-2/3 w-full max-w-screen-lg space-y-2 p-4"
      >
        <div className="flex justify-end">
          <Switch
            label="Group by player"
            checked={checked}
            onChange={handleGroupingChange}
            reverse
          />
        </div>
        <textarea
          className="h-full border-2 border-slate-600 bg-transparent px-3 py-2 text-sm outline-none"
          value={MRTString}
          readOnly
        />
      </Modal>
    </>
  )
}

export default ExportMRTString

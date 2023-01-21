import Modal from "components/templates/Modal"
import React, { useCallback, useState } from "react"
import { MRTGetTimelineString } from "utils/MRT"
import {motion} from 'framer-motion'
import classNames from "classnames"

function ExportMRTString() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [MRTString, setMRTString] = useState("")
  const [checked, setChecked] = useState(false)

  const handleGroupingChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
    const groupByConfig = event.target.checked ? "player" : "none"
    setMRTString(MRTGetTimelineString({groupBy: groupByConfig}))
    setChecked(event.target.checked)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true)
          setMRTString(MRTGetTimelineString({groupBy: "none"}))
        }}
        className="border-2 border-slate-500 bg-slate-700 px-2 text-xs font-medium text-slate-200 transition-colors duration-100 hover:bg-slate-600"
      >
        Export MRT
      </button>
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="h-2/3 w-full max-w-screen-lg p-4 space-y-2"
      >
        <div className="flex justify-end">
          <label className="flex gap-2 items-center select-none group">
            <input className="hidden" type="checkbox" onChange={handleGroupingChange} checked={checked} />
            <span className="text-sm">Group by player</span>
            <div className={classNames(
              "w-7 flex justify-start border-2 border-slate-500 bg-slate-700 group-hover:bg-slate-600 transition-colors duration-100", {
                ["justify-end"]: checked
              }
            )}>
              <motion.div
                layout
                transition={{duration: 0.15}}
                className={classNames(
                  "w-3 h-2 bg-slate-500 transition-colors duration-150", {
                    ["bg-slate-300"]: checked
                  }
                )} />
            </div>
          </label>
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

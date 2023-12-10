import React from "react"
import classNames from "classnames"
import { motion } from "framer-motion"

function Switch(props: {
  checked: boolean
  onChange: React.ChangeEventHandler
  label?: string
  reverse?: boolean
}) {
  const { checked, onChange, label, reverse } = props

  return (
    <label className="group flex select-none items-center gap-2">
      <input
        className="hidden"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      {!!label && reverse && <span className="text-sm">{label}</span>}
      <div
        className={classNames(
          "flex w-7 justify-start border-2 border-slate-500 bg-slate-500 transition-colors duration-100",
          {
            ["justify-end"]: checked,
          }
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.15 }}
          className="h-2 w-3 bg-slate-700 transition-colors duration-150 group-hover:bg-slate-600"
        />
      </div>
      {!!label && !reverse && <span className="text-sm">{label}</span>}
    </label>
  )
}

export default Switch

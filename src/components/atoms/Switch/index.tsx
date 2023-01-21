import React from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

function Switch(props: {
  checked: boolean,
  onChange: React.ChangeEventHandler
  label: string
  reverse?: boolean
}) {

  const {
    checked,
    onChange,
    label,
    reverse,
  } = props

  return (
    <label className="flex gap-2 items-center select-none group">
      <input className="hidden" type="checkbox" onChange={onChange} checked={checked} />
      {reverse && <span className="text-sm">{label}</span>}
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
      {!reverse && <span className="text-sm">{label}</span>}
    </label>
  )
}

export default Switch
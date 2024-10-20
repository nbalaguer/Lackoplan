import React from "react"
import classNames from "classnames"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"

/* TODO make it compatible with react-hook-form. Try to make it both controlled and uncontrolled */
const Switch = React.forwardRef(function Switch(
  props: {
    className?: string
    checked: boolean
    onChange: React.ChangeEventHandler
    label?: string
    reverse?: boolean
  },
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { className, checked, onChange, label, reverse } = props

  return (
    <label
      className={twMerge(
        "group flex select-none items-center gap-2",
        className
      )}
    >
      <input
        ref={ref}
        className="hidden peer"
        type="checkbox"
        onChange={onChange}
        checked={checked}
      />
      {!!label && reverse && <span className="text-sm">{label}</span>}
      <div
        className={classNames(
          "flex w-7 justify-start border-2 p-px",
          "border-slate-500 bg-slate-700",
          "peer-checked:justify-end",
          "peer-checked:bg-slate-600",
          "transition-colors duration-100",
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.15 }}
          className={classNames(
            "h-2 w-3",
            "bg-slate-500",
            "group-hover:bg-slate-400",
            "group-has-[:checked]:bg-slate-400",
            "transition-colors duration-150"
          )}
        />
      </div>
      {!!label && !reverse && <span className="text-sm">{label}</span>}
    </label>
  )
})

export default Switch

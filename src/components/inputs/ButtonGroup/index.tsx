import classNames from "classnames"
import Icon from "components/atoms/Icon"
import React from "react"
import type { UseFormRegisterReturn } from "react-hook-form"
import { twMerge } from "tailwind-merge"

const Button = React.forwardRef(function Button(
  props: {
    className?: string
    text: string
    startIcon?: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
    endIcon?: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
    disabled?: boolean
    value: React.InputHTMLAttributes<HTMLInputElement>["value"]
  } & Omit<UseFormRegisterReturn, "ref">,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { className, text, startIcon, endIcon, ...inputProps } = props

  return (
    <label
      className={twMerge(
        classNames(
          className,
          "flex items-center justify-center gap-2 px-2 py-1 text-xs font-medium uppercase select-none",
          "bg-slate-800 text-slate-400",
          "hover:bg-slate-700",
          "has-[:checked]:bg-slate-600 has-[:checked]:text-slate-200",
          "has-[:disabled]:bg-slate-800 has-[:disabled]:text-slate-500",
          "transition-colors duration-100"
        )
      )}
    >
      <input ref={ref} type="radio" className="hidden" {...inputProps} />
      {startIcon && <Icon icon={startIcon} />}
      {text}
      {endIcon && <Icon icon={endIcon} />}
    </label>
  )
})

function ButtonGroup(props: { className?: string; children: React.ReactNode }) {
  const { className, children } = props

  return (
    <div
      className={twMerge(
        classNames(className, "flex border-2", "border-slate-500")
      )}
    >
      {children}
    </div>
  )
}

ButtonGroup.Button = Button

export default ButtonGroup

import React, { forwardRef } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

const TextInput = forwardRef(function TextInput(
  props: {
    label: string
  } & Omit<UseFormRegisterReturn, "ref">,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const { label, ...registerOptions } = props

  return (
    <label className="block space-y-1">
      <span className="text-xs">{label}</span>
      <input
        ref={ref}
        {...registerOptions}
        type="text"
        className="w-full px-2 bg-slate-800 border-2 border-slate-500 text-white"
        autoComplete="off"
      />
    </label>
  )
})

export default TextInput

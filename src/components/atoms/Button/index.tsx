import React from 'react'
import Icon from 'components/atoms/Icon'

function Button(props: {
  text: string
  startIcon?: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
  endIcon?: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  htmlForm?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {

  const {
    text,
    startIcon,
    endIcon,
    htmlType,
    htmlForm,
    onClick,
    disabled,
  } = props

  return (
    <button
      type={htmlType}
      form={htmlForm}
      className="flex gap-2 items-center justify-center border-2 border-slate-500 bg-slate-700 px-2 py-1 text-sm font-medium text-slate-200 transition-colors duration-100 hover:bg-slate-600"
      onClick={onClick}
      disabled={disabled}
    >
      {startIcon && <Icon icon={startIcon} />}
      {text}
      {endIcon && <Icon icon={endIcon} />}
    </button>
  )
}

export default Button
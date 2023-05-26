import React from "react"
import Icon from 'components/atoms/Icon'

function IconButton(props: {
  icon: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  htmlForm?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {
  const { icon, onClick, htmlType, htmlForm, disabled = false } = props

  return (
    <button
      type={htmlType}
      form={htmlForm}
      className="rounded-full bg-transparent p-1.5 transition-colors hover:bg-slate-100/20 disabled:text-slate-400 disabled:hover:bg-transparent"
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} />
    </button>
  )
}

export default IconButton

import React from "react"
import Icon from "components/atoms/Icon"
import classNames from "classnames"

function IconButton(props: {
  className?: string
  icon: React.ComponentPropsWithoutRef<typeof Icon>["icon"]
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  htmlForm?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {
  const {
    icon,
    onClick,
    htmlType,
    htmlForm,
    disabled = false,
    className,
  } = props

  return (
    <button
      type={htmlType}
      form={htmlForm}
      className={classNames(
        "rounded-full bg-transparent p-[0.5em] transition-colors hover:bg-slate-100/20 disabled:text-slate-400 disabled:hover:bg-transparent",
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon icon={icon} />
    </button>
  )
}

export default IconButton

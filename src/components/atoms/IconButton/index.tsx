import React from "react"
import { FiEdit2 as EditIcon } from "react-icons/fi"
import { FiCheck as CheckIcon } from "react-icons/fi"
import { MdClose as CloseIcon } from "react-icons/md"
import { MdAdd as AddIcon } from "react-icons/md"
import { FiEye as ShowIcon } from "react-icons/fi"
import { FiEyeOff as HideIcon } from "react-icons/fi"
import { MdKeyboardArrowUp as UpIcon } from "react-icons/md"
import { MdKeyboardArrowDown as DownIcon } from "react-icons/md"

const iconTypes = Object.freeze({
  edit: <EditIcon size={14} />,
  close: <CloseIcon size={14} />,
  check: <CheckIcon size={14} />,
  add: <AddIcon size={14} />,
  show: <ShowIcon size={14} />,
  hide: <HideIcon size={14} />,
  up: <UpIcon size={14} />,
  down: <DownIcon size={14} />,
})

function IconButton(props: {
  type: keyof typeof iconTypes
  htmlType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  htmlForm?: React.ButtonHTMLAttributes<HTMLButtonElement>["form"]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}) {
  const { type, onClick, htmlType, htmlForm, disabled = false } = props

  return (
    <button
      type={htmlType}
      form={htmlForm}
      className="rounded-full bg-transparent p-1.5 transition-colors hover:bg-slate-100/20 disabled:text-slate-400 disabled:hover:bg-transparent"
      onClick={onClick}
      disabled={disabled}
    >
      {iconTypes[type]}
    </button>
  )
}

export default IconButton

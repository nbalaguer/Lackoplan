import React from 'react'
import { FiEdit2 as EditIcon } from "react-icons/fi"
import { FiCheck as CheckIcon } from "react-icons/fi"
import { MdClose as CloseIcon } from "react-icons/md"
import { MdAdd as AddIcon } from "react-icons/md"
import { FiEye as ShowIcon } from "react-icons/fi"
import { FiEyeOff as HideIcon } from "react-icons/fi"
import { MdKeyboardArrowUp as UpIcon } from "react-icons/md"
import { MdKeyboardArrowDown as DownIcon } from "react-icons/md"
import { BiImport as ImportIcon } from 'react-icons/bi'
import { BiExport as ExportIcon } from 'react-icons/bi'
import { TbNotes as MRTNoteIcon } from 'react-icons/tb'

const defaultSize = "1.2em"

const icons = {
  edit: <EditIcon size={defaultSize} />,
  close: <CloseIcon size={defaultSize} />,
  check: <CheckIcon size={defaultSize} />,
  add: <AddIcon size={defaultSize} />,
  show: <ShowIcon size={defaultSize} />,
  hide: <HideIcon size={defaultSize} />,
  up: <UpIcon size={defaultSize} />,
  down: <DownIcon size={defaultSize} />,
  import: <ImportIcon size={defaultSize} />,
  export: <ExportIcon size={defaultSize} />,
  mrtnote: <MRTNoteIcon size={defaultSize} />
} as const

function Icon(props: {
  icon: keyof typeof icons
}) {
  const {icon} = props
  return icons[icon]
}

export default Icon
import React from "react"
import { MdEdit as EditIcon } from "react-icons/md"
import { FiCheck as CheckIcon } from "react-icons/fi"
import { MdClose as CloseIcon } from "react-icons/md"
import { MdAdd as AddIcon } from "react-icons/md"
import { FiEye as ShowIcon } from "react-icons/fi"
import { FiEyeOff as HideIcon } from "react-icons/fi"
import { MdKeyboardArrowUp as UpIcon } from "react-icons/md"
import { MdKeyboardArrowDown as DownIcon } from "react-icons/md"
import { BiImport as ImportIcon } from "react-icons/bi"
import { BiExport as ExportIcon } from "react-icons/bi"
import { TbNotes as MRTNoteIcon } from "react-icons/tb"
import { IoSettingsSharp as SettingsIcon } from "react-icons/io5"
import { RiStickyNoteFill as NoteIcon } from "react-icons/ri"
import { MdAreaChart as FightIcon } from "react-icons/md"
import { FaFolder as FolderIcon } from "react-icons/fa"

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
  mrtnote: <MRTNoteIcon size={defaultSize} />,
  settings: <SettingsIcon size={defaultSize} />,
  note: <NoteIcon size={defaultSize} />,
  fight: <FightIcon size={defaultSize} />,
  folder: <FolderIcon size={defaultSize} />,
} as const

export type IconName = keyof typeof icons

function Icon(props: { icon: IconName }) {
  const { icon } = props
  return icons[icon]
}

export default Icon

import React from "react"
import IconButton from "components/atoms/IconButton"

function PlayerActions(props: {
  onRemove: () => void
  disableMoveUp: boolean
  onMoveUp: () => void
  disableMoveDown: boolean
  onMoveDown: () => void
  onDuplicate: () => void
}) {
  const {
    onRemove,
    disableMoveUp: disableUp,
    onMoveUp,
    disableMoveDown: disableDown,
    onMoveDown,
    onDuplicate,
  } = props

  return (
    <div className="row-span-2 flex flex-col text-xs">
      <IconButton icon="close" onClick={onRemove} />
      <IconButton icon="up" onClick={onMoveUp} disabled={disableUp} />
      <IconButton icon="down" onClick={onMoveDown} disabled={disableDown} />
      <IconButton icon="duplicate" onClick={onDuplicate} />
    </div>
  )
}

export default PlayerActions

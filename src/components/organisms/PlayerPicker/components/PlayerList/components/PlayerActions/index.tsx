import React from "react"
import IconButton from "components/atoms/IconButton"

function PlayerActions(props: {
  onRemove: () => void
  disableMoveUp: boolean
  onMoveUp: () => void
  disableMoveDown: boolean
  onMoveDown: () => void
}) {

  const {
    onRemove,
    disableMoveUp: disableUp,
    onMoveUp,
    disableMoveDown: disableDown,
    onMoveDown,
  } = props

  return (
    <div className="row-span-2 flex flex-col">
      <IconButton type="close" onClick={onRemove} />
      <IconButton
        type="up"
        onClick={onMoveUp}
        disabled={disableUp}
      />
      <IconButton
        type="down"
        onClick={onMoveDown}
        disabled={disableDown}
      />
    </div>
  )
}

export default PlayerActions

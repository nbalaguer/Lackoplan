import React from "react"
import IconButton from "components/atoms/IconButton"
import { useAppStore } from "store"

function PlayerActions(props: {
  playerId: string
  onRemove: () => void
  disableMoveUp: boolean
  disableMoveDown: boolean
}) {
  const {
    playerId,
    onRemove,
    disableMoveUp: disableUp,
    disableMoveDown: disableDown,
  } = props

  const movePlayer = useAppStore((state) => state.movePlayer)
  const duplicatePlayer = useAppStore((state) => state.duplicatePlayer)

  return (
    <div className="row-span-2 flex flex-col text-xs">
      <IconButton icon="close" onClick={onRemove} />
      <IconButton icon="up" onClick={() => movePlayer(playerId, -1)} disabled={disableUp} />
      <IconButton icon="down" onClick={() => movePlayer(playerId, 1)} disabled={disableDown} />
      <IconButton icon="duplicate" onClick={() => duplicatePlayer(playerId)} />
    </div>
  )
}

export default React.memo(PlayerActions)

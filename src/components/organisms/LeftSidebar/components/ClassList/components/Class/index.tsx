import React, { type CSSProperties } from "react"
import WowheadIcon from "components/atoms/WowheadIcon"
import { classIcons } from "config/classes"
import { useAppStore } from "store"
import type { Class } from "types"
import { createPlayer } from "utils"
import theme from "config/theme"

function Class(props: { classKey: Class }) {
  const { classKey } = props

  const addPlayer = useAppStore((state) => state.addPlayer)

  return (
    <button
      className="group flex transition-[outline-color] duration-100 rounded-full overflow-hidden border-4"
      style={{
        borderColor: theme.colors[classKey],
      } as CSSProperties}
      onClick={() => {
        const newPlayer = createPlayer(classKey)
        addPlayer(newPlayer)
      }}
    >
      <WowheadIcon name={classIcons[classKey]} size="medium" className="group-hover:scale-110 transition-transform" />
    </button>
  )
}

export default Class

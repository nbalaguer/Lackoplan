import React, { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import IconButton from "components/atoms/IconButton"
import type { Player } from "types"
import { useForm } from "react-hook-form"
import composeRefs from "@seznam/compose-react-refs"

type Form = {
  name: string
}

function PlayerHeader(props: {
  player: Player
  onRemove: () => void
  onChangeName: (newName: string) => void
  onToggle: () => void
}) {
  const { player, onRemove, onChangeName, onToggle } = props

  const inputRef = useRef<HTMLInputElement>()
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit } = useForm<Form>()
  const { ref, ...nameProps } = register("name")

  useEffect(() => {
    if (!isEditing || !inputRef.current) return
    inputRef.current.select()
  }, [isEditing])

  const onSubmit = useCallback(
    (values: Form) => {
      onChangeName(values.name)
      setIsEditing(false)
    },
    [onChangeName]
  )

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-grow items-center gap-2 min-w-0">
        {isEditing ? (
          <form
            id={player.id}
            className="flex-grow"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={composeRefs(inputRef, ref)}
              {...nameProps}
              size={1}
              className="w-full border-none bg-transparent outline-none"
              type="text"
              defaultValue={player.name}
            />
          </form>
        ) : (
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {player.name}
          </span>
        )}
        <motion.span layout transition={{ duration: 0.15 }} className="flex">
          {isEditing ? (
            <IconButton
              key="done"
              type="check"
              htmlType="submit"
              htmlForm={player.id}
            />
          ) : (
            <IconButton
              key="edit"
              type="edit"
              onClick={() => setIsEditing(!isEditing)}
            />
          )}
        </motion.span>
      </div>
      {player.isActive
        ? <IconButton type="show" onClick={onToggle} />
        : <IconButton type="hide" onClick={onToggle} />
      }
      <IconButton type="close" onClick={onRemove} />
    </div>
  )
}

export default PlayerHeader

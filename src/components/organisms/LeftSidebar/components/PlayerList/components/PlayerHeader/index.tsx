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
  onChangeName: (newName: string) => void
  onToggle: () => void
}) {
  const { player, onToggle, onChangeName } = props

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
      <div className="flex min-w-0 flex-grow items-center gap-2">
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
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {player.name}
          </span>
        )}
        <motion.span
          layout
          transition={{ duration: 0.15 }}
          className="flex text-xs"
        >
          {isEditing ? (
            <IconButton
              key="done"
              icon="check"
              htmlType="submit"
              htmlForm={player.id}
            />
          ) : (
            <IconButton
              key="edit"
              icon="edit"
              onClick={() => setIsEditing(!isEditing)}
            />
          )}
        </motion.span>
      </div>
      {player.isActive ? (
        <IconButton icon="show" onClick={onToggle} className="text-xs" />
      ) : (
        <IconButton icon="hide" onClick={onToggle} className="text-xs" />
      )}
    </div>
  )
}

export default PlayerHeader

import React, { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import IconButton from "components/atoms/IconButton"
import { useForm } from "react-hook-form"
import composeRefs from "@seznam/compose-react-refs"
import { useAppStore } from "store"

type Form = {
  name: string
}

function PlayerHeader(props: {
  playerId: string
  name: string
  isActive: boolean
}) {
  const { playerId, name, isActive } = props

  const changePlayerName = useAppStore((state) => state.changePlayerName)
  const togglePlayer = useAppStore((state) => state.togglePlayer)

  const handleToggle = useCallback(() => {
    togglePlayer(playerId)
  }, [playerId, togglePlayer])

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
      changePlayerName(playerId, values.name)
      setIsEditing(false)
    },
    [changePlayerName, playerId]
  )

  return (
    <div className="flex items-center justify-between">
      <div className="flex min-w-0 flex-grow items-center gap-2">
        {isEditing ? (
          <form
            id={playerId}
            className="flex-grow"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              ref={composeRefs(inputRef, ref)}
              {...nameProps}
              size={1}
              className="w-full border-none bg-transparent outline-none"
              type="text"
              defaultValue={name}
            />
          </form>
        ) : (
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            {name}
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
              htmlForm={playerId}
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
      {isActive ? (
        <IconButton icon="show" onClick={handleToggle} className="text-xs" />
      ) : (
        <IconButton icon="hide" onClick={handleToggle} className="text-xs" />
      )}
    </div>
  )
}

export default React.memo(PlayerHeader)

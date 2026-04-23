import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "@/store"
import Button from "@/components/atoms/Button"
import { getTimeString, parseTimeString } from "@/utils"
import TextInput from "@/components/inputs/TextInput"
import ButtonGroup from "@/components/inputs/ButtonGroup"
import type { Difficulty } from "@/types"
import useEvent from "@/hooks/useEvent"

type FightForm = {
  duration: string
  encounterId: string
  difficulty: Difficulty
  boss: string
}

function FightConfig() {
  const duration = useAppStore((state) => state.duration)
  const encounterId = useAppStore((state) => state.encounterId)
  const difficulty = useAppStore((state) => state.difficulty)
  const boss = useAppStore((state) => state.boss)
  const setDuration = useAppStore((state) => state.setDuration)
  const setEncounterId = useAppStore((state) => state.setEncounterId)
  const setDifficulty = useAppStore((state) => state.setDifficulty)
  const setBoss = useAppStore((state) => state.setBoss)

  const { register, handleSubmit, getValues, setValue } = useForm<FightForm>({
    defaultValues: {
      duration: getTimeString(duration),
      encounterId: `${encounterId}`,
      difficulty,
      boss,
    },
  })

  useEffect(() => {
    if (duration !== Number(getValues().duration)) {
      setValue("duration", getTimeString(duration))
    }
  }, [duration, getValues, setValue])

  const onSubmit = useEvent((values: FightForm) => {
    setDuration(parseTimeString(values.duration))
    setEncounterId(Number(values.encounterId))
    setDifficulty(values.difficulty)
    setBoss(values.boss)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-3">
      <h3 className="text-md font-bold">Fight</h3>
      <ButtonGroup className="self-start" label="Difficulty">
        <ButtonGroup.Button
          text="NM"
          value="normal"
          {...register("difficulty")}
        />
        <ButtonGroup.Button
          text="HC"
          value="heroic"
          {...register("difficulty")}
        />
        <ButtonGroup.Button
          text="MM"
          value="mythic"
          {...register("difficulty")}
        />
      </ButtonGroup>
      <TextInput {...register("encounterId")} label="Encounter Id" />
      <TextInput {...register("boss")} label="Boss" />
      <TextInput {...register("duration")} label="Duration" />
      <Button htmlType="submit" text="update" className="mt-3" />
    </form>
  )
}

export default FightConfig

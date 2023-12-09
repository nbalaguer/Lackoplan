import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"
import Button from "components/atoms/Button"
import { getTimeString, parseTimeString } from "utils"

type FightForm = {
  duration: string
}

function FightConfig() {
  const duration = useAppStore((state) => state.duration)
  const setDuration = useAppStore((state) => state.setDuration)

  const { register, handleSubmit, getValues, setValue } = useForm<FightForm>({
    defaultValues: {
      duration: getTimeString(duration),
    },
  })

  useEffect(() => {
    if (duration !== Number(getValues().duration)) {
      setValue("duration", getTimeString(duration))
    }
  }, [duration, getValues, setValue])

  const onSubmit = useCallback(
    (values: FightForm) => {
      setDuration(parseTimeString(values.duration))
    },
    [setDuration]
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 p-3">
      <label className="block space-y-1">
        <div className="text-sm">Fight duration</div>
        <input {...register("duration")} className="px-2 text-black" />
      </label>
      <Button htmlType="submit" text="update" className="mt-3" />
    </form>
  )
}

export default FightConfig

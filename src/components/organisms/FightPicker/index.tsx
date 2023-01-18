import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"
import { getTimeString, parseTimeString } from "utils"
import OverlayConfig from "./components/OverlayConfig"

type FightForm = {
  duration: string
}

function FightPicker() {
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
    <div className="flex flex-col border-l-2 border-slate-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-b-2 border-slate-700 p-3"
      >
        <label className="space-y-1">
          <div className="text-sm">Fight duration</div>
          <input {...register("duration")} className="px-2 text-black" />
        </label>
      </form>
      <div className="flex-grow border-b-2 border-slate-700 p-3"></div>
      <OverlayConfig />
    </div>
  )
}

export default FightPicker

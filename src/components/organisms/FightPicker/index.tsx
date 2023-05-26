import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"
import { getTimeString, parseTimeString } from "utils"
import OverlayConfig from "./components/OverlayConfig"
import ExportMRTString from "./components/ExportMRTString"
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"

type FightForm = {
  duration: string
  warcraftlogsLink: string
}

function FightPicker() {
  const duration = useAppStore((state) => state.duration)
  const setDuration = useAppStore((state) => state.setDuration)

  const { register, handleSubmit, getValues, setValue } = useForm<FightForm>({
    defaultValues: {
      duration: getTimeString(duration),
      warcraftlogsLink: "",
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
    <div className="flex flex-col border-l-2 border-slate-700 divide-y-2 divide-slate-700">
      <div className="flex flex-col p-3 gap-2">
        <ImportString />
        <ExportString />
        <ExportMRTString />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 flex flex-col gap-3"
      >
        <label className="block space-y-1">
          <div className="text-sm">Fight duration</div>
          <input {...register("duration")} className="px-2 text-black" />
        </label>
        <label className="block space-y-1">
          <div className="text-sm">Warcraftlogs link</div>
          <input {...register("warcraftlogsLink")} className="px-2 text-black" />
        </label>
      </form>
      <OverlayConfig />
    </div>
  )
}

export default FightPicker

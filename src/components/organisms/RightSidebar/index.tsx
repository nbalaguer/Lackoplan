import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAppStore } from "store"
import { getTimeString, parseTimeString } from "utils"
import OverlayConfig from "./components/OverlayConfig"
import ExportMRTString from "./components/ExportMRTString"
import ExportString from "./components/ExportString"
import ImportString from "./components/ImportString"
import Button from "components/atoms/Button"

type FightForm = {
  duration: string
  warcraftlogsLink: string
}

function FightPicker() {
  const duration = useAppStore((state) => state.duration)
  const warcraftlogsLink = useAppStore((state) => state.warcraftlogsLink)
  const setDuration = useAppStore((state) => state.setDuration)
  const setWarcraftlogsLink = useAppStore((state) => state.setWarcraftlogsLink)

  const { register, handleSubmit, getValues, setValue } = useForm<FightForm>({
    defaultValues: {
      duration: getTimeString(duration),
      warcraftlogsLink: "asdf",
    },
  })

  useEffect(() => {
    if (duration !== Number(getValues().duration)) {
      setValue("duration", getTimeString(duration))
    }
    if (warcraftlogsLink !== getValues().warcraftlogsLink) {
      setValue("warcraftlogsLink", warcraftlogsLink)
    }
  }, [duration, warcraftlogsLink, getValues, setValue])

  const onSubmit = useCallback(
    (values: FightForm) => {
      setDuration(parseTimeString(values.duration))
      setWarcraftlogsLink(values.warcraftlogsLink)
    },
    [setDuration, setWarcraftlogsLink]
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
        <Button htmlType="submit" text="update" className="mt-3" />
      </form>
      <OverlayConfig />
    </div>
  )
}

export default FightPicker

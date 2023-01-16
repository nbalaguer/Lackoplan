import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import { useAppStore } from 'store'
import OverlayConfig from './components/OverlayConfig'

type FightForm = {
  duration: string
}

function FightPicker() {
  const duration = useAppStore((state) => state.duration)
  const setDuration = useAppStore((state) => state.setDuration)

  const {register, handleSubmit} = useForm<FightForm>({
    defaultValues: {
      duration: Math.floor(duration / 60) + ":" + String(duration % 60).padStart(2, "0")
    }
  })

  const onSubmit = useCallback((values: FightForm) => {
    const [minutes, seconds] = values.duration.split(":")
    setDuration(parseInt(minutes) * 60 + parseInt(seconds))
  }, [setDuration])

  return (
    <div className="flex flex-col border-l-2 border-slate-700">
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 border-b-2 border-slate-700">
        <label className="space-y-1">
          <div className="text-sm">Fight duration</div>
          <input {...register("duration")} className="px-2 text-black" />
        </label>
      </form>
      <div className="flex-grow p-3 border-b-2 border-slate-700"></div>
      <OverlayConfig />
    </div>
  )
}

export default FightPicker
import React, {useCallback} from 'react'
import { useForm } from 'react-hook-form'
import { useAppStore } from 'store'

type FightForm = {
  duration: string
}

function FightPicker() {
  const setDuration = useAppStore((state) => state.setDuration)

  const {register, handleSubmit} = useForm<FightForm>()

  const onSubmit = useCallback((values: FightForm) => {
    const [minutes, seconds] = values.duration.split(":")
    setDuration(parseInt(minutes) * 60 + parseInt(seconds))
  }, [setDuration])

  return (
    <div>
      <div className="p-3 border-b-2 border-slate-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="space-y-1">
            <div className="text-sm">Fight duration</div>
            <input {...register("duration")} className="px-2 text-black" />
          </label>
        </form>
      </div>
    </div>
  )
}

export default FightPicker
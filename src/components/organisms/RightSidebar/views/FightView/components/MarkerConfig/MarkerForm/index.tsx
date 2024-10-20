import React, { useCallback } from "react"
import { useAppStore } from "store"
import type { Marker, MarkerUpdate } from "types"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import IconButton from "components/atoms/IconButton"
import { useShallow } from "zustand/react/shallow"
import type { Except } from "type-fest"
import ButtonGroup from "components/inputs/ButtonGroup"

function PhaseMarkerFormView() {
  const { register } = useFormContext()

  return (
    <label className="flex gap-2 py-1 text-slate-300">
      <span>Phase:</span>
      <input
        className="flex-grow border-none bg-transparent outline-none w-[2ch]"
        {...register("phase")}
      />
    </label>
  )
}

function EventMarkerFormView() {
  const { register } = useFormContext()

  return (
    <div className="grid grid-cols-[auto,1fr] gap-2">
      <div>
        <ButtonGroup>
          <ButtonGroup.Button text="SCS" value="SCS" {...register("event")} />
          <ButtonGroup.Button text="SCC" value="SCC" {...register("event")} />
          <ButtonGroup.Button text="SAA" value="SAA" {...register("event")} />
          <ButtonGroup.Button text="SAR" value="SAR" {...register("event")} />
        </ButtonGroup>
      </div>
      <div className="flex gap-1">
        <label className="flex gap-2 text-slate-300">
          <input
            className="flex-grow border-none bg-transparent outline-none w-[2ch]"
            placeholder="C"
            {...register("counter")}
          />
        </label>
        <label className="flex gap-2 text-slate-300">
          <input
            className="flex-grow border-none bg-transparent outline-none w-[6ch]"
            placeholder="Id"
            {...register("spell")}
          />
        </label>
      </div>
    </div>
  )
}

type MarkerForm = Except<Marker, "id" | "time">

function MarkerForm(props: { markerId: string }) {
  const { markerId } = props

  const marker = useAppStore(
    useShallow((state): MarkerForm | undefined => {
      const storeMarker = state.markers.find((m) => m.id === markerId)
      if (!storeMarker) return undefined
      switch (storeMarker.type) {
        case "phase":
          return {
            type: storeMarker.type,
            phase: storeMarker.phase,
          }
        case "event":
          return {
            type: storeMarker.type,
            event: storeMarker.event,
            spell: storeMarker.spell,
            counter: storeMarker.counter,
          }
      }
    })
  )
  const updateMarker = useAppStore((state) => state.updateMarker)
  const removeMarker = useAppStore((state) => state.removeMarker)

  const formContext = useForm<MarkerForm>({
    defaultValues: marker,
  })

  const { handleSubmit } = formContext

  const onSubmit = useCallback(
    (values: MarkerForm) => {
      let markerUpdate: MarkerUpdate

      switch (values.type) {
        case "phase":
          markerUpdate = {
            type: values.type,
            phase: values.phase,
          }
          break
        case "event":
          markerUpdate = {
            type: values.type,
            event: values.event,
            spell: values.spell,
            counter: values.counter,
          }
          break
      }

      console.log(values)

      updateMarker(markerId, markerUpdate)
    },
    [markerId, updateMarker]
  )

  if (!marker) return null

  return (
    <FormProvider {...formContext}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-[minmax(0px,1fr),auto] border-l-[5px] border-yellow-500 bg-slate-900/40 pl-2"
      >
        <div>
          {marker.type === "phase" && <PhaseMarkerFormView />}
          {marker.type === "event" && <EventMarkerFormView />}
        </div>
        <div className="flex gap-1">
          <IconButton className="text-xs" icon="check" htmlType="submit" />
          <IconButton
            className="text-xs mr-2"
            icon="close"
            htmlType="button"
            onClick={() => removeMarker(markerId)}
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default MarkerForm

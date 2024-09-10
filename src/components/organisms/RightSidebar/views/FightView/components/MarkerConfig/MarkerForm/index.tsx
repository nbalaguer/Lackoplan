import React, { useCallback } from "react"
import { useAppStore } from "store"
import type { Marker, MarkerUpdate } from "types"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import IconButton from "components/atoms/IconButton"
import { useShallow } from "zustand/react/shallow"
import type { Except } from "type-fest"

function PhaseMarkerFormView() {
  const { register } = useFormContext()

  return (
    <label className="flex gap-2 py-1 text-slate-300">
      <span>Phase:</span>
      <input
        className="flex-grow border-none bg-transparent outline-none"
        {...register("phase")}
      />
    </label>
  )
}

function EventMarkerFormView() {
  const { register } = useFormContext()

  return (
    <>
      <label className="flex gap-2 py-1 text-slate-300">
        <span>Event:</span>
        <input
          className="flex-grow border-none bg-transparent outline-none"
          {...register("event")}
        />
      </label>
      <label className="flex gap-2 py-1 text-slate-300">
        <span>SpellId:</span>
        <input
          className="flex-grow border-none bg-transparent outline-none"
          {...register("spell")}
        />
      </label>
      <label className="flex gap-2 py-1 text-slate-300">
        <span>Counter:</span>
        <input
          className="flex-grow border-none bg-transparent outline-none"
          {...register("counter")}
        />
      </label>
    </>
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
        <div className="flex flex-col gap-1">
          <IconButton
            className="text-xs"
            icon="close"
            htmlType="button"
            onClick={() => removeMarker(markerId)}
          />
          <IconButton className="text-xs" icon="check" htmlType="submit" />
        </div>
      </form>
    </FormProvider>
  )
}

export default MarkerForm

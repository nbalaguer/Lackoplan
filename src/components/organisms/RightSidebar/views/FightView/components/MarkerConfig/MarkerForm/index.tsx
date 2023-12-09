import React, { useCallback } from "react"
import { useAppStore } from "store"
import type { Marker, MarkerUpdate } from "types"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import IconButton from "components/atoms/IconButton"
import useLatestRef from "hooks/useLatestRef"

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

type MarkerForm = Marker

function MarkerForm(props: { markerId: string }) {
  const { markerId } = props

  const marker = useAppStore((state) =>
    state.markers.find((m) => m.id === markerId)
  )
  const markerRef = useLatestRef(marker)
  const updateMarker = useAppStore((state) => state.updateMarker)
  const removeMarker = useAppStore((state) => state.removeMarker)

  const formContext = useForm<MarkerForm>({
    defaultValues: marker,
  })

  const { handleSubmit } = formContext

  const onSubmit = useCallback(
    (values: MarkerForm) => {
      let markerUpdate: MarkerUpdate

      // There's already a check for null before rendering.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const marker = markerRef.current!

      switch (values.type) {
        case "phase":
          markerUpdate = {
            time: marker.time,
            phase: values.phase,
          }
          break
        case "event":
          markerUpdate = {
            event: values.event,
            spell: values.spell,
            counter: values.counter,
          }
          break
      }

      updateMarker(markerId, markerUpdate)
    },
    [markerId, updateMarker, markerRef]
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

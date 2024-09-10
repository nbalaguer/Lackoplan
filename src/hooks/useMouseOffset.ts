import React, { useCallback } from "react"
import useLatestRef from "./useLatestRef"

function useTrackMouseOffset<T = HTMLDivElement>({
  onStart,
  onChange,
  onEnd,
}: {
  onStart?: () => void
  onChange: (event: MouseEvent, offset: number) => void
  onEnd?: () => void
}) {

  const onStartRef = useLatestRef(onStart)
  const onChangeRef = useLatestRef(onChange)
  const onEndRef = useLatestRef(onEnd)

  const start = useCallback<React.MouseEventHandler<T>>(
    (event) => {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)

      onStartRef.current?.()

      let startX = event.clientX

      function handleMouseMove(event: MouseEvent) {
        const currentX = event.clientX
        const offsetX = currentX - startX
        if (offsetX > 2 || offsetX < -2) {
          onChangeRef.current(event, offsetX)
          startX = currentX
        }
      }

      function handleMouseUp() {
        window.removeEventListener("mousemove", handleMouseMove)
        window.removeEventListener("mouseup", handleMouseUp)
        onEndRef.current?.()
      }
    },
    [onStartRef, onChangeRef, onEndRef]
  )

  return start
}

export default useTrackMouseOffset

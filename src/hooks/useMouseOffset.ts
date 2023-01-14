import {useCallback} from 'react'

function useMouseOffset(callback: (offset: number) => void) {

  const start = useCallback<React.MouseEventHandler<HTMLDivElement>>((event) => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    let startX = event.clientX

    function handleMouseMove(event: MouseEvent) {
      const currentX = event.clientX
      const offsetX = currentX - startX
      if (offsetX > 2 || offsetX < -2) {
        callback(offsetX)
        startX = currentX
      }
    }

    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [callback])

  return start
}

export default useMouseOffset
import useDebounce from "./useDebounce"
import { useEffect } from "react"

function useWindowResize(
  callback: (event: UIEvent) => void,
  options?: { debounceTime?: number }
) {
  const { debounceTime = 100 } = options ?? {}

  const debouncedCallback = useDebounce(callback, debounceTime)

  useEffect(() => {
    window.addEventListener("resize", debouncedCallback)

    return () => {
      window.removeEventListener("resize", debouncedCallback)
    }
  }, [debouncedCallback])
}

export default useWindowResize

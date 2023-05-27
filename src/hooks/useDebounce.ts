import { useMemo } from "react"
import _debounce from "lodash/debounce"
import useLatestRef from "./useLatestRef"

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  debounceTime = 100
) {
  const callbackRef = useLatestRef<T>(callback)

  const debouncedFn = useMemo(() => {
    return _debounce(
      (...args: any[]) => callbackRef.current?.(...args),
      debounceTime
    )
  }, [callbackRef, debounceTime])

  return debouncedFn as ReturnType<typeof _debounce<T>>
}

export default useDebounce

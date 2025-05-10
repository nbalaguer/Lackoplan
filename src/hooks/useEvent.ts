import { useCallback } from "react"
import useLatestRef from "./useLatestRef"

function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useLatestRef(fn)
  return useCallback((...args: Parameters<T>) => {
    return fnRef.current(...args)
  }, [fnRef])
}

export default useEvent
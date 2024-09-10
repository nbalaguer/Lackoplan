import { useRef } from "react";

function useLatestValue<T>(value: T) {
  const latestValueRef = useRef<T>(value)
  if (value) latestValueRef.current = value
  return value ?? latestValueRef.current
}

export default useLatestValue
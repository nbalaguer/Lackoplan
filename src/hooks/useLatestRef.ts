import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect";
import { useRef } from "react";

function useLatestRef<T>(value: T) {
  const valueRef = useRef<T>(value);

  useIsomorphicLayoutEffect(() => {
    valueRef.current = value;
  }, [value]);

  return valueRef;
}

export default useLatestRef;

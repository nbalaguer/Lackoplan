import { useRef } from "react";
import _isEqual from "lodash/isEqual";

function useDeep<S, U>(selector: (state: S) => U): (state: S) => U {
  const prev = useRef<U>()

  return (state: S) => {
    const next = selector(state)
    return _isEqual(prev.current, next)
      ? prev.current as U
      : (prev.current = next)
  }
}

export default useDeep
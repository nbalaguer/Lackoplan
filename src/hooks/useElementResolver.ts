import { useEffect, useMemo, useState } from "react";

function useResolvedElement(extElement?: HTMLElement) {
  const [element, setElement] = useState<HTMLElement | undefined>(extElement);

  useEffect(() => {
    setElement(extElement);
  }, [extElement]);

  return useMemo(() => [element, setElement] as const, [element]);
}

export default useResolvedElement;

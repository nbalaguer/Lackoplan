import { useEffect, useRef } from "react"

function useDebugDependencies(depsObject: Record<string, any>) {
  const depsArray = Object.values(depsObject)
  const lastDeps = useRef({})

  useEffect(() => {
    const depsInfo = {}

    Object.entries(depsObject).forEach(([key, value]) => {
      const oldValue = lastDeps.current[key]
      const hasChanged = oldValue !== value

      depsInfo[`${key} ${hasChanged ? "🔥" : "☕"}`] = {
        "Old value": oldValue,
        "New value": value,
      }
    })

    // eslint-disable-next-line no-console
    console.table(depsInfo)

    lastDeps.current = depsObject
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depsArray)
}

export default useDebugDependencies

import { useEffect, useRef } from "react"
import _isEqual from "lodash/isEqual"

function getChangeType(arg1: unknown, arg2: unknown): "🔥" | "⚠️" | "☕" {
  const hasChanged = !_isEqual(arg1, arg2)
  const hasReferenceChanged = !hasChanged && arg1 !== arg2

  if (hasChanged) {
    return "🔥"
  }
  if (hasReferenceChanged) {
    return "⚠️"
  }
  return "☕"
}

function getChanges(value: Record<string, unknown>, compareTo: Record<string, unknown>) {
  const changes = {}

  Object.entries(value).forEach(([k, v]) => {
    const change = getChangeType(v, compareTo[k])

    changes[
      `${k} ${change}`
    ] = {
      "Last": compareTo[k],
      "Current": value,
    }
  })

  return changes
}

function useDebugDependencies(depsObject: Record<string, any>) {
  const lastDeps = useRef({})

  useEffect(() => {
    const depsInfo = getChanges(depsObject, lastDeps.current)
    lastDeps.current = depsObject
    // eslint-disable-next-line no-console
    console.table(depsInfo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, Object.values(depsObject))
}

export default useDebugDependencies

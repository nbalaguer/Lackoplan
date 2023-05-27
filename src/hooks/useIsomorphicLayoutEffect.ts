import { canUseDOM } from "utils"
import { useEffect, useLayoutEffect } from "react"

const useIsomorphicLayoutEffect = canUseDOM ? useLayoutEffect : useEffect

export default useIsomorphicLayoutEffect

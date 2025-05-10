import React, { useEffect, useMemo, useRef } from "react"
import { clamp, motion, useMotionValue } from "framer-motion"
import classNames from "classnames"
import type { Crop, Overlay } from "types"
import useLatestRef from "hooks/useLatestRef"
import useEvent from "hooks/useEvent"
import _throttle from "lodash/throttle"

type OverlayComponentProps = {
  overlay: Overlay
  onOverlayChange: (src: string) => void
  onOverlayCropChange: (crop: Crop) => void
  onOverlayOpacityChange: (opacity: number) => void
}

function Overlay(props: OverlayComponentProps) {
  const {
    overlay,
    onOverlayChange,
    onOverlayCropChange,
    onOverlayOpacityChange,
  } = props

  const ref = useRef<HTMLDivElement>(null)

  const xLeft = useMotionValue(0)
  const xRight = useMotionValue(0)

  const yTop = useMotionValue(0)
  const yBottom = useMotionValue(0)

  const overlayRef = useLatestRef(overlay)

  useEffect(() => {
    if (!overlay.imgSrc || !ref.current) return

    const crop = overlayRef.current.crop

    xLeft.jump((crop.startX / 100) * ref.current.offsetWidth)
    xRight.jump(((crop.endX - 100) / 100) * ref.current.offsetWidth)

    yTop.jump((crop.startY / 100) * ref.current.offsetHeight)
    yBottom.jump(((crop.endY - 100) / 100) * ref.current.offsetHeight)
  }, [overlay.imgSrc, xLeft, xRight, yTop, yBottom, overlayRef])

  useEffect(() => {
    if (!ref.current) return

    const root = ref.current

    async function onPaste(event: KeyboardEvent) {
      const { code, ctrlKey } = event

      if (code === "KeyV" && ctrlKey) {
        try {
          const items = await navigator.clipboard.read()
          const imageBlob = await items[0].getType("image/png")
          const reader = new FileReader()
          reader.readAsDataURL(imageBlob)
          reader.onload = function () {
            const imageBase64Url = reader.result as string
            onOverlayChange(imageBase64Url)
            onOverlayCropChange({
              startX: 0,
              startY: 0,
              endX: 100,
              endY: 100,
            })
            xLeft.jump(0)
            xRight.jump(0)
            yTop.jump(0)
            yBottom.jump(0)
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (code === "KeyC" && ctrlKey) {
        fetch(overlay.imgSrc)
          .then((res) => res.blob())
          .then((blob) => {
            const clipboardItem = new ClipboardItem({
              [blob.type]: blob,
            })
            navigator.clipboard.write([clipboardItem])
          })
      }

      if (code === "Delete") {
        onOverlayChange("")
      }
    }

    root.addEventListener("keydown", onPaste)

    return () => root.removeEventListener("keydown", onPaste)
  }, [
    onOverlayChange,
    onOverlayCropChange,
    overlay.imgSrc,
    xLeft,
    xRight,
    yBottom,
    yTop,
  ])

  const dragThrottle = 42

  const onXLeftDragFn = useEvent((_, info) => {
    if (ref.current === null) return
    const x = (info.point.x - ref.current.offsetLeft) / ref.current.offsetWidth

    onOverlayCropChange({
      ...overlay.crop,
      startX: clamp(0, 100, x * 100),
    })
  })

  const onXLeftDrag = useMemo(
    () => _throttle(onXLeftDragFn, dragThrottle),
    [onXLeftDragFn]
  )

  const onXRightDragFn = useEvent((_, info) => {
    if (ref.current === null) return
    const x = (info.point.x - ref.current.offsetLeft) / ref.current.offsetWidth

    onOverlayCropChange({
      ...overlay.crop,
      endX: clamp(0, 100, x * 100),
    })
  })

  const onXRightDrag = useMemo(
    () => _throttle(onXRightDragFn, dragThrottle),
    [onXRightDragFn]
  )

  const onYTopDragFn = useEvent((_, info) => {
    if (ref.current === null) return

    const y = (info.point.y - ref.current.offsetTop) / ref.current.offsetHeight

    onOverlayCropChange({
      ...overlay.crop,
      startY: clamp(0, 100, y * 100),
    })
  })

  const onYTopDrag = useMemo(
    () => _throttle(onYTopDragFn, dragThrottle),
    [onYTopDragFn]
  )

  const onYBottomDragFn = useEvent((_, info) => {
    if (ref.current === null) return

    const y = (info.point.y - ref.current.offsetTop) / ref.current.offsetHeight

    onOverlayCropChange({
      ...overlay.crop,
      endY: clamp(0, 100, y * 100),
    })
  })

  const onYBottomDrag = useMemo(
    () => _throttle(onYBottomDragFn, dragThrottle),
    [onYBottomDragFn]
  )

  const onOpacityChange = useEvent((e) => {
    onOverlayOpacityChange(e.target.value)
  })

  return (
    <>
      <div
        ref={ref}
        className="group relative grid aspect-[16/4] cursor-pointer place-content-center outline outline-2 outline-slate-600 transition-[outline-width,outline-color] duration-100 hover:outline-slate-500 focus:outline-4"
        tabIndex={0}
      >
        {!!overlay.imgSrc && (
          <>
            <img
              src={overlay.imgSrc}
              alt=""
              className="absolute top-0 left-0 h-full w-full object-fill pointer-events-none"
            />
            <motion.div
              className={classNames(
                "absolute h-full top-0 left-0",
                "w-px bg-yellow-500/50",
                "group-hover:w-[2px] group-hover:bg-yellow-500/75",
                "group-hover:hover:bg-green-500"
              )}
              drag
              style={{
                x: xLeft,
              }}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={ref}
              onDrag={onXLeftDrag}
            />
            <motion.div
              className={classNames(
                "absolute h-full top-0 right-0",
                "w-px bg-yellow-500/50",
                "group-hover:w-[2px] group-hover:bg-yellow-500/75",
                "group-hover:hover:bg-green-500"
              )}
              drag
              style={{
                x: xRight,
              }}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={ref}
              onDrag={onXRightDrag}
            />
            <motion.div
              className={classNames(
                "absolute w-full top-0 left-0",
                "h-px bg-yellow-500/50",
                "group-hover:h-[2px] group-hover:bg-yellow-500/75",
                "group-hover:hover:bg-green-500"
              )}
              drag="y"
              style={{
                y: yTop,
              }}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={ref}
              onDrag={onYTopDrag}
            />
            <motion.div
              className={classNames(
                "absolute w-full bottom-0 left-0",
                "h-px bg-yellow-500/50",
                "group-hover:h-[2px] group-hover:bg-yellow-500/75",
                "group-hover:hover:bg-green-500"
              )}
              drag="y"
              style={{
                y: yBottom,
              }}
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={ref}
              onDrag={onYBottomDrag}
            />
          </>
        )}
        {!overlay.imgSrc && (
          <span className="text-sm text-slate-500">
            Click + Paste image here
          </span>
        )}
      </div>
      {!!overlay.imgSrc && (
        <input
          className="w-full block"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={overlay.opacity}
          onChange={onOpacityChange}
        />
      )}
    </>
  )
}

export default Overlay

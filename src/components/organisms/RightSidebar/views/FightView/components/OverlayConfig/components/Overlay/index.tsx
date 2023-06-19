import React, { useEffect, useRef } from "react"

function Overlay(props: { src: string; onOverlay: (src: string) => void }) {
  const { src, onOverlay } = props

  const ref = useRef<HTMLDivElement>(null)

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
            onOverlay(imageBase64Url)
          }
        } catch (error) {
          console.error(error)
        }
      }

      if (code === "KeyC" && ctrlKey) {
        fetch(src)
          .then((res) => res.blob())
          .then((blob) => {
            const clipboardItem = new ClipboardItem({
              [blob.type]: blob,
            })
            navigator.clipboard.write([clipboardItem])
          })
      }

      if (code === "Delete") {
        onOverlay("")
      }
    }

    root.addEventListener("keydown", onPaste)

    return () => root.removeEventListener("keydown", onPaste)
  }, [onOverlay, src])

  return (
    <div
      ref={ref}
      className="relative grid aspect-video cursor-pointer place-content-center outline outline-2 outline-slate-600 transition-[outline-width,outline-color] duration-100 hover:outline-slate-500 focus:outline-4"
      tabIndex={0}
    >
      {!!src && (
        <img src={src} alt="" className="absolute top-0 left-0 h-full w-full" />
      )}
      {!src && (
        <span className="text-sm text-slate-500">Click + Paste image here</span>
      )}
    </div>
  )
}

export default Overlay

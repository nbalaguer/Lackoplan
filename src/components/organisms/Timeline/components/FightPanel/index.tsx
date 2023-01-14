import React, { useEffect, useState } from 'react'

function FightPanel() {

  const [imageUrl, setImageUrl] = useState<string>()

  useEffect(() => {
    async function onPaste(event: KeyboardEvent) {
      const {code, ctrlKey} = event
      if (code === "KeyV" && ctrlKey) {
        try {
          const items = await navigator.clipboard.read()
          const imageBlob = await items[0].getType("image/png")
          const reader = new FileReader()
          reader.readAsDataURL(imageBlob)
          reader.onload = function() {
            const imageBase64Url = reader.result as string
            setImageUrl(imageBase64Url)
          }
        }
        catch (error) {
          console.error(error)
        }
      }
    }

    window.addEventListener("keydown", onPaste)

    return () => window.removeEventListener("keydown", onPaste)
  }, [])

  return (
    <div className="min-h-[300px] relative">
      {imageUrl && (
        <img src={imageUrl} alt="" className="absolute top-0 left-0 w-full h-full opacity-40" />
      )}
    </div>
  )
}

export default FightPanel
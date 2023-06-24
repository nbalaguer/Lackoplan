import IconButton from "components/atoms/IconButton"
import React, { useCallback } from "react"

function CopyButton(props: {
  className?: string
  clipboardData: Blob | string
}) {
  const { className, clipboardData } = props

  const handleClick = useCallback(() => {
    let copyAction: Promise<void>

    if (typeof clipboardData === "string") {
      copyAction = navigator.clipboard.writeText(clipboardData)
    } else {
      const clipboardItem = new ClipboardItem({
        [clipboardData.type]: clipboardData,
      })
      copyAction = navigator.clipboard.write([clipboardItem])
    }

    copyAction
      .then(() => alert("Data copied to clipboard!"))
      .catch(() => alert("Failed to copy data to the clipboard :("))
  }, [clipboardData])

  return (
    <IconButton className={className} icon="clipboard" onClick={handleClick} />
  )
}

export default CopyButton

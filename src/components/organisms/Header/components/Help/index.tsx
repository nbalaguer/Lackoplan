import IconButton from "components/atoms/IconButton"
import Markdown from "components/atoms/Markdown"
import Modal from "components/templates/Modal"
import React, { useState } from "react"

const helpText = `## Timeline controls

- Move ability instances by dragging them
- Dragged instances will displace others to respect the ability cooldown. Hold Ctrl for disabling the behaviour
- Holding shift will cause all future instances of the ability to reset and move with the one you're dragging

## Left panel

- Ctrl+Click an ability to go to it's wowhead page

## Tips

- You can load and save notes if you have a [compatible browser](https://caniuse.com/?search=showopenfilepicker)
- The exported MRT string is compatible with [Kaze ERT Timers Icons Wekaura](https://wago.io/n7l5uN3YM)
- Use the overlays section to paste in captures from your fight logs, I'm using damage taken and casts in this example :)

![alt text](/public/lackoplan-screenshot.png)
`

function Help() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <IconButton
        className="text-xl"
        icon="help"
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        isOpen={isModalOpen}
        onCloseRequest={() => setIsModalOpen(false)}
        className="border-2 border-slate-700 py-2 px-6"
      >
        <IconButton
          icon="close"
          className="-mr-3 mt-1 self-end"
          onClick={() => setIsModalOpen(false)}
        />
        <Markdown markdown={helpText} />
      </Modal>
    </>
  )
}

export default Help

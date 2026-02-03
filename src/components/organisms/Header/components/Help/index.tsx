import IconButton from "components/atoms/IconButton"
import Markdown from "components/atoms/Markdown"
import Modal from "components/templates/Modal"
import React, { useState } from "react"


const helpText = `## Timeline controls

- Move ability instances by dragging them
- Dragged instances will displace others to respect the ability cooldown. Hold **Ctrl** for disabling the behaviour
- Holding **Shift** will cause all future instances of the ability to reset and move with the one you're dragging
- Hold **Alt** while dragging to make small adjustments to the cast times.

## Left panel

- Ctrl+Click an ability to go to it's wowhead page

## Tips

- You can load and save notes if you have a [compatible browser](https://caniuse.com/?search=showopenfilepicker)
- The exported NS string is compatible with [Northers Sky Raid Tools](https://www.curseforge.com/wow/addons/northern-sky-raid-tools)
- Use the overlays section to paste in captures from your fight logs, I'm using damage taken and casts in this example :)

![alt text](/img/lackoplan-screenshot.png)

## NS Syntax

Player names can also be these keywords:

- \`everyone\`
- \`group1\` \`group2\` \`group3\` \`group4\` \`group5\` \`group6\` \`group7\` \`group8\`
- \`tank\` \`melee\` \`ranged\` \`healer\`
- \`warrior\` \`paladin\` \`hunter\` \`rogue\` \`priest\` \`shaman\` \`mage\` \`warlock\` \`monk\` \`druid\` \`dh\` \`dk\` \`evoker\`
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

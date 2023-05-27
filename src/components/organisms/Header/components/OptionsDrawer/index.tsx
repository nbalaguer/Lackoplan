import Drawer from "components/templates/Drawer"
import React from "react"

function OptionsDrawer(props: { isOpen: boolean; onCloseRequest: () => void }) {
  const { isOpen, onCloseRequest } = props

  return (
    <Drawer
      isOpen={isOpen}
      side="right"
      onCloseRequest={onCloseRequest}
      className="p-3"
    >
      Options
    </Drawer>
  )
}

export default OptionsDrawer

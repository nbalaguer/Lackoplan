import React, {useMemo} from 'react'
import ReactDOM from 'react-dom'

function Portal(props: {
  containerId?: string,
  children: React.ReactNode
}) {
  const {
    containerId = "modals-portal",
    children
  } = props

  const container = useMemo(() => {
    return document.getElementById(containerId)
  }, [containerId])

  if (!container) return null

  return ReactDOM.createPortal(children, container)
}

export default Portal
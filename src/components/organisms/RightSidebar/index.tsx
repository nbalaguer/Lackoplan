import React, { useCallback, useState } from "react"
import IconButton from "components/atoms/IconButton"
import FightView from "./views/FightView"
import NoteView from "./views/NoteView"
import SettingsView from "./views/SettingsView"
import classNames from "classnames"

const views = {
  fight: {
    icon: "fight",
    Component: FightView,
  },
  note: {
    icon: "note",
    Component: NoteView,
  },
  settings: {
    icon: "settings",
    Component: SettingsView,
  },
} as const

type ViewName = keyof typeof views

function RightSidebar() {
  const [activeView, setActiveView] = useState<ViewName | null>("fight")

  const handleViewToggle = useCallback((viewKey: ViewName) => {
    setActiveView((currentView) => {
      if (currentView === viewKey) {
        return null
      }
      return viewKey
    })
  }, [])

  let ViewComponent: React.ComponentType | null = null
  if (activeView) ViewComponent = views[activeView].Component

  return (
    <div
      className={classNames("grid grid-cols-[repeat(2,minmax(0px,auto))] grid-rows-[minmax(0px,auto)]", {
        ["border-l-2 border-slate-700"]: !!ViewComponent,
      })}
    >
      {ViewComponent && <ViewComponent />}
      <div className="col-start-2 flex flex-col divide-y-2 divide-slate-700 border-l-2 border-slate-700">
        {Object.entries(views).map(([key, view]) => {
          return (
            <div
              key={key}
              className={classNames(
                "p-3 text-xl transition-colors duration-150",
                {
                  ["bg-slate-700"]: activeView === key,
                }
              )}
            >
              <IconButton
                icon={view.icon}
                onClick={() => handleViewToggle(key as ViewName)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RightSidebar

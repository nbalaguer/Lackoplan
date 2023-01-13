import React from 'react'
import Player from './components/Player'
import { useAppStore } from 'store'
import {AnimatePresence} from 'framer-motion'
import {shallow} from 'zustand/shallow'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

function PlayerList() {
  const playerIds = useAppStore((state) => state.players.map(player => player.id), shallow)

  return (
    <div className="flex-grow relative">
      <div className="absolute inset-0">
        <OverlayScrollbarsComponent
          element="div"
          defer
          className="h-full"
          options={{
            scrollbars: {
              theme: "os-theme-light",
              autoHide: 'scroll',
              autoHideDelay: 300,
            }
          }}
        >
          <div className="p-3 space-y-2">
            <AnimatePresence mode='popLayout'>
              {playerIds.map((playerId) => {
                return (
                  <Player key={playerId} playerId={playerId} />
                )
              })}
            </AnimatePresence>
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  )
}

export default PlayerList
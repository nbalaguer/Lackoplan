import Color from "color"
import theme from "config/theme"
import React from "react"
import { useAppStore } from "store"

function Player(props: { playerId: string }) {
  const { playerId } = props

  const player = useAppStore((state) =>
    state.players.find((player) => player.id === playerId)
  )

  if (!player) return null

  return (
    <div
      className="px-2 py-0.5"
      style={{
        backgroundColor: Color(theme.colors[player.class]).alpha(0.2).string(),
      }}
    >
      <div>{player.name}</div>
      <div>
        {player.abilities
          .filter((ability) => ability.isActive)
          .map((playerAbility) => {
            return (
              <div key={playerAbility.id}>
                {playerAbility.ability.name}
                {playerAbility.castTimes.map((c) => +c.toFixed(2) * 100 + " ")}
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Player

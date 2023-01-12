import Color from 'color'

export function getColorType(color: string) {
  return Color(color).luminosity() > 0.179 ? "light" : "dark"
}
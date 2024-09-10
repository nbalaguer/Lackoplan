import classNames from "classnames"
import React from "react"

const classConfig = {
  mini: "w-4",
  small: "w-6",
  medium: "w-8",
  full: "w-full",
} as const

function WowheadIcon(
  props: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
    name: string
    size?: keyof typeof classConfig
  }
) {
  const { name, size = "medium", className, ...rest } = props

  return (
    <img
      src={`https://wow.zamimg.com/images/wow/icons/medium/${name}.jpg`}
      loading="lazy"
      className={classNames(`${classConfig[size]}`, className)}
      {...rest}
    />
  )
}

export default WowheadIcon

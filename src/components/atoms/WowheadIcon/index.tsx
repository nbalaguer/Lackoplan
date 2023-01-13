import classNames from 'classnames'
import React from 'react'

const classConfig = Object.freeze({
  mini: "w-4",
  small: "w-6",
  medium: "w-8",
  full: "w-full",
})

function WowheadIcon(props: Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  name: string
  size?: keyof typeof classConfig
}) {
  const {
    name,
    size = "medium",
    className,
    ...rest
  } = props

  return (
    <img
      src={`https://wow.zamimg.com/images/wow/icons/medium/${name}.jpg`}
      className={classNames(`${classConfig[size]}`, className)}
      {...rest}
    />
  )
}

export default WowheadIcon
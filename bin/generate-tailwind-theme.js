#!/usr/bin/env node

import { writeFileSync } from "fs"
import resolveConfig from "tailwindcss/resolveConfig.js"
import { format } from "prettier"
import { resolve } from "path"
// bring in the Tailwind config
import tailwindConfig from "../tailwind.config.cjs"
import _pick from 'lodash/pick.js'

const { theme } = resolveConfig(tailwindConfig)
const themeStr = JSON.stringify(_pick(theme, ["colors"]))
const js = `
const theme = ${themeStr}

export default theme
`

try {
  // write the file to src/theme.js after
  // having prettier format the string for us
  writeFileSync(
    resolve(process.cwd(), "./src/config/theme.ts"),
    format(js, { parser: "babel" }),
    "utf-8"
  )
} catch (err) {
  // uh-oh, something happened here!
  console.log(err.message)
}
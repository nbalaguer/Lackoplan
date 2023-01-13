import { CLASSES } from "config/constants"

export const classIcons: {
  [s in (typeof CLASSES)[keyof typeof CLASSES]]: string
} = {
  [CLASSES.WARRIOR]: "classicon_warrior",
  [CLASSES.PALADIN]: "classicon_paladin",
  [CLASSES.HUNTER]: "classicon_hunter",
  [CLASSES.ROGUE]: "classicon_rogue",
  [CLASSES.PRIEST]: "classicon_priest",
  [CLASSES.SHAMAN]: "classicon_shaman",
  [CLASSES.MAGE]: "classicon_mage",
  [CLASSES.WARLOCK]: "classicon_warlock",
  [CLASSES.MONK]: "classicon_monk",
  [CLASSES.DRUID]: "classicon_druid",
  [CLASSES.DEMONHUNTER]: "classicon_demonhunter",
  [CLASSES.DEATHKNIGHT]: "classicon_deathknight",
  [CLASSES.EVOKER]: "classicon_evoker",
}

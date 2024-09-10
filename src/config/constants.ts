import type { UnionToIntersection } from "type-fest"

export const CLASSES = {
  WARRIOR: "warrior",
  PALADIN: "paladin",
  HUNTER: "hunter",
  ROGUE: "rogue",
  PRIEST: "priest",
  SHAMAN: "shaman",
  MAGE: "mage",
  WARLOCK: "warlock",
  MONK: "monk",
  DRUID: "druid",
  DEMONHUNTER: "demonhunter",
  DEATHKNIGHT: "deathknight",
  EVOKER: "evoker",
  GENERAL: "general",
} as const

export const SPECS = {
  [CLASSES.WARRIOR]: {
    ARMS: "arms",
    FURY: "fury",
    PROTECTION: "protection",
  },
  [CLASSES.PALADIN]: {
    HOLY: "holy",
    PROTECTION: "protection",
    RETRIBUTION: "retribution",
  },
  [CLASSES.HUNTER]: {
    BEASTMASTERY: "beastmastery",
    MARKSMANSHIP: "marksmanship",
    SURVIVAL: "survival",
  },
  [CLASSES.ROGUE]: {
    ASSASSINATION: "assassination",
    OUTLAW: "outlaw",
    SUBTLETY: "subtlety",
  },
  [CLASSES.PRIEST]: {
    DISCIPLINE: "discipline",
    HOLY: "holy",
    SHADOW: "shadow",
  },
  [CLASSES.SHAMAN]: {
    ELEMENTAL: "elemental",
    ENHANCEMENT: "enhancement",
  },
  [CLASSES.MAGE]: {
    ARCANE: "arcane",
    FIRE: "fire",
    FROST: "frost",
  },
  [CLASSES.WARLOCK]: {
    AFFLICTION: "affliction",
    DEMONOLOGY: "demonology",
    DESTRUCTION: "destruction",
  },
  [CLASSES.MONK]: {
    BREWMASTER: "brewmaster",
    MISTWEAVER: "mistweaver",
    WINDWALKER: "windwalker",
  },
  [CLASSES.DRUID]: {
    BALANCE: "balance",
    FERAL: "feral",
    GUARDIAN: "guardian",
    RESTORATION: "restoration",
  },
  [CLASSES.DEMONHUNTER]: {
    HAVOC: "havoc",
    VENGEANCE: "vengeance",
  },
  [CLASSES.DEATHKNIGHT]: {
    BLOOD: "blood",
    FROST: "frost",
    UNHOLY: "unholy",
  },
  [CLASSES.EVOKER]: {
    PRESERVATION: "preservation",
    AUGMENTATION: "augmentation",
    DEVASTATION: "devastation",
  },
} as const


type SpecIntersection = UnionToIntersection<typeof SPECS[keyof typeof SPECS]>
type Spec = SpecIntersection[keyof SpecIntersection]

const _a: Spec = SPECS[CLASSES.WARRIOR].ARMS
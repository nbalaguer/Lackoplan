import { CLASSES } from "config/constants"
import type { Ability } from "types"

const modifiers = {
  setCooldown(cd: number) {
    return (ability: Ability) => ability.cooldown = cd
  },
  addCooldown(cd: number) {
    return (ability: Ability) => ability.cooldown = ability.cooldown + cd
  },
  multiplyCooldown(cd: number) {
    return (ability: Ability) => ability.cooldown = ability.cooldown * cd
  },
}

const abilities: {
  [s in (typeof CLASSES)[keyof typeof CLASSES]]: Ability[]
} = Object.freeze({
  [CLASSES.WARRIOR]: [
    {
      name: "Rallying Cry",
      shortName: "Rally",
      cooldown: 60 * 3,
      icon: "ability_toughness",
      modifiers: [],
    },
  ],
  [CLASSES.PALADIN]: [
    {
      name: "Aura of Mastery",
      shortName: "Mastery",
      cooldown: 60 * 3,
      icon: "spell_holy_auramastery",
      modifiers: [],
    },
  ],
  [CLASSES.HUNTER]: [],
  [CLASSES.ROGUE]: [],
  [CLASSES.PRIEST]: [
    {
      name: "Spirit Shell",
      shortName: "SS",
      cooldown: 60 * 1.5,
      icon: "ability_shaman_astralshift",
      modifiers: [],
    },
    {
      name: "Power Work: Barrier",
      shortName: "Barrier",
      cooldown: 60 * 3,
      icon: "spell_holy_powerwordbarrier",
      modifiers: [],
    },
    {
      name: "Divine Hymn",
      shortName: "Hymn",
      cooldown: 60 * 3.5,
      icon: "spell_holy_divinehymn",
      modifiers: [],
    },
    {
      name: "Holy Work: Salvation",
      shortName: "Salvation",
      cooldown: 60 * 4.5,
      icon: "ability_priest_archangel",
      modifiers: [],
    },
  ],
  [CLASSES.SHAMAN]: [
    {
      name: "Spirit-Link Totem",
      shortName: "Link",
      cooldown: 60 * 3,
      icon: "spell_shaman_spiritlink",
      modifiers: [],
    },
    {
      name: "Tide Totem",
      shortName: "Tide",
      cooldown: 60 * 3,
      icon: "ability_shaman_healingtide",
      modifiers: [],
    },
  ],
  [CLASSES.MAGE]: [],
  [CLASSES.WARLOCK]: [],
  [CLASSES.MONK]: [
    {
      name: "Revival",
      shortName: "Revival",
      cooldown: 60 * 3,
      icon: "spell_monk_revival",
      modifiers: [],
    },
    {
      name: "Invoke Chi-ji, the Red Crane",
      shortName: "Chi-ji",
      cooldown: 60 * 3,
      icon: "inv_pet_cranegod",
      modifiers: [{
        icon: "inv_pet_jadeserpentpet",
        process: modifiers.addCooldown(-60 * 2),
      }],
    },
  ],
  [CLASSES.DRUID]: [
    {
      name: "Tranquility",
      shortName: "Tranq",
      cooldown: 60 * 3,
      icon: "spell_nature_tranquility",
      modifiers: [{
        icon: "ability_druid_dreamstate",
        process: modifiers.addCooldown(-60),
      }],
    },
    {
      name: "Tree",
      shortName: "Incarnation: Tree of Life",
      cooldown: 60 * 3,
      icon: "ability_druid_improvedtreeform",
      modifiers: [],
    },
    {
      name: "Flourish",
      shortName: "Flourish",
      cooldown: 60 * 1.5,
      icon: "spell_druid_wildburst",
      modifiers: [],
    },
  ],
  [CLASSES.DEMONHUNTER]: [],
  [CLASSES.DEATHKNIGHT]: [
    {
      name: "Anti-Magic Zone",
      shortName: "AMZ",
      cooldown: 60 * 2,
      icon: "spell_deathknight_antimagiczone",
      modifiers: [],
    },
  ],
  [CLASSES.EVOKER]: [],
})

export default abilities

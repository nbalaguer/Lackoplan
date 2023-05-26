import { CLASSES } from "config/constants"
import type { Ability } from "types"
import _pipe from 'lodash/flow'

const modifiers = {
  setCooldown(cd: number) {
    return (ability: Ability) => {
      ability.cooldown = cd
      return ability
    }
  },
  addCooldown(cd: number) {
    return (ability: Ability) => {
      ability.cooldown = ability.cooldown + cd
      return ability
    }
  },
  multiplyCooldown(cd: number) {
    return (ability: Ability) => {
      ability.cooldown = ability.cooldown * cd
      return ability
    }
  },
  setIcon(icon: string) {
    return (ability: Ability) => {
      ability.icon = icon
      return ability
    }
  },
  setSpellId(spellId: number) {
    return (ability: Ability) => {
      ability.spellId = spellId
      return ability
    }
  },
  setName(name: string) {
    return (ability: Ability) => {
      ability.name = name
      return ability
    }
  },
  setShortName(shortName: string) {
    return (ability: Ability) => {
      ability.shortName = shortName
      return ability
    }
  },
  setWowheadLink(wowheadLink: string) {
    return (ability: Ability) => {
      ability.wowheadLink = wowheadLink
      return ability
    }
  }
}

const abilities: {
  [s in (typeof CLASSES)[keyof typeof CLASSES]]: Ability[]
} = Object.freeze({
  [CLASSES.GENERAL]: [
    {
      wowheadLink: "",
      name: "Personal defensives",
      spellId: 0,
      shortName: "Personals",
      cooldown: 60 * 2,
      icon: "ability_thunderking_overcharge",
      modifiers: [],
    },
    {
      wowheadLink: "",
      name: "Healthstone",
      spellId: 0,
      shortName: "Healthstone",
      cooldown: 60 * 60,
      icon: "warlock_-healthstone",
      modifiers: [],
    },
    {
      wowheadLink: "",
      name: "Health Potion",
      spellId: 0,
      shortName: "Poti",
      cooldown: 60 * 5,
      icon: "inv_potion_51",
      modifiers: [],
    },
    {
      wowheadLink: "",
      name: "2 min CDs",
      spellId: 0,
      shortName: "2 min CDs",
      cooldown: 60 * 2,
      icon: "inv_potion_51",
      modifiers: [],
    },
    {
      wowheadLink: "",
      name: "3 min CDs",
      spellId: 0,
      shortName: "3 min CDs",
      cooldown: 60 * 3,
      icon: "inv_potion_51",
      modifiers: [],
    },
  ],
  [CLASSES.WARRIOR]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=97462/rallying-cry",
      name: "Rallying Cry",
      spellId: 97462,
      shortName: "Rally",
      cooldown: 60 * 3,
      icon: "ability_toughness",
      modifiers: [],
    },
  ],
  [CLASSES.PALADIN]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=31884/avenging-wrath",
      name: "Avenging Wrath",
      spellId: 31884,
      shortName: "Wings",
      cooldown: 60 * 2,
      icon: "spell_holy_avenginewrath",
      modifiers: [
        {
          icon: "ability_paladin_veneration",
          process: _pipe(
            modifiers.setCooldown(45),
            modifiers.setIcon("ability_paladin_veneration"),
            modifiers.setSpellId(216331),
            modifiers.setName("Avenging Crusader"),
            modifiers.setShortName("Avenging Crusader"),
            modifiers.setWowheadLink("https://www.wowhead.com/spell=216331/avenging-crusader"),
          )
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=105809/holy-avenger",
      name: "Holy Avenger",
      spellId: 105809,
      shortName: "Avenger",
      cooldown: 60 * 3,
      icon: "ability_paladin_holyavenger",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=31821/aura-mastery",
      name: "Aura Mastery",
      spellId: 31821,
      shortName: "Mastery",
      cooldown: 60 * 3,
      icon: "spell_holy_auramastery",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=375576/divine-toll",
      name: "Divine Toll",
      spellId: 375576,
      shortName: "Toll",
      cooldown: 60,
      icon: "ability_bastion_paladin",
      modifiers: [],
    },
  ],
  [CLASSES.HUNTER]: [],
  [CLASSES.ROGUE]: [],
  [CLASSES.PRIEST]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=64843/divine-hymn",
      name: "Divine Hymn",
      spellId: 64843,
      shortName: "Hymn",
      cooldown: 60 * 3,
      icon: "spell_holy_divinehymn",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=265202/holy-word-salvation",
      name: "Holy Word: Salvation",
      spellId: 265202,
      shortName: "Salvation",
      cooldown: 60 * 4,
      icon: "ability_priest_archangel",
      modifiers: [
        {
          icon: "ability_priest_ascension",
          process: _pipe(
            modifiers.setCooldown(60 * 2),
            modifiers.setIcon("ability_priest_ascension"),
            modifiers.setSpellId(200183),
            modifiers.setName("Apotheosis"),
            modifiers.setShortName("Apotheosis"),
            modifiers.setWowheadLink("https://www.wowhead.com/spell=200183/apotheosis"),
          )
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=64901/symbol-of-hope",
      name: "Symbol of Hope",
      spellId: 64901,
      shortName: "Hope",
      cooldown: 60 * 3,
      icon: "spell_holy_symbolofhope",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=372835/lightwell",
      name: "Lightwell",
      spellId: 372835,
      shortName: "Well",
      cooldown: 60 * 3,
      icon: "spell_holy_summonlightwell",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=62618/power-word-barrier",
      name: "Power Work: Barrier",
      spellId: 62618,
      shortName: "Barrier",
      cooldown: 60 * 3,
      icon: "spell_holy_powerwordbarrier",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=246287/evangelism",
      name: "Evangelism",
      spellId: 246287,
      shortName: "Evang",
      cooldown: 60 * 1.5,
      icon: "spell_holy_divineillumination",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=47536/rapture",
      name: "Rapture",
      spellId: 47536,
      shortName: "Rapture",
      cooldown: 60 * 1.5,
      icon: "spell_holy_rapture",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=15286/vampiric-embrace",
      name: "Vampiric Embrace",
      spellId: 15286,
      shortName: "Embrace",
      cooldown: 60 * 2,
      icon: "spell_shadow_unsummonbuilding",
      modifiers: [],
    },
  ],
  [CLASSES.SHAMAN]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=108280/healing-tide-totem",
      name: "Healing Tide Totem",
      spellId: 108280,
      shortName: "Tide",
      cooldown: 60 * 3,
      icon: "ability_shaman_healingtide",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=98008/spirit-link-totem",
      name: "Spirit Link Totem",
      spellId: 98008,
      shortName: "Link",
      cooldown: 60 * 3,
      icon: "spell_shaman_spiritlink",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=207399/ancestral-protection-totem",
      name: "Ancestral Protection Totem",
      spellId: 207399,
      shortName: "Res",
      cooldown: 60 * 5,
      icon: "spell_nature_reincarnation",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=198838/earthen-wall-totem",
      name: "Earthen Wall Totem",
      spellId: 198838,
      shortName: "Wall",
      cooldown: 60,
      icon: "spell_nature_stoneskintotem",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=114052/ascendance",
      name: "Ascendance",
      spellId: 114052,
      shortName: "Asc",
      cooldown: 60 * 3,
      icon: "spell_fire_elementaldevastation",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=192077/wind-rush-totem",
      name: "Wind Rush Totem",
      spellId: 192077,
      shortName: "Rush",
      cooldown: 60 * 2,
      icon: "ability_shaman_windwalktotem",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=108281/ancestral-guidance",
      name: "Ancestral Guidance",
      spellId: 108281,
      shortName: "Guidance",
      cooldown: 60 * 2,
      icon: "ability_shaman_ancestralguidance",
      modifiers: [],
    },
  ],
  [CLASSES.MAGE]: [],
  [CLASSES.WARLOCK]: [],
  [CLASSES.MONK]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=115310/revival",
      name: "Revival",
      spellId: 115310,
      shortName: "Revival",
      cooldown: 60 * 3,
      icon: "spell_monk_revival",
      modifiers: [
        {
          icon: "monk_stance_wiseserpent",
          process: modifiers.addCooldown(-30),
        }
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=325197/invoke-chi-ji-the-red-crane",
      name: "Invoke Celestial",
      spellId: 325197,
      shortName: "Celestial",
      cooldown: 60 * 3,
      icon: "inv_pet_cranegod",
      modifiers: [
        {
          icon: "inv_pet_jadeserpentpet",
          process: modifiers.addCooldown(-60 * 2),
        },
        {
          icon: "inv_inscription_deck_jadeserpent",
          process: modifiers.addCooldown(-30),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=197908/mana-tea",
      name: "Mana Tea",
      spellId: 197908,
      shortName: "Tea",
      cooldown: 60 * 1.5,
      icon: "monk_ability_cherrymanatea",
      modifiers: [],
    },
  ],
  [CLASSES.DRUID]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=33891/incarnation-tree-of-life",
      name: "Incarnation: Tree of Life",
      spellId: 33891,
      shortName: "Tree",
      cooldown: 60 * 3,
      icon: "ability_druid_improvedtreeform",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=740/tranquility",
      name: "Tranquility",
      spellId: 740,
      shortName: "Tranq",
      cooldown: 60 * 3,
      icon: "spell_nature_tranquility",
      modifiers: [
        {
          icon: "ability_druid_dreamstate",
          process: modifiers.addCooldown(-60),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=197721/flourish",
      name: "Flourish",
      spellId: 197721,
      shortName: "Flourish",
      cooldown: 60 * 1.5,
      icon: "spell_druid_wildburst",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=391528/convoke-the-spirits",
      name: "Convoke the Spirits",
      spellId: 391528,
      shortName: "Convoke",
      cooldown: 60 * 2,
      icon: "ability_ardenweald_druid",
      modifiers: [
        {
          icon: "ability_ardenweald_druid",
          process: modifiers.multiplyCooldown(0.5),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=29166/innervate",
      name: "Innervate",
      spellId: 29166,
      shortName: "Innervate",
      cooldown: 60 * 3,
      icon: "spell_nature_lightning",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=106898/stampeding-roar",
      name: "Stampeding Roar",
      spellId: 106898,
      shortName: "Roar",
      cooldown: 60 * 2,
      icon: "spell_druid_stampedingroar_cat",
      modifiers: [
        {
          icon: "spell_druid_stampedingroar_cat",
          process: modifiers.addCooldown(-60),
        },
      ],
    },
  ],
  [CLASSES.DEMONHUNTER]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=196718/darkness",
      name: "Darkness",
      spellId: 196718,
      shortName: "Dark",
      cooldown: 60 * 3,
      icon: "ability_demonhunter_darkness",
      modifiers: [],
    },
  ],
  [CLASSES.DEATHKNIGHT]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=51052/anti-magic-zone",
      name: "AntiMagic Zone",
      spellId: 51052,
      shortName: "AMZ",
      cooldown: 60 * 2,
      icon: "spell_deathknight_antimagiczone",
      modifiers: [],
    },
  ],
  [CLASSES.EVOKER]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=363534/rewind",
      name: "Rewind",
      spellId: 363534,
      shortName: "Rewind",
      cooldown: 60 * 4,
      icon: "ability_evoker_rewind",
      modifiers: [
        {
          icon: "ability_evoker_rewind",
          process: modifiers.addCooldown(-60),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=370537/stasis",
      name: "Stasis",
      spellId: 370537,
      shortName: "Stasis",
      cooldown: 60 * 1.5,
      icon: "ability_evoker_stasis",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=370960/emerald-communion",
      name: "Emerald Communion",
      spellId: 370960,
      shortName: "Communion",
      cooldown: 60 * 3,
      icon: "ability_evoker_green_01",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=359816/dream-flight",
      name: "Dream Flight",
      spellId: 359816,
      shortName: "Breath",
      cooldown: 60 * 2,
      icon: "ability_evoker_dreamflight",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=374227/zephyr",
      name: "Zephyr",
      spellId: 374227,
      shortName: "Zephyr",
      cooldown: 60 * 2,
      icon: "ability_evoker_hoverblack",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=374968/time-spiral",
      name: "Time Spiral",
      spellId: 374968,
      shortName: "Spiral",
      cooldown: 60 * 2,
      icon: "ability_evoker_timespiral",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=370665/rescue",
      name: "Rescue",
      spellId: 370665,
      shortName: "Rescue",
      cooldown: 60,
      icon: "ability_evoker_flywithme",
      modifiers: [],
    },
  ],
})

export default abilities

import { CLASSES } from "config/constants"
import type { Ability } from "types"
import _pipe from "lodash/flow"

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
  },
}

const abilities: {
  [s in (typeof CLASSES)[keyof typeof CLASSES]]: Ability[]
} = {
  [CLASSES.GENERAL]: [
    {
      name: "Personal defensives",
      spellId: 160533,
      shortName: "Personals",
      cooldown: 60 * 2,
      icon: "ability_vehicle_shellshieldgenerator",
      modifiers: [],
    },
    {
      name: "1 min CDs",
      spellId: 168430,
      shortName: "1 min CDs",
      cooldown: 60 * 1,
      icon: "achievement_pvp_h_01",
      modifiers: [],
    },
    {
      name: "2 min CDs",
      spellId: 168431,
      shortName: "2 min CDs",
      cooldown: 60 * 2,
      icon: "achievement_pvp_h_02",
      modifiers: [],
    },
    {
      name: "3 min CDs",
      spellId: 71195,
      shortName: "3 min CDs",
      cooldown: 60 * 3,
      icon: "achievement_pvp_h_03",
      modifiers: [],
    },
    {
      name: "Healthstone",
      spellId: 251527,
      shortName: "Healthstone",
      cooldown: 60 * 60,
      icon: "warlock_-healthstone",
      modifiers: [],
    },
    {
      name: "Health Potion",
      spellId: 194629,
      shortName: "Poti",
      cooldown: 60 * 5,
      icon: "inv_potion_27",
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
            modifiers.setCooldown(60),
            modifiers.setIcon("ability_paladin_veneration"),
            modifiers.setSpellId(216331),
            modifiers.setName("Avenging Crusader"),
            modifiers.setShortName("Avenging Crusader"),
            modifiers.setWowheadLink(
              "https://www.wowhead.com/spell=216331/avenging-crusader"
            )
          ),
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
      modifiers: [
        {
          icon: "spell_holy_fanaticism",
          wowheadLink: "https://www.wowhead.com/spell=392911/unwavering-spirit",
          process: _pipe(
            modifiers.addCooldown(-30),
          ),
        }
      ],
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
    {
      wowheadLink: "https://www.wowhead.com/spell=414176/daybreak",
      name: "Daybreak",
      spellId: 414176,
      shortName: "Daybreak",
      cooldown: 60,
      icon: "spell_holy_aspiration",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=135517/lights-hammer",
      name: "Light's Hammer",
      spellId: 135517,
      shortName: "Hammer",
      cooldown: 60,
      icon: "spell_paladin_lightshammer",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=204018/blessing-of-spellwarding",
      name: "Blessing of Spellwarding",
      spellId: 204018,
      shortName: "Spellwarding",
      cooldown: 60 * 5,
      icon: "spell_holy_blessingofprotection",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=384909/improved-blessing-of-protection",
          icon: "spell_holy_sealofprotection",
          process: _pipe(
            modifiers.addCooldown(-60),
          )
        },
        {
          wowheadLink: "https://www.wowhead.com/spell=378425/uthers-counsel",
          icon: "spell_holy_greaterblessingofsalvation",
          process: _pipe(
            modifiers.multiplyCooldown(0.7),
          )
        }
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=1022/blessing-of-protection",
      name: "Blessing of Protection",
      spellId: 1022,
      shortName: "Protection",
      cooldown: 60 * 5,
      icon: "spell_holy_sealofprotection",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=384909/improved-blessing-of-protection",
          icon: "spell_holy_sealofprotection",
          process: _pipe(
            modifiers.addCooldown(-60),
          )
        },
        {
          wowheadLink: "https://www.wowhead.com/spell=378425/uthers-counsel",
          icon: "spell_holy_greaterblessingofsalvation",
          process: _pipe(
            modifiers.multiplyCooldown(0.7),
          )
        }
      ],
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
            modifiers.setWowheadLink(
              "https://www.wowhead.com/spell=200183/apotheosis"
            )
          ),
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
      wowheadLink:
        "https://www.wowhead.com/spell=207399/ancestral-protection-totem",
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
          description:
            "Uplifted Spirits. Expected CD reduction from Rising Sun Kick",
          wowheadLink: "https://www.wowhead.com/spell=388551/uplifted-spirits",
          process: modifiers.addCooldown(-30),
          dependants: [1],
        },
        {
          icon: "ability_monk_soothingmists",
          description:
            "Uplifted Spirits. Expected extra CD reduction from Clouded Focus build",
          wowheadLink: "https://www.wowhead.com/spell=388047/clouded-focus",
          process: modifiers.addCooldown(-45),
          dependsOn: [0],
        },
      ],
    },
    {
      wowheadLink:
        "https://www.wowhead.com/spell=325197/invoke-chi-ji-the-red-crane",
      name: "Invoke Celestial",
      spellId: 325197,
      shortName: "Celestial",
      cooldown: 60 * 3,
      icon: "inv_pet_cranegod",
      modifiers: [
        {
          icon: "inv_pet_jadeserpentpet",
          description: "Gift of the Celestials",
          wowheadLink:
            "https://www.wowhead.com/spell=388212/gift-of-the-celestials",
          process: modifiers.addCooldown(-60 * 2),
          exclusiveWith: [1],
        },
        {
          icon: "inv_inscription_deck_jadeserpent",
          description: "Jade Bond",
          wowheadLink: "https://www.wowhead.com/spell=388031/jade-bond",
          process: modifiers.addCooldown(-30),
          exclusiveWith: [0],
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=116680/thunder-focus-tea",
      name: "Thunder Focus Tea",
      spellId: 116680,
      shortName: "TFT",
      cooldown: 30,
      icon: "ability_monk_thunderfocustea",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=191837/essence-font",
      name: "Essence Font",
      spellId: 191837,
      shortName: "Font",
      cooldown: 30,
      icon: "ability_monk_essencefont",
      modifiers: [],
    },
  ],
  [CLASSES.DRUID]: [
    {
      wowheadLink:
        "https://www.wowhead.com/spell=33891/incarnation-tree-of-life",
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
          description: "Inner Peace",
          wowheadLink: "https://www.wowhead.com/spell=197073/inner-peace",
          process: modifiers.addCooldown(-60),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=197721/flourish",
      name: "Flourish",
      spellId: 197721,
      shortName: "Flourish",
      cooldown: 60,
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
          description: "Cenarius Guidance",
          wowheadLink: "https://www.wowhead.com/spell=393371/cenarius-guidance",
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
          description: "Improved Stampeding Roar",
          wowheadLink:
            "https://www.wowhead.com/spell=288826/improved-stampeding-roar",
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
          description: "Temporal Artificer",
          wowheadLink:
            "https://www.wowhead.com/spell=381922/temporal-artificer",
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
    {
      wowheadLink: "https://www.wowhead.com/spell=406732/spatial-paradox",
      name: "Spatial Paradox",
      spellId: 406732,
      shortName: "Paradox",
      cooldown: 60 * 2,
      icon: "ability_evoker_stretchtime",
      modifiers: [],
    },
  ],
}

export default abilities

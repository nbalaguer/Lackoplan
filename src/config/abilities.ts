import { CLASSES } from "config/constants"
import type { Ability, Class } from "types"
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
  [c in Class]: Ability[]
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
      wowheadLink: "https://www.wowhead.com/spell=375576/divine-toll",
      name: "Divine Toll",
      spellId: 375576,
      shortName: "Toll",
      cooldown: 60,
      icon: "ability_bastion_paladin",
      modifiers: [
        {
          icon: "spell_holy_pureofheart",
          wowheadLink: "https://www.wowhead.com/spell=379391/quickened-invocation",
          description: "Quickened Invocation",
          process: modifiers.addCooldown(-15),
        }
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=200652/tyrs-deliverance",
      name: "Tyr's Deliverance",
      spellId: 200652,
      shortName: "Tyr's Deliverance",
      cooldown: 60 * 1.5,
      icon: "inv_mace_2h_artifactsilverhand_d_01",
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
          description: "Unwavering Spirit",
          process: modifiers.addCooldown(-30),
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
      ],
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
            modifiers.multiplyCooldown(0.85),
          )
        }
      ],
    },
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    },
  ],
  [CLASSES.HUNTER]: [],
  [CLASSES.ROGUE]: [],
  [CLASSES.PRIEST]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=120517/halo",
      name: "Halo",
      spellId: 120517,
      shortName: "Halo",
      cooldown: 60,
      icon: "ability_priest_halo",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=64843/divine-hymn",
      name: "Divine Hymn",
      spellId: 64843,
      shortName: "Hymn",
      spec: "holy",
      cooldown: 60 * 3,
      icon: "spell_holy_divinehymn",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=419110/seraphic-crescendo",
          icon: "spell_holy_divinehymn",
          process: _pipe(
            modifiers.addCooldown(-60),
          )
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=200183/apotheosis",
      name: "Apotheosis",
      spellId: 200183,
      shortName: "Apotheosis",
      spec: "holy",
      cooldown: 60 * 2,
      icon: "ability_priest_ascension",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=372835/lightwell",
      name: "Lightwell",
      spellId: 372835,
      shortName: "Well",
      spec: "holy",
      cooldown: 60 * 2 - (45 /* Expected CDR */),
      icon: "spell_holy_summonlightwell",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=64901/symbol-of-hope",
      name: "Symbol of Hope",
      spellId: 64901,
      shortName: "Hope",
      spec: "holy",
      cooldown: 60 * 3,
      icon: "spell_holy_symbolofhope",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=34433/shadowfiend?spellModifier=137032",
      name: "Shadowfiend",
      spellId: 34433,
      shortName: "Shadowfiend",
      spec: "discipline",
      cooldown: 60 * 3,
      icon: "spell_shadow_shadowfiend",
      modifiers: [
        {
          icon: "spell_shadow_soulleech_3",
          process: _pipe(
            modifiers.setCooldown(60),
            modifiers.setIcon("spell_shadow_soulleech_3"),
            modifiers.setSpellId(123040),
            modifiers.setName("Mindbender"),
            modifiers.setShortName("Mindbender"),
            modifiers.setWowheadLink(
              "https://www.wowhead.com/spell=123040/mindbender"
            )
          ),
        },
        {
          icon: "spell_shadow_shadowfiend",
          wowheadLink: "https://www.wowhead.com/spell=390770/void-summoner",
          process: _pipe(
            modifiers.multiplyCooldown(0.5),
          ),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=472433/evangelism",
      name: "Evangelism",
      spellId: 472433,
      shortName: "Evang",
      spec: "discipline",
      cooldown: 60 * 1.5,
      icon: "spell_holy_divineillumination",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=421453/ultimate-penitence",
      name: "Ultimate Penitence",
      spellId: 421453,
      shortName: "Ultimate Penitence",
      spec: "discipline",
      cooldown: 60 * 4,
      icon: "ability_priest_ascendance",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=62618/power-word-barrier",
      name: "Power Work: Barrier",
      spellId: 62618,
      shortName: "Barrier",
      spec: "discipline",
      cooldown: 60 * 3,
      icon: "spell_holy_powerwordbarrier",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=33206/pain-suppression",
      name: "Pain Suppression",
      spellId: 33206,
      shortName: "Pain Suppression",
      spec: "discipline",
      cooldown: 60 * 3,
      icon: "spell_holy_painsupression",
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
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    },
  ],
  [CLASSES.SHAMAN]: [
    {
      wowheadLink: "https://www.wowhead.com/spell=114052/ascendance",
      name: "Ascendance",
      spellId: 114052,
      shortName: "Asc",
      cooldown: 60 * 3,
      icon: "spell_fire_elementaldevastation",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=462440/first-ascendant",
          icon: "spell_shaman_astralshift",
          description: "First Ascendant",
          process: modifiers.addCooldown(-60),
        }
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=108280/healing-tide-totem",
      name: "Healing Tide Totem",
      spellId: 108280,
      shortName: "Tide",
      cooldown: 60 * 2.75, // CDR from Water Totem Mastery talent ~15sec
      icon: "ability_shaman_healingtide",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=404015/current-control",
          icon: "ability_shaman_healingtide",
          description: "Current Control",
          process: modifiers.addCooldown(-45),
        }
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=198838/earthen-wall-totem",
      name: "Earthen Wall Totem",
      spellId: 198838,
      shortName: "Wall",
      cooldown: 60,
      icon: "spell_nature_stoneskintotem",
      modifiers: [
        {
          icon: "spell_nature_reincarnation",
          process: _pipe(
            modifiers.setCooldown(60 * 5),
            modifiers.setIcon("spell_nature_reincarnation"),
            modifiers.setSpellId(207399),
            modifiers.setName("Ancestral Protection Totem"),
            modifiers.setShortName("Res Totem"),
            modifiers.setWowheadLink(
              "https://www.wowhead.com/spell=207399/ancestral-protection-totem"
            )
          ),
        },
      ],
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
      wowheadLink: "https://www.wowhead.com/spell=192077/wind-rush-totem",
      name: "Wind Rush Totem",
      spellId: 192077,
      shortName: "Rush",
      cooldown: 60 * 2,
      icon: "ability_shaman_windwalktotem",
      modifiers: [
        {
          wowheadLink: "https://www.wowhead.com/spell=462791/ascending-air",
          icon: "achievement_raidprimalist_windelemental",
          description: "Ascending Air",
          process: modifiers.addCooldown(-30),
        }
      ],
    },
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    }
  ],
  [CLASSES.MAGE]: [],
  [CLASSES.WARLOCK]: [],
  [CLASSES.MONK]: [
    {
      wowheadLink:
        "https://www.wowhead.com/spell=325197/invoke-chi-ji-the-red-crane",
      name: "Invoke Celestial",
      spellId: 325197,
      shortName: "Celestial",
      cooldown: 60 * 2,
      icon: "inv_pet_cranegod",
      modifiers: [
        {
          icon: "inv_pet_jadeserpentpet",
          description: "Gift of the Celestials",
          wowheadLink:
            "https://www.wowhead.com/spell=388212/gift-of-the-celestials",
          process: modifiers.addCooldown(-60),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=443028/celestial-conduit?spellModifier=137024",
      name: "Celestial Conduit",
      spellId: 443028,
      shortName: "Conduit",
      cooldown: 60 * 1.5,
      icon: "inv_ability_conduitofthecelestialsmonk_celestialconduit",
      modifiers: [],
    },
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
            "Uplifted Spirits. Expected CDR: 45s",
          wowheadLink: "https://www.wowhead.com/spell=388551/uplifted-spirits",
          process: modifiers.addCooldown(-45),
        },
      ],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=116849/life-cocoon",
      name: "Life Cocoon",
      spellId: 116849,
      shortName: "Cocoon",
      cooldown: 60 * 2,
      icon: "ability_monk_chicocoon",
      modifiers: [
        {
          icon: "ability_monk_domeofmist",
          wowheadLink: "https://www.wowhead.com/spell=202424/chrysalis",
          process: modifiers.addCooldown(-45),
        }
      ],
    },
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    }
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
      modifiers: [
        {
          icon: "ability_druid_treeoflife",
          description: "Cenarius' Guidance",
          wowheadLink: "https://www.wowhead.com/spell=393371/cenarius-guidance",
          process: modifiers.addCooldown(-60),
        }
      ],
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
          process: modifiers.addCooldown(-30),
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
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    }
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
    {
      name: "Stasis Release",
      spellId: 108978,
      shortName: "Stasis",
      cooldown: 60 * 1,
      icon: "spell_mage_altertime",
      modifiers: [],
    },
    {
      wowheadLink: "https://www.wowhead.com/spell=370553/tip-the-scales",
      name: "Tip the Scales",
      spellId: 370553,
      shortName: "Tip the Scales",
      cooldown: 60 * 2,
      icon: "ability_evoker_tipthescales",
      modifiers: [],
    },
    {
      name: "Spam!",
      spellId: 424650,
      shortName: "Spam!",
      cooldown: 60,
      icon: "spell_nzinsanity_panicattack",
      modifiers: [],
    }
  ],
}

export default abilities

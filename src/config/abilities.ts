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
  }
}

const abilities: {
  [s in (typeof CLASSES)[keyof typeof CLASSES]]: Ability[]
} = Object.freeze({
  [CLASSES.GENERAL]: [
    {
      name: "Personal defensives",
      shortName: "Personals",
      cooldown: 60 * 2,
      icon: "ability_thunderking_overcharge",
      modifiers: [],
    },
    {
      name: "Healthstone",
      shortName: "Healthstone",
      cooldown: 60 * 60,
      icon: "warlock_-healthstone",
      modifiers: [],
    },
    {
      name: "Health Potion",
      shortName: "Poti",
      cooldown: 60 * 5,
      icon: "inv_potion_51",
      modifiers: [],
    },
  ],
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
      name: "Avenging Wrath",
      shortName: "Wings",
      cooldown: 60 * 2,
      icon: "spell_holy_avenginewrath",
      modifiers: [
        {
          icon: "ability_paladin_veneration",
          process: _pipe(modifiers.setCooldown(45), modifiers.setIcon("ability_paladin_veneration"))
        },
      ],
    },
    {
      name: "Holy Avenger",
      shortName: "Avenger",
      cooldown: 60 * 3,
      icon: "ability_paladin_holyavenger",
      modifiers: [],
    },
    {
      name: "Aura of Mastery",
      shortName: "Mastery",
      cooldown: 60 * 3,
      icon: "spell_holy_auramastery",
      modifiers: [],
    },
    {
      name: "Divine Toll",
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
      name: "Divine Hymn",
      shortName: "Hymn",
      cooldown: 60 * 3,
      icon: "spell_holy_divinehymn",
      modifiers: [],
    },
    {
      name: "Holy Work: Salvation",
      shortName: "Salvation",
      cooldown: 60 * 4,
      icon: "ability_priest_archangel",
      modifiers: [
        {
          icon: "ability_priest_ascension",
          process: _pipe(modifiers.setCooldown(60 * 2), modifiers.setIcon("ability_priest_ascension"))
        },
      ],
    },
    {
      name: "Symbol of Hope",
      shortName: "Hope",
      cooldown: 60 * 3,
      icon: "spell_holy_symbolofhope",
      modifiers: [],
    },
    {
      name: "Lightwell",
      shortName: "Well",
      cooldown: 60 * 3,
      icon: "spell_holy_summonlightwell",
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
      name: "Evangelism",
      shortName: "Evang",
      cooldown: 60 * 1.5,
      icon: "spell_holy_divineillumination",
      modifiers: [],
    },
    {
      name: "Rapture",
      shortName: "Rapture",
      cooldown: 60 * 1.5,
      icon: "spell_holy_rapture",
      modifiers: [],
    },
    {
      name: "Vampiric Embrace",
      shortName: "Embrace",
      cooldown: 60 * 2,
      icon: "spell_shadow_unsummonbuilding",
      modifiers: [],
    },
  ],
  [CLASSES.SHAMAN]: [
    {
      name: "Healing Tide Totem",
      shortName: "Tide",
      cooldown: 60 * 3,
      icon: "ability_shaman_healingtide",
      modifiers: [],
    },
    {
      name: "Spirit-Link Totem",
      shortName: "Link",
      cooldown: 60 * 3,
      icon: "spell_shaman_spiritlink",
      modifiers: [],
    },
    {
      name: "Ancestral Protection Totem",
      shortName: "Res",
      cooldown: 60 * 5,
      icon: "spell_nature_reincarnation",
      modifiers: [],
    },
    {
      name: "Earthen Wall Totem",
      shortName: "Wall",
      cooldown: 60,
      icon: "spell_nature_stoneskintotem",
      modifiers: [],
    },
    {
      name: "Ascendance",
      shortName: "Asc",
      cooldown: 60 * 3,
      icon: "spell_fire_elementaldevastation",
      modifiers: [],
    },
    {
      name: "Wind Rush Totem",
      shortName: "Rush",
      cooldown: 60 * 2,
      icon: "ability_shaman_windwalktotem",
      modifiers: [],
    },
    {
      name: "Ancestral Guidance",
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
      name: "Revival",
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
      name: "Invoke Chi-ji, the Red Crane",
      shortName: "Chi-ji",
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
      name: "Mana Tea",
      shortName: "Tea",
      cooldown: 60 * 1.5,
      icon: "monk_ability_cherrymanatea",
      modifiers: [],
    },
  ],
  [CLASSES.DRUID]: [
    {
      name: "Incarnation: Tree of Life",
      shortName: "Tree",
      cooldown: 60 * 3,
      icon: "ability_druid_improvedtreeform",
      modifiers: [],
    },
    {
      name: "Tranquility",
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
      name: "Flourish",
      shortName: "Flourish",
      cooldown: 60 * 1.5,
      icon: "spell_druid_wildburst",
      modifiers: [],
    },
    {
      name: "Convoke the Spirits",
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
      name: "Innervate",
      shortName: "Innervate",
      cooldown: 60 * 3,
      icon: "spell_nature_lightning",
      modifiers: [],
    },
    {
      name: "Stampeding Roar",
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
      name: "Darkness",
      shortName: "Dark",
      cooldown: 60 * 3,
      icon: "ability_demonhunter_darkness",
      modifiers: [],
    },
  ],
  [CLASSES.DEATHKNIGHT]: [
    {
      name: "Anti-Magic Zone",
      shortName: "AMZ",
      cooldown: 60 * 2,
      icon: "spell_deathknight_antimagiczone",
      modifiers: [],
    },
  ],
  [CLASSES.EVOKER]: [
    {
      name: "Rewind",
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
      name: "Dream Flight",
      shortName: "Breath",
      cooldown: 60 * 2,
      icon: "ability_evoker_dreamflight",
      modifiers: [],
    },
    {
      name: "Stasis",
      shortName: "Stasis",
      cooldown: 60 * 1.5,
      icon: "ability_evoker_stasis",
      modifiers: [],
    },
    {
      name: "Emerald Communion",
      shortName: "Communion",
      cooldown: 60 * 3,
      icon: "ability_evoker_green_01",
      modifiers: [],
    },
    {
      name: "Zephyr",
      shortName: "Zephyr",
      cooldown: 60 * 2,
      icon: "ability_evoker_hoverblack",
      modifiers: [],
    },
    {
      name: "Time Spiral",
      shortName: "Spiral",
      cooldown: 60 * 2,
      icon: "ability_evoker_timespiral",
      modifiers: [],
    },
    {
      name: "Rescue",
      shortName: "Rescue",
      cooldown: 60,
      icon: "ability_evoker_flywithme",
      modifiers: [],
    },
  ],
})

export default abilities

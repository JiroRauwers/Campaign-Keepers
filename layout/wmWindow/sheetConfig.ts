import { text } from "stream/consumers";

export const configs = {
  data: {
    dataStructure: {
      attributes: {
        _type: "group",
        physical: {
          _type: "group",
          strength: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          dexterity: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          stamina: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
        },
        social: {
          _type: "group",
          charisma: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          manipulation: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          appearance: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
        },
        mental: {
          _type: "group",
          perception: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          intelligence: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
          wits: {
            _type: "value",
            min: 0,
            value: 0,
            max: 5,
          },
        },
      },
      abilities: {
        _type: "group",
        talents: {
          _type: "group",
          awareness: { _type: "value", value: 0, min: 0, max: 5 },
          athletics: { _type: "value", value: 0, min: 0, max: 5 },
          brawl: { _type: "value", value: 0, min: 0, max: 5 },
          empathy: { _type: "value", value: 0, min: 0, max: 5 },
          expression: { _type: "value", value: 0, min: 0, max: 5 },
          intimidation: { _type: "value", value: 0, min: 0, max: 5 },
          leadership: { _type: "value", value: 0, min: 0, max: 5 },
          streetwise: { _type: "value", value: 0, min: 0, max: 5 },
          subterfuge: { _type: "value", value: 0, min: 0, max: 5 },
        },
        skills: {
          _type: "group",
          animalKen: { _type: "value", value: 0, min: 0, max: 5 },
          crafts: { _type: "value", value: 0, min: 0, max: 5 },
          drive: { _type: "value", value: 0, min: 0, max: 5 },
          etiquette: { _type: "value", value: 0, min: 0, max: 5 },
          firearms: { _type: "value", value: 0, min: 0, max: 5 },
          melee: { _type: "value", value: 0, min: 0, max: 5 },
          performance: { _type: "value", value: 0, min: 0, max: 5 },
          security: { _type: "value", value: 0, min: 0, max: 5 },
          stealth: { _type: "value", value: 0, min: 0, max: 5 },
        },
        knowledges: {
          _type: "group",
          academics: { _type: "value", value: 0, min: 0, max: 5 },
          computer: { _type: "value", value: 0, min: 0, max: 5 },
          finance: { _type: "value", value: 0, min: 0, max: 5 },
          investigation: { _type: "value", value: 0, min: 0, max: 5 },
          law: { _type: "value", value: 0, min: 0, max: 5 },
          medicine: { _type: "value", value: 0, min: 0, max: 5 },
          occult: { _type: "value", value: 0, min: 0, max: 5 },
          politics: { _type: "value", value: 0, min: 0, max: 5 },
          science: { _type: "value", value: 0, min: 0, max: 5 },
        },
      },
      advantages: {
        _type: "group",
        disciplines: { _type: "group" },
        backgrounds: { _type: "group" },
        virtues: {
          _type: "group",
          conscience: { _type: "value", value: 1, min: 0, max: 5 },
          selfControl: { _type: "value", value: 1, min: 0, max: 5 },
          courage: { _type: "value", value: 1, min: 0, max: 5 },
        },
      },
      vitals: {
        _type: "group",
        bloodPool: { _type: "value", value: 10, min: 0, max: 10 },
        willpower: { _type: "value", value: 1, min: 0, max: 10 },
        health: {
          _type: "group",
          base: {
            _type: "computed",
            vars: {
              stamina: "attributes.physical.stamina",
            },
            formula: "stamina + 3",
            min: 3,
            max: 10,
          },
          current: {
            _type: "value",
            value: 0,
            min: {
              _type: "computed",
              vars: {
                base: "vitals.health.base",
              },
              formula: "base",
            },
            max: 10,
          },
        },
      },
      details: {
        _type: "group",
        name: { _type: "string", value: "" },
        player: { _type: "string", value: "" },
        chronicle: { _type: "string", value: "" },
        nature: { _type: "string", value: "" },
        demeanor: { _type: "string", value: "" },
        concept: { _type: "string", value: "" },
        clan: { _type: "string", value: "" },
        generation: { _type: "string", value: "" },
        sire: { _type: "string", value: "" },
      },
    },
  },
  blocks: [
    {
      id: "attributesCard",
      type: "cardGroup",
      label: "Attributes",
      dataPath: "attributes",
      labelStyle: {
        textAlign: "center",
        fontSize: "1.5rem",
      },
      style: {
        marginBottom: "1rem",
      },
      children: [
        {
          id: "attributeLayout",
          type: "group",
          style: {
            display: "grid",
            textAlign: "left",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          },
          children: [
            {
              id: "physicalGroup",
              type: "group",
              dataPath: "attributes.physical",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Physical",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "strengthDots",
                  type: "dots",
                  dataPath: "attributes.physical.strength",
                  label: "Strength",
                },
                {
                  id: "dexterityDots",
                  type: "dots",
                  dataPath: "attributes.physical.dexterity",
                  label: "Dexterity",
                },
                {
                  id: "staminaDots",
                  type: "dots",
                  dataPath: "attributes.physical.stamina",
                  label: "Stamina",
                },
              ],
            },
            {
              id: "socialGroup",
              type: "group",
              dataPath: "attributes.social",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Social",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "charismaDots",
                  type: "dots",
                  dataPath: "attributes.social.charisma",
                  label: "Charisma",
                },
                {
                  id: "manipulationDots",
                  type: "dots",
                  dataPath: "attributes.social.manipulation",
                  label: "Manipulation",
                },
                {
                  id: "appearanceDots",
                  type: "dots",
                  dataPath: "attributes.social.appearance",
                  label: "Appearance",
                },
              ],
            },
            {
              id: "mentalGroup",
              type: "group",
              dataPath: "attributes.mental",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Mental",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "perceptionDots",
                  type: "dots",
                  dataPath: "attributes.mental.perception",
                  label: "Perception",
                },
                {
                  id: "intelligenceDots",
                  type: "dots",
                  dataPath: "attributes.mental.intelligence",
                  label: "Intelligence",
                },
                {
                  id: "witsDots",
                  type: "dots",
                  dataPath: "attributes.mental.wits",
                  label: "Wits",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "abilitiesCard",
      type: "cardGroup",
      dataPath: "abilities",
      children: [
        {
          id: "abilitiesLayout",
          type: "group",
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
          },
          children: [
            {
              id: "talentsGroup",
              type: "group",
              dataPath: "abilities.talents",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Talents",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "awarenessDots",
                  type: "dots",
                  dataPath: "abilities.talents.awareness",
                  label: "Awareness",
                },
                {
                  id: "athleticsDots",
                  type: "dots",
                  dataPath: "abilities.talents.athletics",
                  label: "Athletics",
                },
                {
                  id: "brawlDots",
                  type: "dots",
                  dataPath: "abilities.talents.brawl",
                  label: "Brawl",
                },
                {
                  id: "empathyDots",
                  type: "dots",
                  dataPath: "abilities.talents.empathy",
                  label: "Empathy",
                },
                {
                  id: "expressionDots",
                  type: "dots",
                  dataPath: "abilities.talents.expression",
                  label: "Expression",
                },
                {
                  id: "intimidationDots",
                  type: "dots",
                  dataPath: "abilities.talents.intimidation",
                  label: "Intimidation",
                },
                {
                  id: "leadershipDots",
                  type: "dots",
                  dataPath: "abilities.talents.leadership",
                  label: "Leadership",
                },
                {
                  id: "streetwiseDots",
                  type: "dots",
                  dataPath: "abilities.talents.streetwise",
                  label: "Streetwise",
                },
                {
                  id: "subterfugeDots",
                  type: "dots",
                  dataPath: "abilities.talents.subterfuge",
                  label: "Subterfuge",
                },
              ],
            },
            {
              id: "skillsGroup",
              type: "group",
              dataPath: "abilities.skills",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Skills",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "animalKenDots",
                  type: "dots",
                  dataPath: "abilities.skills.animalKen",
                  label: "Animal Ken",
                },
                {
                  id: "craftsDots",
                  type: "dots",
                  dataPath: "abilities.skills.crafts",
                  label: "Crafts",
                },
                {
                  id: "driveDots",
                  type: "dots",
                  dataPath: "abilities.skills.drive",
                  label: "Drive",
                },
                {
                  id: "etiquetteDots",
                  type: "dots",
                  dataPath: "abilities.skills.etiquette",
                  label: "Etiquette",
                },
                {
                  id: "firearmsDots",
                  type: "dots",
                  dataPath: "abilities.skills.firearms",
                  label: "Firearms",
                },
                {
                  id: "meleeDots",
                  type: "dots",
                  dataPath: "abilities.skills.melee",
                  label: "Melee",
                },
                {
                  id: "performanceDots",
                  type: "dots",
                  dataPath: "abilities.skills.performance",
                  label: "Performance",
                },
                {
                  id: "securityDots",
                  type: "dots",
                  dataPath: "abilities.skills.security",
                  label: "Security",
                },
                {
                  id: "stealthDots",
                  type: "dots",
                  dataPath: "abilities.skills.stealth",
                  label: "Stealth",
                },
              ],
            },
            {
              id: "knowledgesGroup",
              type: "group",
              dataPath: "abilities.knowledges",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Knowledges",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "academicsDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.academics",
                  label: "Academics",
                },
                {
                  id: "computerDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.computer",
                  label: "Computer",
                },
                {
                  id: "financeDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.finance",
                  label: "Finance",
                },
                {
                  id: "investigationDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.investigation",
                  label: "Investigation",
                },
                {
                  id: "lawDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.law",
                  label: "Law",
                },
                {
                  id: "medicineDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.medicine",
                  label: "Medicine",
                },
                {
                  id: "occultDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.occult",
                  label: "Occult",
                },
                {
                  id: "politicsDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.politics",
                  label: "Politics",
                },
                {
                  id: "scienceDots",
                  type: "dots",
                  dataPath: "abilities.knowledges.science",
                  label: "Science",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "vitalsCard",
      type: "cardGroup",
      label: "Vitals",
      dataPath: "vitals",
      labelStyle: {
        textAlign: "center",
        fontSize: "1.5rem",
      },
      style: {
        marginBottom: "1rem",
      },
      children: [
        {
          id: "vitalsLayout",
          type: "group",
          style: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          },
          children: [
            {
              id: "healthGroup",
              type: "group",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              },
              label: "Health",
              labelStyle: {
                fontSize: "1.2rem",
              },
              children: [
                {
                  id: "baseHealthDots",
                  type: "dots",
                  readOnly: true,
                  dataPath: "vitals.health.base",
                  label: "Base Health",
                },
                {
                  id: "currentHealthDots",
                  type: "dots",
                  dataPath: "vitals.health.current",
                  label: "Current Health",
                },
              ],
            },
            {
              id: "poolsGroup",
              type: "group",
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              },
              children: [
                {
                  id: "bloodPoolDots",
                  type: "dots",
                  dataPath: "vitals.bloodPool",
                  label: "Blood Pool",
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  },
                  readOnly: true,
                },
                {
                  id: "willpowerDots",
                  type: "dots",
                  dataPath: "vitals.willpower",
                  label: "Willpower",
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  },
                  readOnly: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  defaultBlocks: [
    {
      id: "attributesCard",
      order: 0,
    },
    {
      id: "abilitiesCard",
      order: 1,
    },
    {
      id: "vitalsCard",
      order: 2,
    },
  ],
  id: "p_sheets_test",
  name: "p_sheets_test_configs",
};

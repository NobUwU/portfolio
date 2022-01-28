import {
  Route,
  Project,
} from './types'

export const routes: Route[] = [
  {
    id: 0,
    name: "ABOUT",
  },
  {
    id: 1,
    name: "PROJECTS",
  },
  // {
  //   id: 2,
  //   name: "COOL STUFF",
  // },
  // {
  //   id: 3,
  //   name: "FAQ",
  // },
]

export const projects: Project[] = [
  {
    name: "BeAPI",
    description: "BeAPI (an abbreviation for \"Bedrock edition API\") is an NPM create app wrapper for Minecrafts unstable gametest API.",
    image: "/projects/compressed/webp/beapi.webp",
    position: "center center",
    span: 2,
    refs: [
      {
        type: "github",
        link: "https://github.com/MCBE-Utilities/BeAPI",
      },
    ],
    technologies: ["Typescript", "NPM", "Minecraft", "Gametest"],
  },
  {
    name: "BeRP",
    description: "Minecraft Bedrock Realms, raknet implementation for connecting bot players!",
    image: "/projects/compressed/webp/berp.webp",
    position: "left center",
    refs: [
      {
        type: "github",
        link: "https://github.com/nobu-sh/BeRP",
      },
    ],
    technologies: ["Typescript", "Minecraft", "Protodef", "UDP"],
  },
  {
    name: "Chat Server",
    description: "Proof of concept websocket chat server complete with websockets and api. (WIP)",
    image: "/projects/compressed/webp/chat.webp",
    position: "left center",
    refs: [
      {
        type: "github",
        link: "https://github.com/nobu-sh/chat-server",
      },
    ],
    technologies: ["Typescript", "React", "Webpack", "Sass", "Express", "SQLite"],
  },
  {
    name: "Yua",
    description: "Anime/Utility Discord bot.",
    image: "/projects/compressed/webp/yua.webp",
    position: "center center",
    refs: [
      {
        type: "github",
        link: "https://github.com/CherryBlossomTavern",
      },
    ],
    technologies: ["Typescript", "Discord"],
  },
  {
    name: "ani-migrate",
    description: "PostgreSQL script migrator with per schema versioning.",
    image: "/projects/compressed/webp/ani-migrate.webp",
    position: "left center",
    refs: [
      {
        type: "github",
        link: "https://github.com/nobu-sh/ani-migrate",
      },
    ],
    technologies: ["Typescript", "PostgreSQL"],
  },
  {
    name: "Singularity",
    description: "Snowflake like id generator with low overlap chance.",
    image: "/projects/compressed/webp/singularity.webp",
    position: "left center",
    refs: [
      {
        type: "github",
        link: "https://github.com/nobu-sh/singularity",
      },
    ],
    technologies: ["Typescript"],
  },
  {
    name: "realmz.xyz",
    description: "A multitool platform based around realm voting, realm tools, realm invites, etc.",
    image: "/projects/compressed/webp/realmz.webp",
    position: "center center",
    span: 2,
    refs: [
      {
        type: "github",
        link: "https://github.com/nobu-sh/realmz.xyz",
      },
    ],
    technologies: ["Typescript", "Vue", "Sass", "Pug", "Webpack"],
  },
]

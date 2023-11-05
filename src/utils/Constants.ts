import { ColorCodes } from './ColorNamer.js'

export const enum InteractionType {
  SlashCommand,
  Button,
  Select,
  ContextMenu,
  Modal,
  AutoComplete
}

export const enum ReportType {
  Webhook,
  Text
}

export const enum LevelType {
  Silly,
  Trace,
  Debug,
  Info,
  Warn,
  Error,
  Fatal
}

export const ColorName: Record<ColorCodes, string> = {
  COLOR_AQUA: '물색',
  COLOR_BLUE: '파랑색',
  COLOR_BLUEGRAY: '청회색',
  COLOR_BROWN: '갈색',
  COLOR_DARKRED: '짙은 빨간색',
  COLOR_DARKYELLOW: '짙은 노랑색',
  COLOR_DARKGREEN: '짙은 초록색',
  COLOR_DARKTEAL: '짙은 청록색',
  COLOR_DARKBLUE: '짙은 파랑색',
  COLOR_INDIGO: '남색',
  COLOR_DARKPURPLE: '짙은 보라',
  COLOR_PLUM: '자두색',
  COLOR_CORAL: '다홍색',
  COLOR_ROSE: '장미색',
  COLOR_LIGHTORANGE: '연한 주황색',
  COLOR_TAN: '황갈색',
  COLOR_LIGHTYELLOW: '연한 노랑색',
  COLOR_LIGHTGREEN: '연한 초록색',
  COLOR_LIME: '라임색',
  COLOR_SKYBLUE: '하늘색',
  COLOR_LIGHTTURQUOISE: '연청록색',
  COLOR_PALEBLUE: '민트색',
  COLOR_LIGHTBLUE: '연파랑색',
  COLOR_ICEBLUE: '담청색',
  COLOR_PERIWINKLE: '연한 보라색',
  COLOR_LAVENDER: '라벤더색',
  COLOR_PINK: '분홍색',
  COLOR_RED: '빨강색',
  COLOR_ORANGE: '주황색',
  COLOR_GOLD: '골드색',
  COLOR_YELLOW: '노랑색',
  COLOR_OLIVEGREEN: '황갈색',
  COLOR_GREEN: '초록색',
  COLOR_BRIGHTGREEN: '라임색',
  COLOR_TEAL: '진한 청록색',
  COLOR_TURQUOISE: '청록색',
  COLOR_PURPLE: '보라색',
  COLOR_BLACK: '검은색',
  COLOR_DARKGRAY: '진한 회색',
  COLOR_GRAY: '회색',
  COLOR_LIGHTGRAY: '연한 회색',
  COLOR_WHITE: '횐색',
  undefined: '알수없음'
}

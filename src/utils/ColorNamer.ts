import Color from '@structures/Color'

export class ColorNameHelper {
  private static readonly DBLEPSILON: number = 2.2204460492503131e-16

  // 1 - coral, 2 - red, 3 - orange, 4 - brown, 5 - tan, 6 - gold, 7 - yellow, 8 - olive green (with brown),
  // 9 - olive green (with green) 10 - lime green, 11 - green - 12 - bright green 13 - teal, 14 - aqua,
  // 15 - turquoise, 16 - pale blue, 17 - blue, 18 - blue-gray, 19 - indigo, 20 - purple, 21 - pink, 22 - brown, 23 - red
  private static hueLimitsForSatLevel1: number[] = [
    8, 0, 0, 44, 0, 0, 0, 63, 0, 0, 122, 0, 134, 0, 0, 0, 0, 166, 176, 241, 0,
    256, 0
  ]
  private static hueLimitsForSatLevel2: number[] = [
    0, 10, 0, 32, 46, 0, 0, 0, 61, 0, 106, 0, 136, 144, 0, 0, 0, 158, 166, 241,
    0, 0, 256
  ]
  private static hueLimitsForSatLevel3: number[] = [
    0, 8, 0, 0, 39, 46, 0, 0, 0, 71, 120, 0, 131, 144, 0, 0, 163, 0, 177, 211,
    249, 0, 256
  ]
  private static hueLimitsForSatLevel4: number[] = [
    0, 11, 26, 0, 0, 38, 45, 0, 0, 56, 100, 121, 129, 0, 140, 0, 180, 0, 0, 224,
    241, 0, 256
  ]
  private static hueLimitsForSatLevel5: number[] = [
    0, 13, 27, 0, 0, 36, 45, 0, 0, 59, 118, 0, 127, 136, 142, 0, 185, 0, 0, 216,
    239, 0, 256
  ]

  private static lumLimitsForHueIndexLow: number[] = [
    130, 100, 115, 100, 100, 100, 110, 75, 100, 90, 100, 100, 100, 100, 80, 100,
    100, 100, 100, 100, 100, 100, 100
  ]
  private static lumLimitsForHueIndexHigh: number[] = [
    170, 170, 170, 155, 170, 170, 170, 170, 170, 115, 170, 170, 170, 170, 170,
    170, 170, 170, 150, 150, 170, 140, 165
  ]

  public static readonly colorNamesLight = [
    'COLOR_CORAL',
    'COLOR_ROSE',
    'COLOR_LIGHTORANGE',
    'COLOR_TAN',
    'COLOR_TAN',
    'COLOR_LIGHTYELLOW',
    'COLOR_LIGHTYELLOW',
    'COLOR_TAN',
    'COLOR_LIGHTGREEN',
    'COLOR_LIME',
    'COLOR_LIGHTGREEN',
    'COLOR_LIGHTGREEN',
    'COLOR_AQUA',
    'COLOR_SKYBLUE',
    'COLOR_LIGHTTURQUOISE',
    'COLOR_PALEBLUE',
    'COLOR_LIGHTBLUE',
    'COLOR_ICEBLUE',
    'COLOR_PERIWINKLE',
    'COLOR_LAVENDER',
    'COLOR_PINK',
    'COLOR_TAN',
    'COLOR_ROSE',
    'COLOR_WHITE',
    'COLOR_LIGHTGRAY'
  ] as const
  public static readonly colorNamesMid = [
    'COLOR_CORAL',
    'COLOR_RED',
    'COLOR_ORANGE',
    'COLOR_BROWN',
    'COLOR_TAN',
    'COLOR_GOLD',
    'COLOR_YELLOW',
    'COLOR_OLIVEGREEN',
    'COLOR_OLIVEGREEN',
    'COLOR_GREEN',
    'COLOR_GREEN',
    'COLOR_BRIGHTGREEN',
    'COLOR_TEAL',
    'COLOR_AQUA',
    'COLOR_TURQUOISE',
    'COLOR_PALEBLUE',
    'COLOR_BLUE',
    'COLOR_BLUEGRAY',
    'COLOR_INDIGO',
    'COLOR_PURPLE',
    'COLOR_PINK',
    'COLOR_BROWN',
    'COLOR_RED',
    'COLOR_GRAY'
  ] as const
  public static readonly colorNamesDark = [
    'COLOR_BROWN',
    'COLOR_DARKRED',
    'COLOR_BROWN',
    'COLOR_BROWN',
    'COLOR_BROWN',
    'COLOR_DARKYELLOW',
    'COLOR_DARKYELLOW',
    'COLOR_BROWN',
    'COLOR_DARKGREEN',
    'COLOR_DARKGREEN',
    'COLOR_DARKGREEN',
    'COLOR_DARKGREEN',
    'COLOR_DARKGRAY',
    'COLOR_DARKTEAL',
    'COLOR_DARKTEAL',
    'COLOR_DARKTEAL',
    'COLOR_DARKBLUE',
    'COLOR_DARKBLUE',
    'COLOR_BLUEGRAY',
    'COLOR_INDIGO',
    'COLOR_DARKPURPLE',
    'COLOR_PLUM',
    'COLOR_BROWN',
    'COLOR_DARKRED',
    'COLOR_BLACK',
    'undefined'
  ] as const

  public static getColorName(color: Color): ColorCodes {
    const { Hue, Saturation, Lightness } =
      ColorNameHelper.convertToHSLColor(color)
    const hueNormalized = (Hue === 0 ? 0 : Hue / 360) * 255
    const satNormalized = Saturation * 255
    const lumNormalized = Lightness * 255

    if (lumNormalized > 240) {
      return 'COLOR_WHITE'
    } else if (lumNormalized < 20) {
      return 'COLOR_BLACK'
    }
    if (satNormalized <= 20) {
      if (lumNormalized > 170) {
        return 'COLOR_LIGHTGRAY'
      } else if (lumNormalized > 100) {
        return 'COLOR_GRAY'
      } else {
        return 'COLOR_DARKGRAY'
      }
    }

    let pHueLimits: number[]
    if (satNormalized > 20 && satNormalized <= 75) {
      pHueLimits = ColorNameHelper.hueLimitsForSatLevel1
    } else if (satNormalized > 75 && satNormalized <= 115) {
      pHueLimits = ColorNameHelper.hueLimitsForSatLevel2
    } else if (satNormalized > 115 && satNormalized <= 150) {
      pHueLimits = ColorNameHelper.hueLimitsForSatLevel3
    } else if (satNormalized > 150 && satNormalized <= 240) {
      pHueLimits = ColorNameHelper.hueLimitsForSatLevel4
    } else {
      pHueLimits = ColorNameHelper.hueLimitsForSatLevel5
    }

    let colorIndex = -1
    for (let i = 0; i < ColorNameHelper.colorNamesMid.length; ++i) {
      if (hueNormalized < pHueLimits[i]) {
        colorIndex = i
        break
      }
    }

    if (colorIndex !== -1) {
      if (
        lumNormalized > ColorNameHelper.lumLimitsForHueIndexHigh[colorIndex]
      ) {
        return ColorNameHelper.colorNamesLight[colorIndex]
      } else if (
        lumNormalized < ColorNameHelper.lumLimitsForHueIndexLow[colorIndex]
      ) {
        return ColorNameHelper.colorNamesDark[colorIndex]
      } else {
        return ColorNameHelper.colorNamesMid[colorIndex]
      }
    }
    return 'undefined'
  }
  public static AreClose(a: number, b: number): boolean {
    return Math.abs(a - b) <= ColorNameHelper.DBLEPSILON * Math.abs(a)
  }

  public static convertToHSLColor(color: Color): {
    Hue: number
    Saturation: number
    Lightness: number
  } {
    const min = Math.min(Math.min(color.R, color.G), color.B) / 255
    const max = Math.max(Math.max(color.R, color.G), color.B) / 255
    const lightness = (max + min) / 2
    if (lightness === 0 || min === max) {
      return { Hue: color.getHue(), Saturation: 0, Lightness: lightness }
    } else if (lightness > 0 && lightness <= 0.5) {
      return {
        Hue: color.getHue(),
        Saturation: (max - min) / (max + min),
        Lightness: lightness
      }
    }
    return {
      Hue: color.getHue(),
      Saturation: (max - min) / (2 - (max + min)),
      Lightness: lightness
    }
  }
}

export type ColorCodes =
  | (typeof ColorNameHelper.colorNamesDark)[number]
  | (typeof ColorNameHelper.colorNamesLight)[number]
  | (typeof ColorNameHelper.colorNamesMid)[number]

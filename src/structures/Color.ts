export default class Color {
  private _red: number
  private _green: number
  private _blue: number
  private _alpha: number

  constructor(hex: `#${string}`)
  constructor(red: number, green: number, blue: number, alpha?: number)
  constructor(
    hexOrRed: number | `#${string}`,
    green?: number,
    blue?: number,
    alpha: number = 1
  ) {
    this._red = 0
    this._green = 0
    this._blue = 0
    this._alpha = 0

    if (typeof hexOrRed == 'string') {
      const { r, g, b, a } = Color.hexToRgb(hexOrRed)
      this._red = r
      this._green = g
      this._blue = b
      this._alpha = a !== undefined ? a : alpha
    } else if (green && blue) {
      this._red = this.clamp(hexOrRed)
      this._green = this.clamp(green)
      this._blue = this.clamp(blue)
      this._alpha = this.clamp(alpha, 0, 1)
    }
  }

  get R(): number {
    return this._red
  }

  get G(): number {
    return this._green
  }

  get B(): number {
    return this._blue
  }

  get A(): number {
    return this._alpha
  }

  toString(): string {
    return `rgba(${this._red}, ${this._green}, ${this._blue}, ${this._alpha})`
  }

  private clamp(value: number, min: number = 0, max: number = 255): number {
    return Math.min(max, Math.max(min, value))
  }

  getHue(): number {
    const r = this._red / 255
    const g = this._green / 255
    const b = this._blue / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let hue = 0

    if (max === min) {
      return 0
    }

    const delta = max - min

    if (max === r) {
      hue = (g - b) / delta + (g < b ? 6 : 0)
    } else if (max === g) {
      hue = (b - r) / delta + 2
    } else {
      hue = (r - g) / delta + 4
    }

    hue *= 60

    if (hue < 0) {
      hue += 360
    }

    return Math.round(hue)
  }

  public static hexToRgb(hex: `#${string}` | string) {
    if (hex === '0') hex = '#99aab5' // If discord roles not colored, change to default color

    const result =
      /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
    if (result) {
      const r = parseInt(result[1], 16)
      const g = parseInt(result[2], 16)
      const b = parseInt(result[3], 16)
      const a = result[4] ? parseInt(result[4], 16) / 255 : 1
      return { r, g, b, a }
    }
    throw new TypeError(`Invalid HEX color: ${hex}`)
  }
}

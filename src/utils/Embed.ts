import { EmbedBuilder, type EmbedData } from 'discord.js'
import { EmbedType } from '@types'
import BotClient from '@structures/BotClient'
import { labels } from '@catppuccin/palette'

export default class Embed extends EmbedBuilder {
  constructor(client: BotClient, type: EmbedType) {
    if (!client.isReady()) return

    const EmbedJSON: EmbedData = {
      timestamp: new Date().toISOString(),
      footer: {
        iconURL: client.user.avatarURL() ?? undefined,
        text: client.user.username
      }
    }

    super(EmbedJSON)

    this.setType(type)
  }

  setType(type: EmbedType) {
    if (type === 'success') this.setColor(labels.green.mocha.hex as '#')
    else if (type === 'error') this.setColor(labels.red.mocha.hex as '#')
    else if (type === 'warn') this.setColor(labels.yellow.mocha.hex as '#')
    else if (type === 'info') this.setColor(labels.blue.mocha.hex as '#')
    else if (type === 'default') this.setColor(labels.base.mocha.hex as '#')
    else this.setColor(type)
  }
}

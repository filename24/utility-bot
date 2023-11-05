import { Event } from '@structures/Event'
import Logger from '@utils/Logger'
import { Events } from 'discord.js'
const logger = new Logger('Bot')

export default new Event(
  Events.ClientReady,
  async (client) => {
    logger.info(`Logged ${client.user?.username}`)
  },
  { once: true }
)

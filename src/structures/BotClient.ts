import { PrismaClient } from '@prisma/client'
import {
  Client,
  ClientOptions,
  ClientEvents,
  Collection,
  ActivityType
} from 'discord.js'
import { config as dotenvConfig } from 'dotenv'
import * as Dokdo from 'dokdo'

import Logger from '@utils/Logger'

import { BaseCommand } from '@types'
import { BaseInteraction } from './Interaction.js'
import { Event } from './Event.js'

import config from '../config.js'

import CommandManager from '@managers/CommandManager'
import EventManager from '@managers/EventManager'
import ErrorManager from '@managers/ErrorManager'
import DatabaseManager from '@managers/DatabaseManager'
import InteractionManager from '@managers/InteractionManager'
import { Status } from '@utils/Constants.js'

const logger = new Logger('Bot')

export default class BotClient extends Client {
  public readonly VERSION: string
  public readonly BUILD_NUMBER: string
  public readonly config = config
  public status: Status = Status.Connecting

  public commands: Collection<string, BaseCommand> = new Collection()
  public events: Collection<keyof ClientEvents, Event<keyof ClientEvents>> =
    new Collection()
  public errors: Collection<string, string> = new Collection()
  public interactions: Collection<string | string[], BaseInteraction> =
    new Collection()
  public db!: PrismaClient

  public command: CommandManager = new CommandManager(this)
  public event: EventManager = new EventManager(this)
  public error: ErrorManager = new ErrorManager(this)
  public database: DatabaseManager = new DatabaseManager(this)
  public interaction: InteractionManager = new InteractionManager(this)
  public eval = new Dokdo.Client(this, {
    prefix: this.config.bot.prefix,
    noPerm: async (message) => message.reply('독도는 대한민국 땅이죠'),
    aliases: ['eval', 'dok', 'dokdo', '독도'],
    globalVariable: {
      Status: Status
    }
  })

  public constructor(options: ClientOptions) {
    super(options)

    logger.info('Loading config data...')
    dotenvConfig()

    logger.info('Loading managers...')
    this.event.load()
    this.command.load()
    this.interaction.load()
    this.database.load()

    logger.info('Loading version data...')
    this.VERSION = config.BUILD_VERSION
    this.BUILD_NUMBER = config.BUILD_NUMBER
  }

  public async start(token: string = config.bot.token): Promise<void> {
    logger.info('Logging in bot...')
    await this.login(token).then(() => {
      this.status = Status.Online
      this.setStatus()
    })
  }

  public setStatus(name = '로봇같이 행동하는 안수찬입니다.') {
    logger.info('Changed status to Online mode')

    return this.user?.setPresence({
      activities: [{ name: `엙`, type: ActivityType.Custom, state: name }],
      status: 'online'
    })
  }
}

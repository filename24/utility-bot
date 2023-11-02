import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  ClientOptions,
  ContextMenuCommandInteraction,
  HexColorString,
  Message,
  ModalSubmitInteraction,
  AnySelectMenuInteraction,
  ShardingManagerOptions
} from 'discord.js'
import { ReportType, LevelType } from '@utils/Constants'

export interface ErrorReportOptions {
  executer?:
    | Message<true>
    | ChatInputCommandInteraction<'cached'>
    | ContextMenuCommandInteraction<'cached'>
    | AnySelectMenuInteraction<'cached'>
    | ButtonInteraction<'cached'>
    | ModalSubmitInteraction<'cached'>
    | undefined
  isSend?: boolean
}

export type IConfig = {
  BUILD_VERSION: string
  BUILD_NUMBER: string
  devGuildID: string
  name: string
  githubToken?: string
  repository?: string
} & { logger: LoggerConfig } & { bot: BotConfig } & {
  report: ErrorReportConfig
}

export interface LoggerConfig {
  level: LevelType
  dev: boolean
}

export interface ErrorReportConfig {
  type: ReportType
  webhook: {
    url: string
  }
  text: {
    guildID: string
    channelID: string
  }
}

export interface BotConfig {
  sharding: boolean
  shardingOptions?: ShardingManagerOptions
  options: ClientOptions
  token: string
  owners?: string[]
  prefix: string
  cooldown?: number
}

export type EmbedType =
  | 'default'
  | 'error'
  | 'success'
  | 'warn'
  | 'info'
  | HexColorString

export * from './structures.js'
export * from './command.js'

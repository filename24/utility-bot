import Color from '@structures/Color'
import { SlashCommand } from '@structures/Command'
import { ColorNameHelper } from '@utils/ColorNamer'
import { ColorName } from '@utils/Constants'
import Embed from '@utils/Embed'
import { createRoleSetupEmbed } from '@utils/Utils'
import {
  ActionRowBuilder,
  AuditLogEvent,
  ButtonBuilder,
  ButtonStyle,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  PermissionsBitField,
  Role,
  RoleSelectMenuBuilder,
  SelectMenuComponentOptionData,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} from 'discord.js'

export default new SlashCommand(
  new SlashCommandBuilder()
    .setName('역할세팅')
    .setDescription('역할 자동생성 알고리즘 생성')
    .addChannelOption((data) =>
      data
        .setName('채널')
        .setDescription('역할 메세지 보낼 장소')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .toJSON(),
  async (client, interaction) => {
    if (!interaction.inCachedGuild())
      return interaction.reply('캐싱오류 서버를 캐싱하세요.')

    const channel = interaction.guild?.channels.cache.get(
      interaction.options.getChannel('채널', true).id
    )

    if (!channel?.isTextBased() && !channel?.isDMBased())
      return interaction.reply(
        `${channel?.toString()}는 채팅을 칠수있는 공간이없어요.`
      )

    const roleMessage = await createRoleSetupEmbed(client, interaction)

    channel.send(roleMessage)
  }
)

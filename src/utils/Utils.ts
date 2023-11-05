import BotClient from '@structures/BotClient'
import { Interaction } from 'discord.js'
import { readdirSync, statSync } from 'fs'
import { ColorNameHelper } from '@utils/ColorNamer'
import { ColorName } from '@utils/Constants'
import Embed from '@utils/Embed'
import {
  ActionRowBuilder,
  AuditLogEvent,
  ButtonBuilder,
  ButtonStyle,
  Role,
  SelectMenuComponentOptionData,
  StringSelectMenuBuilder
} from 'discord.js'
import Color from '@structures/Color'

// https://gist.github.com/kethinov/6658166
export const readAllFiles = (dirPath: string, fileList: string[] = []) => {
  const files = readdirSync(dirPath)
  for (const file of files) {
    const filePath = dirPath + '/' + file
    const stat = statSync(filePath)

    if (stat.isFile()) fileList.push(filePath)
    else fileList = readAllFiles(filePath, fileList)
  }

  return fileList
}

export const createRoleSetupEmbed = async (
  client: BotClient,
  interaction: Interaction<'cached'>
) => {
  const auditData = await interaction.guild.fetchAuditLogs({
    type: AuditLogEvent.RoleCreate,
    user: client.user?.id
  })

  const roles: SelectMenuComponentOptionData[] = auditData.entries
    .map((d) => {
      if (d.target instanceof Role)
        return {
          value: d.targetId?.toString() ?? '0',
          label: `${d.target.name}(${
            ColorName[
              ColorNameHelper.getColorName(new Color(`${d.target.hexColor}`))
            ]
          }) by ${d.reason}`
        }
    })
    .filter((d): d is SelectMenuComponentOptionData => d !== undefined)

  if (!roles.length) {
    roles.push({
      label: '없는거같네요...',
      value: 'undefined'
    })
  }
  const description = [
    '역할시스템을 이용한 다양한 색을 커스텀할수있는 기능을 지원하고있습니다.',
    '프로필 색깔 개설하기 버튼을 클릭해 원하는 색깔을 추가해보세요!'
  ].join('\n')

  const embed = new Embed(client, 'default')
    .setTitle('역할 마법사')
    .setDescription(description)

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setCustomId('rolesetup.badge')
      .setStyle(ButtonStyle.Primary)
      .setLabel('뱃지 개설하기 (준비중)')
      .setDisabled(true),
    new ButtonBuilder()
      .setCustomId('rolesetup.color')
      .setStyle(ButtonStyle.Primary)
      .setLabel('프로필 색깔 개설하기'),
    new ButtonBuilder()
      .setCustomId('rolesetup.refresh')
      .setStyle(ButtonStyle.Success)
      .setLabel('새로고침')
  )
  const row1 = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setPlaceholder('프로필 색깔 바꾸기')
      .setCustomId('rolesetup.role')
      .setMaxValues(1)
      .setPlaceholder('프로필 색깔을 선택해주세요.')
      .setOptions(roles)
  )

  return {
    embeds: [embed],
    components: [row, row1]
  }
}

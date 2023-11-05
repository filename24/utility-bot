import { BaseCommand } from '@structures/Command'
import Discord from 'discord.js'
import Embed from '@utils/Embed'
import { SlashCommandBuilder } from '@discordjs/builders'

export default new BaseCommand(
  {
    name: 'ping',
    description: '핑을 측정합니다.',
    aliases: ['핑', '측정', 'vld', '핑좀']
  },
  async (client, message, args) => {
    let embed = new Embed(client, 'warn').setTitle('핑 측정중...')

    let m = await message.reply({
      embeds: [embed]
    })
    embed = new Embed(client, 'success').setTitle('PONG!').addFields([
      {
        name: '메세지 응답속도',
        value: `${Number(m.createdAt) - Number(message.createdAt)}ms`,
        inline: true
      },
      {
        name: 'API 반응속도',
        value: `${client.ws.ping}ms`,
        inline: true
      },
      {
        name: '업타임',
        value: `<t:${(Number(client.readyAt) / 1000) | 0}:R>`,
        inline: true
      }
    ])

    m.edit({
      embeds: [embed]
    })
  }
)

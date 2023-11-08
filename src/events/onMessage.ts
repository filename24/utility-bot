import { Event } from '@structures/Event'
import CommandManager from '@managers/CommandManager'
import ErrorManager from '@managers/ErrorManager'
import { Events, MessagePayload, MessageReplyOptions } from 'discord.js'
import { randomInt } from 'crypto'

export default new Event(Events.MessageCreate, async (client, message) => {
  const commandManager = new CommandManager(client)
  const errorManager = new ErrorManager(client)

  if (message.author.bot) return
  if (!message.inGuild()) return
  if (!message.content.startsWith(client.config.bot.prefix)) return

  const args = message.content
    .slice(client.config.bot.prefix.length)
    .trim()
    .split(/ +/g)
  const commandName = args.shift()?.toLowerCase()
  const command = commandManager.get(commandName as string)

  await client.eval.run(message)

  if (!CommandManager.isMessageCommand(command)) {
    if (message.content.endsWith('?')) {
      const answers = [
        '아마도?',
        '맞아',
        '정답',
        '아닌듯',
        '절대 아님!',
        '그럴수도있고 아닐수도있습니다'
      ]

      const oldAnswer = client.answers.get(message.content)
      const answer = answers[randomInt(answers.length)]

      if (randomInt(5) == oldAnswer?.count ?? 0) {
        setTimeout(
          () => client.answers.delete(message.content),
          1000 * 60 * randomInt(3)
        )

        const data: MessagePayload[] | MessageReplyOptions[] = [
          { content: '그만좀 물어봐라 ㅡㅡ' },
          { content: '그만좀 물어봐라 ㅡㅡ' },
          { content: '그만좀 물어봐라 ㅡㅡ' },
          { content: 'ㅆ 그만좀 물어봐 ;;' },
          { content: 'ㅇㄴ 그만좀 물어봐' },
          { content: '그만좀 물어봐라 ㅡㅡ;;' },
          { stickers: ['1167117034782474270'] }
        ]
        return message.reply(data[randomInt(data.length)])
      }

      message.reply(oldAnswer?.answer ?? answer).then(() => {
        client.answers.set(message.content, {
          answer: oldAnswer?.answer ?? answer,
          count: oldAnswer?.count ?? 0 + 1
        })
      })
    }

    return
  }

  try {
    await command.execute(client, message, args)
  } catch (error: any) {
    errorManager.report(error, { executer: message, isSend: true })
  }
})

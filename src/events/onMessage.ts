import { Event } from '@structures/Event'
import CommandManager from '@managers/CommandManager'
import ErrorManager from '@managers/ErrorManager'
import { Events, MessagePayload, MessageReplyOptions } from 'discord.js'
import { randomInt } from 'crypto'
import { Status } from '@utils/Constants'

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

  if (client.status === Status.Development) return

  if (client.status === Status.Updating)
    return message.reply('# AI 최적화중...\n나중에 다시 시도해주세요!')

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

      let answerData = await client.db.algorithm.findFirst({
        where: {
          message: message.content
        }
      })
      const answer = answers[randomInt(answers.length)]

      if (!answerData) {
        answerData = await client.db.algorithm.create({
          data: {
            answer: answer,
            count: 0 + 1,
            message: message.content
          }
        })
      }

      if (!answerData) return

      if (randomInt(7, 10) <= answerData.count && !answerData.verified) {
        setTimeout(
          () =>
            client.db.algorithm.delete({
              where: {
                id: answerData?.id
              }
            }),
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

      await client.db.algorithm.update({
        where: {
          id: answerData.id
        },
        data: {
          count: answerData.count + 1
        }
      })

      message.reply(answerData.answer)
    }

    return
  }

  try {
    await command.execute(client, message, args)
  } catch (error: any) {
    errorManager.report(error, { executer: message, isSend: true })
  }
})

import { ApplyOptions } from '@sapphire/decorators'
import { Command } from '@sapphire/framework'
import {
  ApplicationIntegrationType,
  AttachmentBuilder,
  ContainerBuilder,
  FileBuilder,
  InteractionContextType,
  SectionBuilder,
  SeparatorSpacingSize,
  TextDisplayBuilder
} from 'discord.js'
import { container as options } from '@sapphire/framework'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const self = await readFile(fileURLToPath(import.meta.url), 'utf8')

@ApplyOptions<Command.Options>({
  description: 'ping pong'
})
export class UserCommand extends Command {
  public override registerApplicationCommands(registry: Command.Registry) {
    const integrationTypes: ApplicationIntegrationType[] = [
      ApplicationIntegrationType.GuildInstall,
      ApplicationIntegrationType.UserInstall
    ]
    const contexts: InteractionContextType[] = [
      InteractionContextType.BotDM,
      InteractionContextType.Guild,
      InteractionContextType.PrivateChannel
    ]

    // Register Chat Input command
    registry.registerChatInputCommand({
      name: this.name,
      description: this.description,
      integrationTypes,
      contexts
    })
  }

  // Chat Input (slash) command
  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction
  ) {
    return this.sendPing(interaction)
  }

  private async sendPing(
    interactionOrMessage: Command.ChatInputCommandInteraction
  ) {
    const container = new ContainerBuilder()

    const pingContent = new TextDisplayBuilder().setContent(
      ['# Ping? 🏓', 'Please wait...'].join('\n')
    )

    container.addTextDisplayComponents(pingContent)

    const pingMessage = await interactionOrMessage.reply({
      flags: 'IsComponentsV2',
      components: [container]
    })

    if (!pingMessage) return

    const pongSection = new SectionBuilder()
      .addTextDisplayComponents(
        new TextDisplayBuilder().setContent(
          [
            '# Pong!',
            `Bot Latency ${Math.round(this.container.client.ws.ping)}ms.`,
            `API Latency ${pingMessage.createdTimestamp - interactionOrMessage.createdTimestamp}ms`,
            '-# Maybe this server is discord local server'
          ].join('\n')
        )
      )
      .setThumbnailAccessory((builder) =>
        builder
          .setURL(
            options.client.application?.iconURL() ??
              'https://cdn.discordapp.com/avatars/949131762666205235/b39d86c4e62cd15af6cbcad6ddbf4c1c.png'
          )
          .setDescription('This is __filename ')
      )

    container.addSeparatorComponents((sep) =>
      sep.setSpacing(SeparatorSpacingSize.Large)
    )
    container.addSectionComponents(pongSection)

    const file = new FileBuilder().setURL('attachment://source-code.ts')

    container.addFileComponents(file)

    return interactionOrMessage.editReply({
      files: [
        new AttachmentBuilder(Buffer.from(self), { name: 'source-code.ts' })
      ],
      components: [container]
    })
  }
}

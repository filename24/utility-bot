import { Button } from '@structures/Interaction'
import {
  ActionRowBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} from 'discord.js'

export default new Button('rolesetup.color', async (client, interaction) => {
  const modal = new ModalBuilder()
    .setCustomId('role.color')
    .setTitle('프로필 색깔 추가하기!')
    .addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('name')
          .setStyle(TextInputStyle.Short)
          .setLabel('색이름')
          .setPlaceholder('검은색')
      )
    )
    .addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('hexcolor')
          .setLabel('색깔코드 (HEX Color "# 포함")')

          .setMaxLength(7)
          .setPlaceholder('예: #000000')
          .setStyle(TextInputStyle.Short)
          .setValue('#')
      )
    )

  await interaction.showModal(modal)
})

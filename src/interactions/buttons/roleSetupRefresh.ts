import { Button } from '@structures/Interaction'
import { createRoleSetupEmbed } from '@utils/Utils'

export default new Button('rolesetup.refresh', async (client, interaction) => {
  await interaction.deferReply({
    ephemeral: true
  })

  const roleMessage = await createRoleSetupEmbed(client, interaction)

  await interaction.message.edit(roleMessage)

  await interaction.editReply({
    content:
      '# 성공!\n성공적으로 새로고침했어요 다시 역할 선택창을 클릭해보세요!'
  })
})

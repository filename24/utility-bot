import { Modal } from '@structures/Interaction'
import { createRoleSetupEmbed } from '@utils/Utils'

export default new Modal('role.color', async (client, interaction) => {
  const name = interaction.fields.getTextInputValue('name')
  const color = interaction.fields.getTextInputValue('hexcolor') as `#${string}`

  await interaction.deferReply({ ephemeral: true })
  const headerRole = interaction.guild.roles.cache.get('1170663943702847570')

  if (!headerRole)
    return interaction.editReply(
      '헤더 역할을 찾기못했습니다. 캐싱을 시도해주세요.'
    )

  await interaction.guild.roles
    .create({
      name,
      color,
      position: headerRole.position,
      reason: interaction.user.username
    })
    .then(async (role) => {
      const roleMessage = await createRoleSetupEmbed(client, interaction)

      await interaction.message?.edit(roleMessage)

      interaction.editReply(
        `# 성공\n성공적으로 ${role.toString()} 역할을 만들었어요!\n역할 선택창에 가셔서 역할을 선택해보세요!`
      )
    })
    .catch((e) => {
      console.log(e)
      interaction.editReply(
        '# 실패...\n HEX Color 값이 올바르지 않아요... 혹시 6자리 다 하신거 맞죠?'
      )
    })
})

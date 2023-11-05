import { SelectMenu } from '@structures/Interaction'
import { AuditLogEvent, Role } from 'discord.js'

export default new SelectMenu('rolesetup.role', async (client, interaction) => {
  if (!interaction.isStringSelectMenu()) return

  const roleId = interaction.values[0]

  await interaction.deferReply({ ephemeral: true })

  const auditData = (
    await interaction.guild.fetchAuditLogs({
      type: AuditLogEvent.RoleCreate,
      user: client.user?.id
    })
  ).entries.map((data) => data.target as Role)

  await interaction.member.roles.remove(auditData.map((d) => d.id))

  await interaction.member.roles.add(
    ['1170663943702847570', roleId],
    interaction.user.username
  )

  await interaction.editReply('# 성공!\n성공적으로 역할을 추가했어요!!')
})

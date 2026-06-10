const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getInviterJoins, getInvitesByUser } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invites')
    .setDescription('Check invite count for a user')
    .addUserOption(opt =>
      opt.setName('user').setDescription('User to check').setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const target = interaction.options.getUser('user') || interaction.user;
    const joins = getInviterJoins(target.id);
    const inviteList = getInvitesByUser(target.id);

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('📨 Invite Stats')
      .addFields(
        { name: 'User', value: `<@${target.id}>`, inline: true },
        { name: 'Total Joins', value: String(joins), inline: true },
        { name: 'Active Invites', value: String(inviteList.length), inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

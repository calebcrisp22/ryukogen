const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getAllUsers, updateUser } = require('../database');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetallplustime')
    .setDescription('Reset plus time for ALL users (owner only)'),

  async execute(interaction) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    const users = getAllUsers();
    for (const user of users) updateUser(user.id, { plus_time: 0 });

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('🔄 All Plus Time Reset')
      .setDescription(`Plus time reset for **${users.length}** users.`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

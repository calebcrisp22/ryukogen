const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { resetInviterJoins } = require('../database');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetjoins')
    .setDescription('Reset invite join count for a user (owner only)')
    .addUserOption(opt =>
      opt.setName('user').setDescription('Target user').setRequired(true)
    ),

  async execute(interaction) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    const target = interaction.options.getUser('user');
    resetInviterJoins(target.id);

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('🔄 Joins Reset')
      .setDescription(`Invite join count reset for <@${target.id}>.`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

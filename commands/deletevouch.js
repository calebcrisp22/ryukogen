const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { deleteVouch } = require('../database');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deletevouch')
    .setDescription('Delete a vouch by ID (owner only)')
    .addIntegerOption(opt =>
      opt.setName('id').setDescription('Vouch ID').setRequired(true)
    ),

  async execute(interaction) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    const id = interaction.options.getInteger('id');
    const changes = deleteVouch(id);

    if (changes === 0) return interaction.editReply(`❌ Vouch #${id} not found.`);

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('🗑️ Vouch Deleted')
      .setDescription(`Vouch #${id} has been removed.`)
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

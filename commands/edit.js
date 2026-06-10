const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { setConfig } = require('../database');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('edit')
    .setDescription('Edit bot configuration (owner only)')
    .addStringOption(opt =>
      opt.setName('setting')
        .setDescription('Setting to edit')
        .setRequired(true)
        .addChoices(
          { name: 'Bot Name', value: 'bot_name' },
          { name: 'Vouch Channel', value: 'vouch_channel' },
          { name: 'Log Channel', value: 'log_channel' },
          { name: 'Welcome Message', value: 'welcome_message' }
        )
    )
    .addStringOption(opt =>
      opt.setName('value')
        .setDescription('New value (use channel ID for channels)')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    const setting = interaction.options.getString('setting');
    const value = interaction.options.getString('value');
    setConfig(setting, value);

    const embed = new EmbedBuilder()
      .setColor(0x57F287)
      .setTitle('✅ Config Updated')
      .addFields(
        { name: 'Setting', value: setting, inline: true },
        { name: 'Value', value: value, inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

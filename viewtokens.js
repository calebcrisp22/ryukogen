const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('viewtokens')
    .setDescription('View your token balance')
    .addUserOption(opt =>
      opt.setName('user').setDescription('User to check (admin only)').setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const target = interaction.options.getUser('user') || interaction.user;
    const user = getUser(target.id);

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('🪙 Token Balance')
      .addFields(
        { name: 'User', value: `<@${target.id}>`, inline: true },
        { name: 'Tokens', value: String(user.tokens), inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

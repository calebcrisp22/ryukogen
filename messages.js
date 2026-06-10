const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getUser } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('messages')
    .setDescription('Check message count for a user')
    .addUserOption(opt =>
      opt.setName('user').setDescription('User to check').setRequired(false)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const target = interaction.options.getUser('user') || interaction.user;
    const user = getUser(target.id);

    const embed = new EmbedBuilder()
      .setColor(0x5865F2)
      .setTitle('💬 Message Count')
      .addFields(
        { name: 'User', value: `<@${target.id}>`, inline: true },
        { name: 'Messages', value: String(user.messages), inline: true }
      )
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

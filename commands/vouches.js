const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getVouches } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vouches')
    .setDescription('View recent vouches'),

  async execute(interaction) {
    await interaction.deferReply();

    const vouches = getVouches(10);
    if (vouches.length === 0) {
      return interaction.editReply({ content: '📭 No vouches yet.' });
    }

    const lines = vouches.map(v => {
      const stars = '⭐'.repeat(v.stars);
      return `${stars} — <@${v.user_id}> (ID: ${v.id})\n> ${v.content}`;
    });

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('⭐ Recent Vouches')
      .setDescription(lines.join('\n\n').substring(0, 4096))
      .setFooter({ text: `${vouches.length} vouches shown • Generator` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getInviterLeaderboard } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('inviteleaderboard')
    .setDescription('View the top inviters leaderboard'),

  async execute(interaction) {
    await interaction.deferReply();

    const top = getInviterLeaderboard();
    if (top.length === 0) {
      return interaction.editReply({ content: '📭 No invite data yet.' });
    }

    const medals = ['🥇', '🥈', '🥉'];
    const lines = top.map((row, i) =>
      `${medals[i] || `**${i + 1}.**`} <@${row.inviter_id}> — **${row.count}** joins`
    );

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('🏆 Invite Leaderboard')
      .setDescription(lines.join('\n'))
      .setFooter({ text: 'Generator' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

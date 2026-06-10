const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('refreshinvites')
    .setDescription('Refresh the invite cache (owner only)'),

  async execute(interaction, client) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    try {
      const invites = await interaction.guild.invites.fetch();
      const cache = new Map(invites.map(i => [i.code, i.uses]));
      if (!client.inviteCache) client.inviteCache = new Map();
      client.inviteCache.set(interaction.guild.id, cache);

      const embed = new EmbedBuilder()
        .setColor(0x57F287)
        .setTitle('✅ Invite Cache Refreshed')
        .addFields({ name: 'Cached Invites', value: String(invites.size), inline: true })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (err) {
      await interaction.editReply(`❌ Failed to refresh: ${err.message}`);
    }
  }
};

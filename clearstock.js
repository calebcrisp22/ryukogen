const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { clearStock } = require('../database');
const { ownerOnly } = require('../utils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearstock')
    .setDescription('Clear stock for a category or all (owner only)')
    .addStringOption(opt =>
      opt.setName('category')
        .setDescription('Category to clear (leave blank to clear ALL)')
        .setRequired(false)
        .addChoices(
          { name: 'Free', value: 'free' },
          { name: 'Free+', value: 'free+' },
          { name: 'Premium', value: 'premium' }
        )
    ),

  async execute(interaction) {
    if (!ownerOnly(interaction)) return;
    await interaction.deferReply({ ephemeral: true });

    const category = interaction.options.getString('category') || null;
    const removed = clearStock(category);

    const embed = new EmbedBuilder()
      .setColor(0xED4245)
      .setTitle('🗑️ Stock Cleared')
      .setDescription(category ? `Cleared stock for **${category}**.` : 'Cleared **all** stock.')
      .addFields({ name: 'Accounts Removed', value: String(removed), inline: true })
      .setFooter({ text: 'Generator' })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};

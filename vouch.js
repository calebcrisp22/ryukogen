const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { addVouch, getConfig } = require('../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vouch')
    .setDescription('Leave a vouch for the generator service')
    .addStringOption(opt =>
      opt.setName('message')
        .setDescription('Your vouch message')
        .setRequired(true)
        .setMaxLength(500)
    )
    .addIntegerOption(opt =>
      opt.setName('stars')
        .setDescription('Star rating (1-5)')
        .setRequired(false)
        .setMinValue(1)
        .setMaxValue(5)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const message = interaction.options.getString('message');
    const stars = interaction.options.getInteger('stars') ?? 5;

    const id = addVouch(interaction.user.id, message, stars);
    const starStr = '⭐'.repeat(stars);

    const embed = new EmbedBuilder()
      .setColor(0xFEE75C)
      .setTitle('⭐ New Vouch')
      .setDescription(`**${starStr}**\n\n${message}`)
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
      .setFooter({ text: `Vouch #${id} • Generator` })
      .setTimestamp();

    const vouchChannelId = getConfig('vouch_channel');
    if (vouchChannelId && vouchChannelId !== interaction.channelId) {
      try {
        const ch = await interaction.guild.channels.fetch(vouchChannelId);
        await ch.send({ embeds: [embed] });
        await interaction.editReply({ content: '✅ Your vouch has been submitted!', ephemeral: true });
      } catch {
        await interaction.editReply({ embeds: [embed] });
      }
    } else {
      await interaction.editReply({ embeds: [embed] });
    }
  }
};

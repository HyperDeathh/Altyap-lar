const { EmbedBuilder } = require('discord.js');

exports.run = async (client, message, args) => {
    if (!args[0] || !args[1]) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription('Lütfen bir resim linki ve emoji adı belirtin.')
  
      return message.channel.send({ embeds: [embed] });
    }
  
    const link = args[0];
    const name = args[1];
  
    try {
      const emoji = await message.guild.emojis.create(link, name);
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription(`${emoji.name} adlı emoji başarıyla eklendi!`)
        .setThumbnail(emoji.url);
  
      return message.channel.send({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setColor('#0099ff')
        .setDescription('Bir hata oluştu. Emoji eklenemedi.')
  
      return message.channel.send({ embeds: [embed] });
    }
  };

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['emote', 'emoji', 'emot']
};

exports.help = {
  name: 'emoji-ekle',
  description: 'Hızlı emoji eklersiniz.',
  usage: 'emoji-ekle'
};

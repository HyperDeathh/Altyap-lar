const Discord = require('discord.js');
const fetch = require('node-fetch');

const apiKey = 'YOUR_TENOR_API_KEY'; // Tenor API anahtarını buraya girin
const searchQuery = 'slap'; // Kullanmak istediğiniz GIF etiketi

exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();

  if (user) {
    try {
      const response = await fetch(`https://api.tenor.com/v1/random?key=${apiKey}&q=${searchQuery}&limit=1`);
      const data = await response.json();
      const gifUrl = data.results[0].media[0].gif.url;

      const embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`${message.author} tarafından ${user} kullanıcısı tokatlandı!`)
        .setImage(gifUrl);

      message.channel.send(embed);
    } catch (error) {
      console.error('Tenor API hatası:', error);
      message.channel.send('Bir hata oluştu. Daha sonra tekrar deneyin.');
    }
  } else {
    message.channel.send('Lütfen bir kullanıcıyı etiketleyin!');
  }
};

exports.conf = {
  aliases: ["tokat"],
};

exports.help = {
  name: "tokatla",
};

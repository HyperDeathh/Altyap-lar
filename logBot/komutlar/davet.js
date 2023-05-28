const { MessageEmbed } = require('discord.js')
exports.run = async (client, message, args) => {
const davetLinki = 'https://discord.com/api/oauth2/authorize?client_id=1112314108109406269&permissions=8&scope=bot';

    const embed = new MessageEmbed()
      .setTitle('Botu Davet Et')
      .setDescription('[Beni davet etmek için tıklayınız](' + davetLinki + ')');

    message.channel.send(embed);
}

exports.conf = {
    aliases: ['davet']
  }
  
  exports.help = {
    name: "invite"
  };
const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const guildCount = client.guilds.cache.size;
    const memberCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    message.channel.send(`${guildCount} Sunucu da varım. \n${memberCount} kişi kullanıcım var.`);
}
exports.conf = {
  aliases: ['bilgi', 'stat']
};

exports.help = {
  name: "statistic"
};

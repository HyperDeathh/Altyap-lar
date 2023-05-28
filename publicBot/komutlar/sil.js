const Discord = require('discord.js');
exports.run = function(client, message, args) {
  if (!message.member.permissions.has("MANAGE_MESSAGES"))
  return message.reply({ content: "> :x: **Başarısız!** Sil yetkin yok dostum." }).catch((err) => {});if(!args[0]) return message.channel.send("🚫 **Lütfen Silinicek Mesaj Miktarını Yazın.!** 🚫");
message.channel.bulkDelete(args[0]).then(() => {
  message.channel.send(` ${args[0]} Adet Mesajı Sildim. ✅`).then(msg => msg.delete(5000));
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sil'],
  permLevel: 0
};

exports.help = {
  name: 'sil',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'sil'
};
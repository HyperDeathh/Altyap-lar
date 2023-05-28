const { MessageEmbed } = require('discord.js');
const { JsonDatabase } = require('five.db');
const db = new JsonDatabase();
const sifre = require('./ppLog')
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD"))
  return message.reply({ content: ":x: **Başarısız!** Sunucuyu yönet yetkin yok dostum." }).catch((err) => {});
  const prefix = '.';
  const guildId = message.guild.id;
  const threadLog = db.get(`threadLog_${guildId}`);
  const webhookLog = db.get(`webhookLog_${guildId}`)
  const mesajLog = db.get(`mesajLog_${guildId}`);
  const kanalLog = db.get(`kanalLog_${guildId}`);
  const banLog = db.get(`banLog_${guildId}`);
  const rolLog = db.get(`rolLog_${guildId}`);
  const ppLog = db.get(`ppLog_${sifre}`);
  const voiceLog = db.get(`voiceLog_${guildId}`);
  const reactLog = db.get(`reactLog_${guildId}`);
  const emojiLog = db.get(`emojiLog_${guildId}`);
  const linkLog = db.get(`linkLog_${guildId}`);
  const commands = [
      { name: `Mesaj Log Kanal`, id: mesajLog },
      { name: `Kanal Log Kanal`, id: kanalLog },
      { name: `Ban Log Kanal`, id: banLog },
      { name: `Rol Log Kanal`, id: rolLog },
      { name: `Profil Fotoğrafı Log Kanal (gözükmez)`, description: 'Eğer yoksa Rhaegar#7777 iletişime geçin!' },
      { name: `Ses Log Kanal`, id: voiceLog },
      { name: `Tepki Log Kanal`, id: reactLog },
      { name: `Emoji Log Kanal`, id: emojiLog },
      { name: `Link Log Kanal`, id: linkLog },
      { name: `Thread Log kanal (BAKIM)`},
      { name: `Webhook Log kanal (BAKIM)`}
  ];

  if (!args[0]) {
      const embed = new MessageEmbed()
          .setColor('#00FF00')
          .setTitle('Log için Belirlenen Kanallar')
          .setDescription(`Aşağıda loglar ve belirlediğiniz kanalların listesi görüntülenmektedir.`)
          .setFooter(`Prefix: ${prefix}`);

      commands.forEach((command) => {
          const channel = client.channels.cache.get(command.id);
          const description = channel ? `<#${command.id}>` : 'Kanal eklenmemiş';
          embed.addField(`${command.name}`, description);
      });

      return message.channel.send(embed);
  }
};
exports.conf = {
  aliases: ['loglar', 'logkanal']
}

exports.help = {
  name: "logkanallar"
};
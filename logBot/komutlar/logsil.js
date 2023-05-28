const { JsonDatabase } = require('five.db');
const db = new JsonDatabase();

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("MANAGE_GUILD"))
    return message.reply({ content: ":x: **Başarısız!** Sunucuyu yönet yetkin yok dostum." }).catch((err) => {});
  const guildid = message.guild.id;
  const logTypes = {
    kanallog: 'kanalLog',
    emojilog: 'emojiLog',
    banlog: 'banLog',
    sunuculog: 'sunucuLog',
    linklog: 'linkLog',
    tepkilog: 'reactLog',
    durumlog: 'presenceLog',
    rollog: 'rolLog',
    voicelog: 'voiceLog',
    webhooklog: 'webhookLog',
    threadlog: 'threadLog'
  };

  const logToDelete = args[0]?.toLowerCase();

  if (!logToDelete) {
    return message.channel.send('Lütfen silmek istediğiniz log türünü belirtin.');
  }

  const logType = logTypes[logToDelete];

  if (!logType) {
    return message.channel.send('Geçersiz log türü. Lütfen doğru bir log türü belirtin.');
  }

  db.delete(`${logType}_${guildid}`);

  message.channel.send(`${logType} artık kullanılmayacak.`);
};

exports.conf = {
  aliases: ['logtemizle', 'logkaldır']
};

exports.help = {
  name: "logsil"
};

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

  for (const logTypeKey in logTypes) {
    const logType = logTypes[logTypeKey];
    db.delete(`${logType}_${guildid}`);
  }

  message.channel.send('Tüm log kanalları silindi.');
};

exports.conf = {
  aliases: ['tumlogsil', 'loglarisil']
};

exports.help = {
  name: "tümlogsil"
};

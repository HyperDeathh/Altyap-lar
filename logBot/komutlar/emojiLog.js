const { JsonDatabase } = require('five.db');
const db = new JsonDatabase();
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD"))
  return message.reply({ content: ":x: **Başarısız!** Sunucuyu yönet yetkin yok dostum." }).catch((err) => {});
  // Komutun kullanıldığı sunucunun kimliğini al
  const guildid = message.guild.id;

  // Kanalın kimliği veya etiketi olarak girilen ilk argümanı al
  const kanalArg = args[0];

  // Eğer ilk argüman etiket ise, kanalın kimliğini al
  let emojiLog;
  if (message.mentions.channels.size) {
    emojiLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    emojiLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!emojiLog) {
    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.');
  }

  // guildid ve emojiLog değerlerini veritabanına kaydet
  db.set(`emojiLog_${guildid}`, emojiLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Emoji log kanalı ${message.guild.channels.cache.get(emojiLog)} olarak ayarlandı.`);
};
exports.conf = {
  aliases: ['ela']
}

exports.help = {
  name: "emoji-log-ayarla"
};
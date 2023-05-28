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
  let banLog;
  if (message.mentions.channels.size) {
    banLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    banLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!banLog) {
    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.');
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`banLog_${guildid}`, banLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Ban log kanalı ${message.guild.channels.cache.get(banLog)} olarak ayarlandı.`);
};
exports.conf = {
  aliases: ['bla']
}

exports.help = {
  name: "ban-log-ayarla"
};
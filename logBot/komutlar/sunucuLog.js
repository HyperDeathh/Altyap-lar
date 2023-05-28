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
  let sunucuLog;
  if (message.mentions.channels.size) {
    sunucuLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    sunucuLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!sunucuLog) {
    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.');
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`sunucuLog_${guildid}`, sunucuLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Sunucu log kanalı ${message.guild.channels.cache.get(sunucuLog)} olarak ayarlandı.`);
};
exports.conf = {
  aliases: ['sula']
}

exports.help = {
  name: "sunucu-log-ayarla"
};
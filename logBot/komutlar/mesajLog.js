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
  let mesajLog;
  if (message.mentions.channels.size) {
    mesajLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    mesajLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!mesajLog) {
    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.');
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`mesajLog_${guildid}`, mesajLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Mesaj log kanalı ${message.guild.channels.cache.get(mesajLog)} olarak ayarlandı.`);
};
exports.conf = {
  aliases: ['mla']
}

exports.help = {
  name: "mesaj-log-ayarla"
};
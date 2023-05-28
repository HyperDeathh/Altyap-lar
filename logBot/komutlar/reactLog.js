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
  let reactLog;
  if (message.mentions.channels.size) {
    reactLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    reactLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!reactLog) {
    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.');
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`reactLog_${guildid}`, reactLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Tepki log kanalı ${message.guild.channels.cache.get(reactLog)} olarak ayarlandı.`);
};
exports.conf = {
  aliases: ['tla']
}

exports.help = {
  name: "tepki-log-ayarla"
};
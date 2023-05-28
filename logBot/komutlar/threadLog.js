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
  let threadLog;
  if (message.mentions.channels.size) {
    threadLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    threadLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!threadLog) {
    return message.channel.send('Bu komut şuanda bakımdadır. Bakımdan sonra tekrar deneyiniz.');
    //    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.'); bunla değişecek
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`threadLog_${guildid}`, threadLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Bu komut şuanda bakımdadır. Bakımdan sonra tekrar deneyiniz.`);
  //   message.channel.send(`Thread log kanalı ${message.guild.channels.cache.get(threadLog)} olarak ayarlandı.`); bunla değişecek
};
exports.conf = {
  aliases: ['tla']
}

exports.help = {
  name: "thread-log-ayarla"
};
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
  let webhookLog;
  if (message.mentions.channels.size) {
    webhookLog = message.mentions.channels.first().id;
  }

  // Eğer ilk argüman kimlik ise, doğrudan kullan
  if (/^\d+$/.test(kanalArg)) {
    webhookLog = kanalArg;
  }

  // Eğer kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
  if (!webhookLog) {
    return message.channel.send('Bu komut şuanda bakımdadır. Bakımdan sonra tekrar deneyiniz.');
    //    return message.channel.send('Lütfen bir kanal etiketi veya kimliği belirtin.'); bunla değişecek
  }

  // guildid ve mesajLog değerlerini veritabanına kaydet
  db.set(`webhookLog_${guildid}`, webhookLog);

  // Kullanıcıya geri bildirim ver
  message.channel.send(`Bu komut şuanda bakımdadır. Bakımdan sonra tekrar deneyiniz.`);
  //   message.channel.send(`Webhook log kanalı ${message.guild.channels.cache.get(webhookLog)} olarak ayarlandı.`); bunla değişecek
};
exports.conf = {
  aliases: ['wla']
}

exports.help = {
  name: "webhook-log-ayarla"
};
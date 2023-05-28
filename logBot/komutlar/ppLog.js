const { JsonDatabase } = require('five.db');
const db = new JsonDatabase();
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MANAGE_GUILD"))
  return message.reply({ content: ":x: **Başarısız!** Sunucuyu yönet yetkin yok dostum." }).catch((err) => {});
    // Kanalın etiketini al
    const kanalArg = args[0];
  
    // Şifreyi al
    const sifre = args[1];
  
    // Eğer kanal etiketi belirlenemezse, kullanıcıya hata mesajı gönder
    if (!kanalArg) {
      return message.channel.send('Lütfen bir kanal etiketi  ve kullanıcı adı ve tagınızı belirtin.');
    }
  
    // Eğer şifre belirlenemezse, kullanıcıya hata mesajı gönder
    if (!sifre) {
      return message.channel.send('Lütfen bir şifre belirtin. **Örnek:** .pla #kanal Rhaegar#7777');
    }
  
    // Kanalın kimliğini al
    const ppLog = message.mentions.channels.first().id;
  
    // Kanal kimliği belirlenemezse, kullanıcıya hata mesajı gönder
    if (!ppLog) {
      return message.channel.send('Belirtilen kanal bulunamadı.');
    }
  
    // Şifre bazında pp log kanalını kaydet
    db.set(`ppLog_${sifre}`, ppLog);
  
    // Kullanıcıya geri bildirim ver
    message.channel.send(`PP log kanalı ${message.guild.channels.cache.get(ppLog)} olarak ayarlandı. Kullanıcı: ${sifre}`);
  };
  
  exports.conf = {
    aliases: ['pla']
  };
  
  exports.help = {
    name: "pp-log-ayarla"
  };
  
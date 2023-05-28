const ALLOWED_USERS = ['799976479030247435'];

exports.run = async (client, message, args) => {
  // DM gönderilecek kullanıcıyı ve mesajı belirleyin
  if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işleme

  const user = client.users.cache.get(args[0].replace(/\D+/g, ''));
  const msg = args.slice(1).join(' ');

  // Doğru kullanımı kontrol edin
  if (!user || !msg) {
    return message.reply(`Geçersiz kullanım! Kullanım: \`.dm @kullanıcı/id <mesaj>\``);
  }

  // Kullanıcının DM'ine mesaj gönderin
  user.send(msg);
};

exports.conf = {
    aliases: []
  };
  
  exports.help = {
    name: "dm"
  };
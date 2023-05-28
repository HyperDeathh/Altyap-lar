exports.run = async (client, message, args) => {
    const allowedRoleId = '1041675433038594128'; // İzin verilen rolün ID'sini buraya girin
    const newName = args[0];
    const member = message.member;

    if (!member.roles.cache.has(allowedRoleId)) {
        message.reply('Bu komutu kullanmak için sunucuya boost basmanız gerekiyor!');
        message.react("1109175972357472388");
        return;
    }

    if (!newName) {
      message.reply('Lütfen bir isim girin!');
      return;
    }

  
    member.setNickname(`${newName}`)
      .then(() => {
        message.reply(`İsminiz değiştirildi: ${newName}`);
        message.react("1109175406231306251");
      })
      .catch(error => {
        console.error('İsim değiştirilirken bir hata oluştu:', error);
        message.reply('İsim değiştirilirken bir hata oluştu.');
      });
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['z', 'b'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'zengin',
    description: 'Belirlenen miktarda mesajı siler.',
    usage: 'sil'
  };
  
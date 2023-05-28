const discord = require('discord.js');
const ayarlar = require('./ayarlar.json');
const fs = require('fs');
const orioDB = require("orio.db");
const mongoose = require('mongoose');
const { JsonDatabase } = require('five.db');
const db = new JsonDatabase();
const { MessageEmbed } = require('discord.js');



//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`.help / Log`, { type:'PLAYING' })
  
  console.log(`Logged in ${client.user.tag}`)
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};
client.login(ayarlar.token)

//-----------------------KOMUTLAR-----------------------\\

client.on('messageUpdate', async (oldMessage, newMessage) => {
  // Eğer mesaj DM'den geliyorsa, kaydedilmeyecektir
  if (!newMessage.guild) return;

  // guildid'yi alın
  const guildid = newMessage.guild.id;

  // mesaj log kanalını getir
  const mesajLog = db.get(`mesajLog_${guildid}`);

  // eğer mesaj log kanalı yoksa kaydedilmez
  if (!mesajLog) return;

  // eğer mesajın içeriği veya yazarı bot ise kaydedilmez
  if (newMessage.author.bot || oldMessage.content === newMessage.content) return;

  // gömülü mesaj oluştur
  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('Mesaj Güncellendi')
    .setDescription(`Bir mesaj güncellendi! [Mesaja git](${newMessage.url})`)
    .addField('Yazar', `${newMessage.author} (${newMessage.author.tag})`, true)
    .addField('Kanal', `${newMessage.channel} (${newMessage.channel.id})`, true)
    .addField('Önceki Mesaj', oldMessage.content)
    .addField('Güncel Mesaj', newMessage.content)
    .addField(`Silinme Tarihi ${new Date().toLocaleString()}`);

  // mesaj log kanalına gönder
  const channel = newMessage.guild.channels.cache.get(mesajLog);
  if (channel) channel.send(embed);
});
client.on('messageDelete', async (message) => {
  // Eğer mesaj DM'den geliyorsa, kaydedilmeyecektir
  if (!message.guild) return;

  // guildid'yi alın
  const guildid = message.guild.id;

  // mesaj log kanalını getir
  const mesajLog = db.get(`mesajLog_${guildid}`);

  // eğer mesaj log kanalı yoksa kaydedilmez
  if (!mesajLog) return;

  // eğer mesajın içeriği veya yazarı bot ise kaydedilmez
  if (message.author.bot) return;

  // gömülü mesaj oluştur
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('Mesaj Silindi')
    .setDescription(`Bir mesaj silindi!`)
    .addField('Yazar', `${message.author} (${message.author.tag})`, true)
    .addField('Kanal', `${message.channel} (${message.channel.id})`, true)
    .addField('Mesaj', message.content)
    .addField(`Silinme Tarihi ${new Date().toLocaleString()}`);

  // mesaj log kanalına gönder
  const channel = message.guild.channels.cache.get(mesajLog);
  if (channel) channel.send(embed);
});


//--------------------------------------------------

client.on('channelCreate', async (channel) => {
  const guildId = channel.guild.id;
  const kanalLog = db.get(`kanalLog_${guildId}`);

  if (!kanalLog) return;

  const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTitle('Kanal Oluşturuldu')
    .setDescription(`Bir kanal oluşturuldu: ${channel}`)
    .addField('Kanal Adı', channel.name, true)
    .addField('Kanal Türü', channel.type, true)
    .setFooter(`Tarih: ${new Date().toLocaleString()}`);

  const channelToSend = channel.guild.channels.cache.get(kanalLog);
  if (channelToSend) channelToSend.send(embed);
});

client.on('channelDelete', async (channel) => {
  const guildId = channel.guild.id;
  const kanalLog = db.get(`kanalLog_${guildId}`);

  if (!kanalLog) return;

  const embed = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('Kanal Silindi')
    .setDescription(`Bir kanal silindi: ${channel}`)
    .addField('Kanal Adı', channel.name, true)
    .addField('Kanal Türü', channel.type, true)
    .setFooter(`Tarih: ${new Date().toLocaleString()}`);

  const channelToSend = channel.guild.channels.cache.get(kanalLog);
  if (channelToSend) channelToSend.send(embed);
});
client.on('channelUpdate', async (oldChannel, newChannel) => {
  const guildId = newChannel.guild.id;
  const kanalLog = db.get(`kanalLog_${guildId}`);

  if (!kanalLog) return;

  const embed = new Discord.MessageEmbed()
    .setColor('BLUE')
    .setTitle('Kanal Güncellendi')
    .setDescription(`Bir kanal güncellendi: ${newChannel}`)
    .addField('Kanal Adı', newChannel.name, true)
    .addField('Kanal Türü', newChannel.type, true)
    .addField('Önceki Ad', oldChannel.name, true)
    .addField('Önceki Tür', oldChannel.type, true)
    .addField('Güncelleyen Kişi', `${newChannel.guild.members.cache.get(newChannel.guild.me.id).toString()}`)
    .setFooter(`Tarih: ${new Date().toLocaleString()}`);

  const channel = newChannel.guild.channels.cache.get(kanalLog);
  if (channel) channel.send(embed);
});
client.on('channelPinsUpdate', async (channel, time, pinnedMessages) => {
  const kanalLog = db.get(`kanalLog_${channel.guild.id}`);
  if (!kanalLog) return;

  const embed = new MessageEmbed()
    .setColor('BLUE')
    .setTitle('Mesaj Sabitleme Güncellendi')
    .setDescription(`**${channel.name}** \nKanalındaki mesajların sabitleme durumu güncellendi.`)
    .addField('Tarih', new Date(time).toLocaleString())
    .setTimestamp()
    .setFooter(`ID: ${channel.id}`);

  const channelLog = channel.guild.channels.cache.get(kanalLog);
  if (channelLog) channelLog.send(embed);
});

//---------------------------------------------------

// emojiCreate eventi
client.on('emojiCreate', async emoji => {
  const emojiLog = db.get(`emojiLog_${emoji.guild.id}`);
  if (!emojiLog) return;

  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle('Emoji Oluşturuldu')
    .setDescription(`**${emoji}** (${emoji.id}) adlı emoji oluşturuldu.`)
    .addField('Emoji Adı', emoji.name, true)
    .addField('Emoji ID', emoji.id, true)
    .addField('Emoji URL', emoji.url, true)
    .setTimestamp()
    .setFooter(`ID: ${emoji.id}`);

  const channelLog = emoji.guild.channels.cache.get(emojiLog);
  if (channelLog) channelLog.send(embed);
});

// emojiDelete eventi
client.on('emojiDelete', async emoji => {
  const emojiLog = db.get(`emojiLog_${emoji.guild.id}`);
  if (!emojiLog) return;

  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('Emoji Silindi')
    .setDescription(`**${emoji.name}** (${emoji.id}) adlı emoji silindi.`)
    .addField('Emoji Adı', emoji.name, true)
    .addField('Emoji ID', emoji.id, true)
    .addField('Emoji URL', emoji.url, true)
    .setTimestamp()
    .setFooter(`ID: ${emoji.id}`);

  const channelLog = emoji.guild.channels.cache.get(emojiLog);
  if (channelLog) channelLog.send(embed);
});

// emojiUpdate eventi
client.on('emojiUpdate', async (oldEmoji, newEmoji) => {
  const emojiLog = db.get(`emojiLog_${oldEmoji.guild.id}`);
  if (!emojiLog) return;

  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .setTitle('Emoji Güncellendi')
    .setDescription(`**${oldEmoji}** (${oldEmoji.id}) adlı emoji güncellendi.`)
    .addField('Eski Adı', oldEmoji.name, true)
    .addField('Yeni Adı', newEmoji.name, true)
    .addField('Emoji ID', oldEmoji.id, true)
    .addField('Emoji URL', oldEmoji.url, true)
    .setTimestamp()
    .setFooter(`ID: ${oldEmoji.id}`);

  const channelLog = oldEmoji.guild.channels.cache.get(emojiLog);
  if (channelLog) channelLog.send(embed);
});

//-----------------------------------------------

// guildBanAdd eventi
client.on('guildBanAdd', async (guild, user) => {
  const banLog = db.get(`banLog_${guild.id}`);
  if (!banLog) return;

  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_ADD'
  });

  const banLogg = fetchedLogs.entries.first();
  if (!banLog) return;

  const { executor, reason } = banLogg;

  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('Kullanıcı Yasaklandı')
    .setDescription(`**${user.tag}** (${user.id}) adlı kullanıcı yasaklandı.`)
    .addField('Yasağı Koyan', executor.tag, true)
    .addField('Yasağın Sebebi', reason || 'Belirtilmemiş', true)
    .setTimestamp()
    .setFooter(`ID: ${user.id}`);

  const channelLog = guild.channels.cache.get(banLog);
  if (channelLog) channelLog.send(embed);
});

// guildBanRemove eventi
client.on('guildBanRemove', async (guild, user) => {
  const banLog = db.get(`banLog_${guild.id}`);
  if (!banLog) return;

  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: 'MEMBER_BAN_REMOVE'
  });

  const banLogg = fetchedLogs.entries.first();
  if (!banLog) return;

  const { executor } = banLogg;

  const embed = new MessageEmbed()
    .setColor('GREEN')
    .setTitle('Kullanıcının Yasaklaması Kaldırıldı')
    .setDescription(`**${user.tag}** (${user.id}) adlı kullanıcının yasağı kaldırıldı.`)
    .addField('Yasağı Kaldıran', executor.tag, true)
    .setTimestamp()
    .setFooter(`ID: ${user.id}`);

  const channelLog = guild.channels.cache.get(banLog);
  if (channelLog) channelLog.send(embed);
});

//----------------------------------------------

client.on('guildUpdate', async (oldGuild, newGuild) => {
  const sunucuLog = db.get(`sunucuLog_${oldGuild.id}`);
  if (!sunucuLog) return;

  const updatedSettings = [];

  if (oldGuild.name !== newGuild.name) {
    updatedSettings.push({
      name: 'Sunucu İsmi',
      oldValue: oldGuild.name,
      newValue: newGuild.name
    });
  }

  if (oldGuild.iconURL() !== newGuild.iconURL()) {
    updatedSettings.push({
      name: 'Sunucu İkonu',
      oldValue: oldGuild.iconURL({ dynamic: true }),
      newValue: newGuild.iconURL({ dynamic: true })
    });
  }

  if (oldGuild.bannerURL() !== newGuild.bannerURL()) {
    updatedSettings.push({
      name: 'Sunucu Bannerı',
      oldValue: oldGuild.bannerURL({ dynamic: true }),
      newValue: newGuild.bannerURL({ dynamic: true })
    });
  }

  if (oldGuild.region !== newGuild.region) {
    updatedSettings.push({
      name: 'Sunucu Bölgesi',
      oldValue: oldGuild.region,
      newValue: newGuild.region
    });
  }

  if (oldGuild.afkChannelID !== newGuild.afkChannelID) {
    updatedSettings.push({
      name: 'AFK Kanalı',
      oldValue: oldGuild.afkChannelID ? oldGuild.channels.cache.get(oldGuild.afkChannelID).name : 'Yok',
      newValue: newGuild.afkChannelID ? newGuild.channels.cache.get(newGuild.afkChannelID).name : 'Yok'
    });
  }

  if (oldGuild.afkTimeout !== newGuild.afkTimeout) {
    updatedSettings.push({
      name: 'AFK Süresi',
      oldValue: `${oldGuild.afkTimeout / 60} dakika`,
      newValue: `${newGuild.afkTimeout / 60} dakika`
    });
  }

  if (oldGuild.defaultMessageNotifications !== newGuild.defaultMessageNotifications) {
    updatedSettings.push({
      name: 'Varsayılan Mesaj Bildirimleri',
      oldValue: oldGuild.defaultMessageNotifications === 'MENTIONS' ? 'Sadece Bahsedildiğimde' : 'Her Zaman',
      newValue: newGuild.defaultMessageNotifications === 'MENTIONS' ? 'Sadece Bahsedildiğimde' : 'Her Zaman'
    });
  }

  if (oldGuild.systemChannelID !== newGuild.systemChannelID) {
    updatedSettings.push({
      name: 'Sistem Kanalı',
      oldValue: oldGuild.systemChannelID ? oldGuild.channels.cache.get(oldGuild.systemChannelID).name : 'Yok',
      newValue: newGuild.systemChannelID ? newGuild.channels.cache.get(newGuild.systemChannelID).name : 'Yok'
    });
  }

  if (oldGuild.rulesChannelID !== newGuild.rulesChannelID) {
    updatedSettings.push({
      name: 'Kurallar Kanalı',
      oldValue: oldGuild.rulesChannelID ? oldGuild.channels.cache.get(oldGuild.rulesChannelID).name : 'Yok',
      newValue: newGuild.rulesChannelID ? newGuild.channels.cache.get(newGuild.rulesChannelID).name : 'Yok'
    });
  }

  const embed = new MessageEmbed()
    .setColor("BLUE")
    .setTitle("Sunucu Ayarı Güncellendi")
    .setDescription(`**${oldGuild.name}** sunucusunun ayarları güncellendi.`)
    .addFields(
      updatedSettings.map((setting) => {
        return {
          name: setting.name,
          value: `Eski Değer: ${setting.oldValue}\nYeni Değer: ${setting.newValue}`,
        };
      })
    )
    .setTimestamp()
    .setFooter(`ID: ${oldGuild.id}`);

  const channelLog = oldGuild.channels.cache.get(sunucuLog);
  if (channelLog) channelLog.send(embed);
});


//------------------------------------------------

client.on('inviteCreate', async invite => {
  const { guild } = invite;
  const linkLog = db.get(`linkLog_${guild.id}`);
  if (!linkLog) return;

  const embed = new MessageEmbed()
    .setTitle('Davet Oluşturuldu')
    .addField('Davet Kodu', invite.code, true)
    .addField('Davet Linki', invite.url, true)
    .addField('Davet Oluşturan', invite.inviter.tag, true)
    .addField('Kanal', invite.channel.name, true)
    .setTimestamp()
    .setColor('GREEN');

  const channelLog = guild.channels.cache.get(linkLog);
  if (channelLog) channelLog.send(embed);
});

// inviteDelete eventi
client.on('inviteDelete', async invite => {
  const { guild } = invite;
  const linkLog = db.get(`linkLog_${guild.id}`);
  if (!linkLog) return;

  const embed = new MessageEmbed()
    .setTitle('Davet Silindi')
    .addField('Davet Kodu', invite.code, true)
    .addField('Davet Linki', invite.url, true)
    .addField('Kanal', invite.channel.name, true)
    .setTimestamp()
    .setColor('RED');

  const channelLog = guild.channels.cache.get(linkLog);
  if (channelLog) channelLog.send(embed);
});

//-------------------------------------------------

// messageReactionAdd eventi
client.on('messageReactionAdd', async (reaction, user) => {
  if (user.bot) return;

  const reactLog = db.get(`reactLog_${reaction.message.guild.id}`);
  if (!reactLog) return;

  let emojiName;
  if (reaction.emoji.id) { // tepki özel bir emoji ise
    emojiName = `:${reaction.emoji.name}:  `;
  } else { // tepki standart bir emoji ise
    emojiName = reaction.emoji.name;
  }
  const embed = new Discord.MessageEmbed()
    .setTitle('Yeni Bir Tepki Eklendi')
    .setDescription(`"${emojiName}" tepkisi eklendi.`)
    .addField('Mesaj', reaction.message.content)
    .addField('Kanal', reaction.message.channel.name)
    .addField('Ekleyen', user.tag)
    .setColor('GREEN')
    .setTimestamp();

  const channel = reaction.message.guild.channels.cache.get(reactLog);
  if (channel) channel.send(embed);
});

// messageReactionRemove eventi
client.on('messageReactionRemove', async (reaction, user) => {
  if (user.bot) return; // botlardan gelen tepkileri işlememek için kontrol ediyoruz

  const reactLog = db.get(`reactLog_${reaction.message.guild.id}`);
  if (!reactLog) return;

  let emojiName;
  if (reaction.emoji.id) { // tepki özel bir emoji ise
    emojiName = `:${reaction.emoji.name}:  `;
  } else { // tepki standart bir emoji ise
    emojiName = reaction.emoji.name;
  }

  const embed = new Discord.MessageEmbed()
    .setTitle('Bir Tepki Silindi')
    .setDescription(`"${emojiName}" tepkisi silindi.`)
    .addField('Mesaj', reaction.message.content)
    .addField('Kanal', reaction.message.channel.name)
    .addField('Silen', user.tag)
    .setColor('RED')
    .setTimestamp();

  const channel = reaction.message.guild.channels.cache.get(reactLog);
  if (channel) channel.send(embed);
});

// messageReactionRemoveAll eventi
client.on('messageReactionRemoveAll', async message => {
  const reactLog = db.get(`reactLog_${message.guild.id}`);
  if (!reactLog) return;

  const embed = new Discord.MessageEmbed()
    .setTitle('Tepkiler Temizlendi')
    .setDescription(`Tüm tepkiler "${message.content}" mesajından kaldırıldı.`)
    .addField('Kanal', message.channel.name)
    .setColor('YELLOW')
    .setTimestamp();

  const channel = message.guild.channels.cache.get(reactLog);
  if (channel) channel.send(embed);
});

// messageReactionRemoveEmoji eventi
client.on('messageReactionRemoveEmoji', async (reaction) => {
  const reactLog = db.get(`reactLog_${reaction.message.guild.id}`);
  if (!reactLog) return;

  const embed = new Discord.MessageEmbed()
    .setTitle('Tepki Silindi')
    .setDescription(`"${reaction.emoji}" tepkisi "${reaction.message.content}" mesajından kaldırıldı.`)
    .addField('Kanal', reaction.message.channel.name)
    .setColor('ORANGE')
    .setTimestamp();

    const channel = reaction.message.guild.channels.cache.get(reactLog);
    if (channel) channel.send(embed);
  });


//-------------------------------------------------

client.on('presenceUpdate', async (oldPresence, newPresence) => {
  const presenceLog = await db.get(`presenceLog_${newPresence.guild.id}`);
  if (!presenceLog) return;

  const user = newPresence.member.user;
  const activities = newPresence.activities;
  const oldStatus = oldPresence ? oldPresence.status : null;
  const newStatus = newPresence.status;

  // Eğer bir kullanıcının çevrimiçi durumu değiştiyse
  if (oldStatus !== newStatus) {
    const statusMap = {
      online: 'Çevrimiçi',
      idle: 'Boşta',
      dnd: 'Rahatsız Etmeyin',
      offline: 'Çevrimdışı'
    }

    const embed = new Discord.MessageEmbed()
      .setTitle('Kullanıcı Çevrimiçi Durumunu Değiştirdi')
      .setDescription(`${user} kullanıcısı çevrimiçi durumunu değiştirdi.`)
      .addField('Önceki Durum', statusMap[oldStatus], true)
      .addField('Yeni Durum', statusMap[newStatus], true)
      .setColor('BLUE')
      .setTimestamp();

      const channel = newPresence.guild.channels.cache.get(presenceLog);
      if (channel) channel.send(embed);
  }
});

//-------------------------------------------------

// Role Create Eventi
client.on('roleCreate', async (role) => {
  const rolLog = db.get(`rolLog_${role.guild.id}`);
  if (!rolLog) return;


  const embed = new Discord.MessageEmbed()
    .setTitle('Rol Oluşturuldu')
    .setColor('GREEN')
    .addField('Rol İsmi', role.name, true)
    .addField('Rol ID', role.id, true)
    .addField('Oluşturan Yetkili', role.guild.me.displayName)
    .setTimestamp();

    const channel = role.guild.channels.cache.get(rolLog);
    if (channel) channel.send(embed);
});

// Role Delete Eventi
client.on('roleDelete', async (role) => {
  const rolLog = db.get(`rolLog_${role.guild.id}`);
  if (!rolLog) return;

  const embed = new Discord.MessageEmbed()
    .setTitle('Rol Silindi')
    .setColor('RED')
    .addField('Silinen Rol İsmi', role.name, true)
    .addField('Silinen Rol ID', role.id, true)
    .addField('Silen Yetkili', role.guild.me.displayName)
    .setTimestamp();

    const channel = role.guild.channels.cache.get(rolLog);
    if (channel) channel.send(embed);
});

// Role Update Eventi
client.on('roleUpdate', async (oldRole, newRole) => {
  const rolLog = db.get(`rolLog_${oldRole.guild.id}`);
  if (!rolLog) return;

  const embed = new Discord.MessageEmbed()
    .setTitle('Rol Güncellendi')
    .setColor('YELLOW')
    .addField('Eski Rol İsmi', oldRole.name, true)
    .addField('Yeni Rol İsmi', newRole.name, true)
    .addField('Rol ID', oldRole.id)
    .addField('Güncelleyen Yetkili', oldRole.guild.me.displayName)
    .setTimestamp();

    const channel = oldRole.guild.channels.cache.get(rolLog);
    if (channel) channel.send(embed);
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const rolLog = db.get(`rolLog_${newMember.guild.id}`);
  if (!rolLog) return;

  const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
  const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

  const addedRolesText = addedRoles.size > 0 ? addedRoles.map(role => `\`${role.name}\``).join(', ') : 'Verilen rol yok';
  const removedRolesText = removedRoles.size > 0 ? removedRoles.map(role => `\`${role.name}\``).join(', ') : 'Alınan rol yok';

  const embed = new Discord.MessageEmbed()
    .setTitle('Kullanıcının Rolleri Düzenlendi')
    .setDescription(`${newMember} kullanıcısının rolleri güncellendi`)
    .addField('Eklendi', addedRolesText, true)
    .addField('Kaldırıldı', removedRolesText, true)
    .setColor('BLUE')
    .setTimestamp();

    const channel = oldMember.guild.channels.cache.get(rolLog);
    if (channel) channel.send(embed);
});

//-------------------------------------------------

client.on('userUpdate', async (oldUser, newUser) => {
  // Kullanıcının profil fotoğrafı değiştirildi mi kontrol ediyoruz
  if (oldUser.avatar !== newUser.avatar) {
    const logChannelId = 'LOG_CHANNEL_ID'; // Log kanalının ID'si
    const logChannel = client.channels.cache.get(logChannelId); // Kanalı alıyoruz

    if (!logChannel) return;

    const oldAvatarURL = oldUser.displayAvatarURL({ dynamic: true }); // Eski profil fotoğrafının URL'sini alıyoruz
    const newAvatarURL = newUser.displayAvatarURL({ dynamic: true }); // Yeni profil fotoğrafının URL'sini alıyoruz

    const embed = new Discord.MessageEmbed()
      .setTitle('Kullanıcının Profil Fotoğrafı Değiştirildi')
      .setDescription(`${newUser.tag} kullanıcısının profil fotoğrafı değiştirildi.`)
      .addField('Eski Fotoğraf', `[Buradan görüntüle](${oldAvatarURL})`)
      .addField('Yeni Fotoğraf', `[Buradan görüntüle](${newAvatarURL})`)
      .setColor('BLUE')
      .setTimestamp();

      const message = `Eski Fotoğraf: ${oldAvatarURL}\nYeni Fotoğraf: ${newAvatarURL}`;

    logChannel.send(embed); // Mesajı log kanalına gönderiyoruz
    logChannel.send(message); // Mesajı log kanalına gönderiyoruz
  }
});

//-------------------------------------------------

client.on('voiceStateUpdate', (oldState, newState) => {
  const user = newState.member.user;
  const guildId = newState.guild.id;
  const logChannelId = db.get(`voiceLog_${guildId}`);

  if (!logChannelId) return;

  const logChannel = client.channels.cache.get(logChannelId);
  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }));

  if (!oldState.channelID && newState.channelID) {
    // Kullanıcı sese girdi
    embed.setDescription(`**${user.tag}** sese katıldı: \`${newState.channel.name}\``);
  } else if (oldState.channelID && !newState.channelID) {
    // Kullanıcı sesten çıktı
    embed.setDescription(`**${user.tag}** sesten ayrıldı: \`${oldState.channel.name}\``);
  } else if (oldState.channelID && newState.channelID && oldState.channelID !== newState.channelID) {
    // Kullanıcı ses kanalını değiştirdi
    embed.setDescription(`**${user.tag}** ses kanalını değiştirdi: \`${oldState.channel.name}\` ➔ \`${newState.channel.name}\``);
  } else {
    // Diğer durumlar
    return;
  }

  logChannel.send(embed);
});

//-------------------------------------------------

client.on('webhookCreate', async webhook => {
  const guildId = webhook.guild.id;
 //  const logChannel= db.get(`webhookLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Webhook Oluşturuldu')
    .setDescription(`Bir webhook oluşturuldu:\n\n**Ad**: ${webhook.name}\n**Kimlik**: ${webhook.id}`)
    .setTimestamp();

  logChannel.send(embed);
});

client.on('webhookDelete', async webhook => {
  const guildId = webhook.guild.id;
 // const logChannel= db.get(`webhookLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Webhook Silindi')
    .setDescription(`Bir webhook silindi:\n\n**Ad**: ${webhook.name}\n**Kimlik**: ${webhook.id}`)
    .setTimestamp();

  logChannel.send(embed);
});

client.on('webhookUpdate', async (oldWebhook, newWebhook) => {
  const guildId = guild.id;
//   const logChannel= db.get(`webhookLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle('Webhook Düzenlendi')
    .setDescription(`Bir webhook düzenlendi:\n\n**Eski Ad**: ${oldWebhook.name}\n**Yeni Ad**: ${newWebhook.name}\n**Kimlik**: ${newWebhook.id}`)
    .setTimestamp();

  logChannel.send(embed);
});


//-------------------------------------------------

client.on('threadCreate', async thread => {
  const guildId = thread.guild.id;
  const threadLog = db.get(`threadLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Thread Oluşturuldu')
    .setDescription(`Bir thread oluşturuldu:\n\n**Ad**: ${thread.name}\n**Kimlik**: ${thread.id}`)
    .setTimestamp();

    const channel = thread.guild.channels.cache.get(threadLog);
    if (channel) channel.send(embed);
});

client.on('threadDelete', async thread => {
  const guildId = thread.guild.id;
  const threadLog = db.get(`threadLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#ff0000')
    .setTitle('Thread Silindi')
    .setDescription(`Bir thread silindi:\n\n**Ad**: ${thread.name}\n**Kimlik**: ${thread.id}`)
    .setTimestamp();

    const channel = thread.guild.channels.cache.get(threadLog);
    if (channel) channel.send(embed);
});

client.on('threadUpdate', async (oldThread, newThread) => {
  const guildId = newThread.guild.id;
  const threadLog = db.get(`threadLog_${guildId}`);

  if (!logChannel) return;

  const embed = new Discord.MessageEmbed()
    .setColor('#ff9900')
    .setTitle('Thread Düzenlendi')
    .setDescription(`Bir thread düzenlendi:\n\n**Eski Ad**: ${oldThread.name}\n**Yeni Ad**: ${newThread.name}\n**Kimlik**: ${newThread.id}`)
    .setTimestamp();

    const channel = newThread.guild.channels.cache.get(threadLog);
    if (channel) channel.send(embed);
});

//-------------------------------------------------

client.on("ready", async () => {
  const voiceChannelId = "1087453775599521825"; // Kanal ID'sini buraya girin
  const voiceChannel = client.channels.cache.get(voiceChannelId);
  
  if (!voiceChannel) {
    console.error(`Kanal bulunamadı: ${voiceChannelId}`);
    return;
  }
  
  try {
    const connection = await voiceChannel.join();
    console.log(`Bot, ${voiceChannel.name} kanalına başarıyla bağlandı!`);
  } catch (error) {
    console.error(`Ses kanalına bağlanırken bir hata oluştu: ${error}`);
  }
});
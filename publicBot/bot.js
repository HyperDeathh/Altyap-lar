const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const ayarlar = require('./ayarlar.json');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`Rhaegar ❤️ Lunagram`, { type:'PLAYING' })
  
  console.log("SA")
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
client.login("MTEwMjk3NzQwOTM5NDk0MjA2Mw.GxX9DP._KVXTuWY1V5xmmMXAxMh6e2duS-HfyXsft0GKQ")


//-----------------------KOMUTLAR-----------------------\\
client.on('message', msg => {
    let mesajlar = ['s.a', 'sa', 'selam', 'sea', 'selamun aleykum', 'salam', 'selamselam', 'selamselamselam', 'selamün aleyküm', 'slm', 'Selamun aleyküm', 's.a'];
    if (msg.author.bot) return;
    if (msg.author.id === "799976479030247435") return;
    if (mesajlar.includes(msg.content.toLowerCase())) {
      msg.reply('Aleyküm Selam, Hoş geldinn');
    }
  });
  
  client.on('message', message => {
    if (message.author.id === "799976479030247435") {
      if (message.content === "sa") return message.reply("Aleyküm Selam Hoşgeldin Aşkım");
    }
  });
  
  client.on("userUpdate", (oldUser, newUser) => {
    let log = "1086013583223181375";
    if (oldUser.avatarURL() !== newUser.avatarURL())
      client.channels.cache.get(log).send(oldUser.displayAvatarURL());
    if (oldUser.avatarURL() !== newUser.avatarURL())
      client.channels.cache.get(log).send(newUser.displayAvatarURL());
  });
  
  client.on("message", async message => {
  
    let data2 = [
      "gnydn",
      "günaydın",
      "Günaydın",
      "gunaydin",
      "gunaydın",
      "Gunaydın",
      "Gunaydin",
      "gm"
    ];
    if (data2.includes(message.content)) {
      message.reply('Sana da günaydınn canım.');
    }
  
    let data3 = [
      "iyi geceler",
      "iyi akşamlar",
      "iyi gclr",
      "ii geceler",
      "iyi aksamlar",
      "Iyi Geceler",
      "İyi geceler",
      "İyi akşamlar"
    ];
    if (data3.includes(message.content)) {
      message.reply("Saol sana da iyi gecelerr.");
    }
  
  });
  

//--------------------------------------------------

client.on("message", message => {
    if(message.content.toLowerCase() == ".tag") 
    return message.channel.send(`¹⁵⁸`)
});

//---------------------------------------------------

client.on("message" , async msg => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi Afk \nSebep : ${sebep}`))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor('BLACK').setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});
//-----------------------------------------------
client.on('message', async message => {
  
let aktif = await db.fetch(`reklamEngelcodework_${message.channel.id}`)
if (!aktif) return 
  
let reklamlar = ["discord.app", "discord.gg" ,"discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = message.content.slice(" ").split(/ +/g)

if (reklamlar.some(word => message.content.toLowerCase().includes(word))) {
  
if (message.member.hasPermission("BAN_MEMBERS")) return; message.delete()
  
message.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

client.on("messageUpdate", async (oldMsg, newMsg) => {
  
let aktif = await db.fetch(`reklamEngelcodework_${oldMsg.channel.id}`)
if(!aktif) return
  
let reklamlar = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
let kelimeler = newMsg.content.slice(" ").split(/ +/g)

if (reklamlar.some(word => newMsg.content.toLowerCase().includes(word))) {
  
if (newMsg.member.hasPermission("BAN_MEMBERS")) return; newMsg.delete()
  
oldMsg.reply('Reklamları engelliyorum!').then(msg => msg.delete(7000)) 
}
});

//----------------------------------------------
client.on("message", async msg => {
 const i = await db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Heey! Küfür Yasak.').then(nordx => nordx.delete({timeout: 5000}))
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});

client.on("messageUpdate", async msg => {
 const i = db.fetch(`${msg.guild.id}.kufur`)
    if (i) {
        const kufur = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "mal", "sik", "yarrak", "am", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "ak", "amq",];
        if (kufur.some(word => msg.content.includes(word))) {
          try {
            if (!msg.member.permissions.has("BAN_MEMBERS")) {
                  msg.delete();
                          
                      return msg.reply('Yakaladım Seni! Küfür Yasak.').then(nordx => nordx.delete({timeout: 5000}))
            }              
          } catch(err) {
            console.log(err);
          }
        }
    }
    if (!i) return;
});
//------------------------------------------------
client.on('guildMemberAdd', async(member) => {
let mute = member.guild.roles.cache.find(r => r.name === "MUTELİ ROLÜNÜN ADI NEYSE YAZ");
let mutelimi = db.fetch(`muteli_${member.guild.id + member.id}`)
let süre = db.fetch(`süre_${member.id + member.guild.id}`)
if (!mutelimi) return;
if (mutelimi == "muteli") {
member.roles.add(ayarlar.MuteliRol)
 
member.send("Muteliyken Sunucudan Çıktığın için Yeniden Mutelendin!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`muteli_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Muten açıldı.`)
    member.roles.remove('muteli rol id');
  }, (süre));
}
})

//-------------------------------------------------
client.on('guildMemberAdd', async(member) => {
let rol = member.guild.roles.cache.find(r => r.name === "CEZALI ROLÜNÜN ADI NEYSE YAZ");
let cezalımı = db.fetch(`cezali_${member.guild.id + member.id}`)
let sürejail = db.fetch(`süreJail_${member.id + member.guild.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali") {
member.roles.add(ayarlar.JailCezalıRol)
 
member.send("Cezalıyken Sunucudan Çıktığın için Yeniden Cezalı Rolü Verildi!")
 setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
db.delete(`cezali_${member.guild.id + member.id}`)
    member.send(`<@${member.id}> Cezan açıldı.`)
    member.roles.remove('cezalı rol id');
  }, (sürejail));
}
})




client.on('guildMemberAdd', async member => {
const data = require('quick.db')
const asd = data.fetch(`${member.guild.id}.jail.${member.id}`)
if(asd) {
let data2 = await data.fetch(`jailrol_${member.guild.id}`)
let rol = member.guild.roles.cache.get(data2)
if(!rol) return;
let kişi = member.guild.members.cache.get(member.id)
kişi.roles.add(rol.id);
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id)
data.set(`${member.guild.id}.jail.${kişi.id}.roles.${r.id}`, r.id )})
    data.set(`${member.guild.id}.jail.${kişi.id}`)
  const wasted = new Discord.MessageEmbed()
  .setAuthor(member.user.tag, member.user.avatarURL({ dynamic : true }))
  .setColor(`#0x800d0d`)
  .setDescription(`Dostum hadi ama !!! Jaildan Kaçamazsın ikimizde birbirimizi kandırmayalım...!`)
  .setTimestamp()
    member.send(wasted)
} 
  
  
})

//------------------------------------------------
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

const afkUsers = new Map();


client.on('messageCreate', async (message) => {
  if(message.author.id !== '580510859491541002') return;
  // Komutları çalıştırmak için mesajın önek ile başlaması gerektiğini varsayalım
  if (!message.content.startsWith('.')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'afkk') {
    const reason = args.join(' ') || 'Belirtilmedi';
    afkUsers.set(message.author.id, reason);
    message.reply(`Başarıyla afk moduna geçildi. **Sebep: ${reason}**`);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const mentionedUsers = message.mentions.users;
  const replyTarget = message.reference?.resolved?.author ?? null;
  const isTargetAfk = replyTarget ? afkUsers.has(replyTarget.id) : false;

  // Eğer etiketlenen bir kullanıcı afk ise, bu durumu belirten bir mesaj gönder
  if (mentionedUsers.size > 0) {
    const mentionedAfkUsers = message.mentions.users.filter((user) => afkUsers.has(user.id));

    if (mentionedAfkUsers.size > 0) {
      const afkUserList = mentionedAfkUsers
        .map((user) => `${user.username}#${user.discriminator} (${afkUsers.get(user.id)})`)
        .join('\n');
      message.reply(`**Aşağıdaki kullanıcı şu an afk:**\n${afkUserList}`);
    }
  }

  // Eğer mesajı cevaplanan kullanıcı afk ise, bu durumu belirten bir mesaj gönder
  if (isTargetAfk) {
    const afkReason = afkUsers.get(replyTarget.id);
    message.reply(`${replyTarget.username}#${replyTarget.discriminator} **şu an afk:** ${afkReason}`);
  }
});
client.on('messageCreate', async (message) => {
  // Eğer mesaj gönderen kullanıcı afk modunda değilse veya mesaj bir komut ise işlem yapmayız
  if (!afkUsers.has(message.author.id) || message.content.startsWith('.')) return;

  // Mesajı gönderen kullanıcı afk modunda ise, afk modundan çıkartırız
  afkUsers.delete(message.author.id);
  message.reply(`Başarıyla afk modundan çıkıldı. Tekrar hoşgeldin, ${message.author.username}! (.afk)`);
});

const MY_PREFIX = '.';
const ALLOWED_USERS = ['799976479030247435', '580510859491541002'];

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!ALLOWED_USERS.includes(message.author.id)) return;
  if (!message.content.startsWith(MY_PREFIX)) return;
  const args = message.content.slice(MY_PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'yaz') {
    const channelArg = args.shift();
    const channel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.name === channelArg);
    if (!channel) return message.reply('Lütfen bir kanal etiketleyin veya kanal adını doğru yazdığınızdan emin olun.');
    const content = args.join(' ');
    if (!content) return message.reply('Lütfen bir mesaj içeriği belirtin.');
    try {
      await channel.send(content);
      message.reply(`Mesaj başarıyla ${channel} kanalına gönderildi.`);
    } catch (error) {
      console.error(error);
      message.reply('Bir hata oluştu, mesaj gönderilemedi.');
    }
  }
});

const quotes = [
  "**Dünya çok acı çekiyor, kötü insanların şiddetinden değil, iyi insanların sessizliğinden**",
  "**Çoluk çocuk işte az bişi aklî dengesi yerinde olsa Allah'a mı söver**",
  "**Allah'a söven ağır karaktersizdir bu arada ya**",
  "Seni sevmenin güzelliği ile başa çıkamıyorum!",
  "Seni tanımak hayatımın en iyi kararlarından biri!",
  "Seni gördüğümde her zaman kalbim hoplar!",
  "Seni düşünmek bile beni mutlu ediyor!",
  "Sana her şeyimi anlatabilirim!",
  "Seni düşündükçe içimde güneş açıyor!",
  "Seni düşünmek benim için bir zevk!",
  "Seni sevmenin mutluluğu her şeyi aşar!",
  "Seni her zaman özleyeceğim!",
  "Seni seviyorum ve her zaman seninleyim!",
  "Seni düşündükçe dünya daha güzel görünüyor!",
  "Seni düşünmek bana huzur veriyor!",
  "Seni seviyorum, hayatımda olduğun için teşekkür ederim!",
  "Seni sevmek benim en sevdiğim şey!",
  "Seni düşündükçe kalbimdeki sıcaklık artıyor!",
  "Seni sevmenin güzelliğini anlatmam imkansız!",
  "Seni sevmenin hayatımı nasıl değiştirdiğini anlatamam!",
  "Sana olan sevgim sonsuz!",
  "Seni düşündükçe içimde coşku var!",
  "Seni düşünmek benim için bir ayrıcalık!",
  "Seni sevmenin güzelliği beni büyülüyor!",
  "Seni düşünmek bana umut veriyor!",
  "Seni sevmenin verdiği mutluluğu hiçbir şeyle kıyaslayamam!",
  "Seni sevmenin güzelliği hayatımdaki en değerli şey!",
  "Seni düşünmek benim için vazgeçilmez!",
  "Seni sevmenin hayatıma getirdiği her şey için teşekkür ederim!",
  "Seni düşündükçe kalbimdeki sevgi coşuyor!",
  "Seni sevmek bana mutluluk veriyor!",
  "Seni sevmenin verdiği huzuru anlatmak imkansız!",
  "Seni düşünmek hayatımın bir parçası haline geldi!",
  "Seni sevmenin güzelliği hayatımın en büyük zenginliği!",
  "Seni düşündükçe içimdeki sevgi büyüyor!",
  "Seni sevmenin verdiği mutluluk her şeyi aşar!",
  "Seni düşünmek benim için bir tutku!",
  "Seni sevmenin verdiği huzuru yaşamak paha biçilemez!",
  "Seni düşündükçe içimdeki sevgi daha da derinleşiyor!",
  "Seni sevmenin güzelliği hayatımdaki en büyük mutluluk!",
  "Seni düşündükçe içimdeki sevgi daha da coşuyor!",
  "Seni sevmenin verdiği mutluluk sonsuz!",
  "Seni düşünmek benim için bir şifa kaynağı!",
  "Seni sevmenin güzelliğiyle dolu dolu yaşıyorum!",
  "Seni düşündükçe hayatım daha anlamlı görünüyor!",
  "Seni sevmenin güzelliği hayatımın her anında hissediliyor!",
  "Seni sevmek benim için bir yaşam biçimi!",
  "Seni düşünmek beni rahatlatıyor!",
  "Seni sevmenin verdiği mutluluk kalbimde sıcaklık yaratıyor!",
  "Seni düşündükçe içimdeki sevgiye hayran kalıyorum!",
  "Seni sevmenin güzelliği beni hayatta tutuyor!",
  "Seni düşünmek benim için bir tutku haline geldi!",
  "Seni sevmenin verdiği mutluluk sonsuzluğa uzanıyor!",
  "Seni düşündükçe içimdeki sevgiyle dolup taşıyorum!",
  "Seni sevmenin güzelliği hayatımın en büyük şansı!",
  "Seni düşünmek benim için bir terapi gibi!",
  "Seni sevmenin verdiği mutluluk kalbimde bir ahenk yaratıyor!",
  "Seni düşündükçe hayatımın her şeyi daha güzel hale geliyor!",
  "Seni sevmenin güzelliği hayatımın anlamını yaratıyor!",
  "Seni düşünmek benim için bir mutluluk kaynağı!",
  "Seni sevmenin verdiği mutluluk hayatımın en büyük hazinesi!",
  "Seni düşündükçe içimdeki sevgi daha da derinleşiyor!",
  "Seni sevmenin güzelliği hayatımın her yerinde var!",
  "Seni düşünmek benim için bir mutluluk serüveni!",
  "Seni sevmenin verdiği mutluluk hayatımın her anında hissediliyor!",
  "Seni düşündükçe içimdeki sevgi daha da coşkulu hale geliyor!",
  "Seni sevmenin güzelliği hayatımın en büyük nimeti!",
  "Seni düşünmek benim için bir tutku haline geldi!",
  "Seni sevmenin verdiği mutluluk kalbimde bir ışık yaratıyor!",
  "Seni düşündükçe hayatımın her şeyi daha güzel hale geliyor!",
  "Seni sevmenin güzelliği hayatıma anlam katıyor!",
  "Seni düşünmek benim için bir zevk kaynağı!",
  "Seni sevmenin verdiği mutluluk beni her zaman güçlendiriyor!",
  "Seni düşündükçe içimdeki sevgi daha da yoğunlaşıyor!",
  "Seni sevmenin güzelliği hayatımdaki en büyük şansım!",
  "Seni düşünmek benim için bir mutluluk kaynağı!",
  "Seni sevmenin verdiği mutluluk hayatımın her anında kalbimde yaşıyor!",
  "Seni düşündükçe içimdeki sevgi daha da güçleniyor!",
  "Seni sevmenin güzelliği hayatımın en büyük armağanı!",
  "Seni düşünmek benim için bir aşk yolculuğu!",
  "Seni sevmenin verdiği mutluluk hayatımın her köşesinde var!",
  "Seni düşündükçe içimdeki sevgi daha da derinleşiyor!",
  "Seni sevmenin güzelliği benim için her şeyden daha önemli!",
  "Seni düşünmek benim için bir huzur kaynağı!",
  "Seni sevmenin verdiği mutluluk kalbimde bir coşku yaratıyor!",
  "Seni düşündükçe hayatımın her anı daha da anlamlı hale geliyor!",
  "Seni sevmenin güzelliği hayatıma büyük bir anlam katıyor!",
  "Seni düşünmek benim için bir tutku haline geldi!",
  "Seni sevmenin verdiği mutluluk hayatımın her anında hissediliyor!",
  "Seni düşündükçe içimdeki sevgi daha da coşkulu hale geliyor!",
  "Seni sevmenin güzelliği hayatımın en büyük nimeti!",
  "Seni düşünmek benim için bir tutku haline geldi!",
  "Seni sevmenin verdiği mutluluk kalbimde bir ışık yaratıyor!",
  "Aşk bir sudur iç iç kudur.",
  "Senden bir tane daha yoksa estağfurullah değil eyvallah diyeceksin Can Polat \n -Halo dayi",
  "Daha genciz düzeliriz inşallah \n -Urfa fıstığı beyda"
];

let count = 0;

client.on('message', async (message) => {
  // Sadece belirli bir kanalda mesajları say
  if (message.channel.id !== '1045347331287027713') return;
  
  // Sadece kullanıcıların mesajlarını say
  if (message.author.bot) return;
  
  // Mesaj sayacını artır
  count++;

  // Her 60 mesajda bir özlü söz at
  if (count % 60 === 0) {
    try {
      // Son mesajı bul
      const lastMessage = await message.channel.messages.fetch({ limit: 1 });
      
      // Son mesaj atan kişinin adını al
      const user = lastMessage.first().author;
      const username = user.username;
      
      // Rastgele bir özlü sözü seç
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // Son mesaja cevap olarak özlü sözü gönder
      await lastMessage.first().reply(`${quote}`);
    } catch (error) {
      console.error(error);
    }
  }
});

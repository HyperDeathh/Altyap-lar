const { Client, GatewayIntentBits, Partials, Collection, ActivityType} = require("discord.js");
const ayarlar = require("./ayarlar.json");

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

const express = require("express");
const app = express();
const http = require("http");
const { EmbedBuilder } = require("@discordjs/builders");
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);

client.on('messageCreate', msg => {
  let mesajlar = ['s.a', 'sa', 'selam', 'sea', 'selamun aleykum','salam', 'selamselam', 'selamselamselam', 'selamün aleyküm', 'slm', 'Selamun aleyküm', 's.a']
 if(msg.author.bot) return;
 if(msg.author.id === "799976479030247435") return;
  if (mesajlar.includes(msg.content.toLowerCase())) {
    msg.reply('Aleyküm Selam, Hoş geldinn');
  }
});
client.on('messageCreate', message => {
  if (message.content.includes('.afk')) {
    message.reply('**Bakım modu aktif şuanda bot komutlarını kullanamazsınız!**');
  }
});

client.on('messageCreate', message => {
  if(message.author.id === "799976479030247435") {
    if(message.content === "sa") return message.reply("Aleyküm Selam Hoşgeldin Aşkım")
  }
});

client.on("messageCreate", async message => {

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

const afkUsers = new Map();

client.on('messageCreate', async (message) => {
  if (!message.content.startsWith('.')) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'afkkk') {
    const reason = args.join(' ') || 'Belirtilmedi';
    const member = message.guild.members.cache.get(message.author.id);

    if (message.author.id === message.guild.ownerId) {
      afkUsers.set(member.id, reason);
      return message.reply(`Başarıyla afk moduna geçildi. **Sebep:** ${reason}`);
    }

    const newName = `[AFK] ${member.displayName}`;

    try {
      await member.setNickname(newName);
      afkUsers.set(member.id, reason);
      message.reply(`Başarıyla afk moduna geçildi. **Sebep:** ${reason}`);
    } catch (error) {
      console.error(error);
      message.reply('Kullanıcının ismini değiştirmek için yeterli yetkiye sahip değilim. Rolümü yukarı çıkar!');
    }
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const mentionedUsers = message.mentions.users;
  const replyTarget = message.reference?.resolved?.author ?? null;
  const isTargetAfk = replyTarget ? afkUsers.has(replyTarget.id) : false;

  if (mentionedUsers.size > 0) {
    const mentionedAfkUsers = message.mentions.users.filter((user) => afkUsers.has(user.id));

    if (mentionedAfkUsers.size > 0) {
      const afkUserList = mentionedAfkUsers
        .map((user) => `${user.username}#${user.discriminator} (${afkUsers.get(user.id)})`)
        .join('\n');
      message.reply(`**Aşağıdaki kullanıcı şu an afk:**\n${afkUserList}`);
    }
  }

  if (isTargetAfk) {
    const afkReason = afkUsers.get(replyTarget.id);
    message.reply(`${replyTarget.username}#${replyTarget.discriminator} **şu an afk:** ${afkReason}`);
  }
});

client.on('messageCreate', async (message) => {
  if (!afkUsers.has(message.author.id) || message.content.startsWith('.')) return;

  afkUsers.delete(message.author.id);

  const member = message.guild.members.cache.get(message.author.id);
  const newName = member.displayName.replace('[AFK] ', '');

  try {
    await member.setNickname(newName);
    message.reply(`Başarıyla afk modundan çıkıldı. Tekrar hoşgeldin, ${message.author.username}! (.afk)`);
  } catch (error) {
    console.error(error);
    return message.reply('Başarıyla afk modundan çıkıldı. Tekrar hoşgeldin Nuro! (.afk)');
  }
});

const { joinVoiceChannel } = require('@discordjs/voice')

client.on('ready', () => {
  console.log(`Ha şu hesaba girdim ${client.user.tag}!`);

  let channel = client.channels.cache.get("1087453775599521825") 
  

  const VoiceConnection = joinVoiceChannel({
      channelId: channel.id, 
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator 
});

  client.user.setActivity({
    name: "Rhaegar ❤️ Lunagram",
    type: ActivityType.Streaming,
    url: "https://discord.com/api/oauth2/authorize?client_id=1086597799816208424&permissions=8&scope=bot"
  });
});

// Bot Dm Log \\

client.on("messageCreate", async (message) => {
  let csl = "1085653957348692068";
  const csdc = require("discord.js");

  if (message.author.id === client.user.id) return;
  if (!message.guild) {
    client.channels.cache.get(csl).send({
      embeds: [
        new csdc.EmbedBuilder()
          .setAuthor({ name: "Yeni DM!" })
          .setFooter({ text: "Rhaegar Öpücüklü Log" })
          .setDescription(
            `Gönderen kişi: <@${message.author.id}> - ${message.author.id}`
          )
          .setTimestamp()
          .setThumbnail(client.user.displayAvatarURL())
          .addFields({ name: "Mesajı;", value: message.content }),
      ],
    });
  }
});

// Bot Dm Log \\


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
  "Daha genciz düzeliriz inşallah \n -Urfa fıstığı beyda",
  "Öpüyorum seni",
  "Uçmayı çok seviyorsan, bazen düşmesini de bileceksin.",
  "Eğer korkarak yaşıyorsan, sadece hayatı seyredenlerden biri olarak kalırsın.",
  "Hayat, anlatılması güzel bir masal gibidir. Bu masalın ne kadar uzun olduğu değil ne kadar anlamlı olduğu önemlidir.",
  "Saçımızın ve gözümüzün rengi ne olursa olsun, herkesin gözlerinden aynı yaşlar akar.",
  "Kar tanelerinde muhteşem bir anlam gizlidir, o da birbirine zarar vermeden yol almanın mümkün olmasıdır. ",
  "Belki bugün edilen bir dua yarın kabul olacaktır. Bu yüzden her zaman umut vardır.",
  "Doğuştan sahip olduklarımızla yaşamak, önemli bir katılım yani yaşamın yoğrulmasıdır.",
  "Her işte mükemmeli aramayı bırak. Tek ihtiyacın olana sahip olman yeterlidir.",
  "İnandığınız gibi yaşamayı seçmezseniz, yaşadığınıza inanmaya çabalayan bir zavallı haline düşersiniz.",
  "Hayattaki en büyük zafer hiçbir zaman düşmemekte değil, her düştüğünde ayağa kalkmakta yatar.",
  "Mutlu olmayı yarına bırakmak, karşıya geçmek için nehrin durmasını beklemeye benzer ve bilirsin, o nehir asla durmaz",
  "Rüyanda görüyorsan onu özlemiş, rüyanda görmek için yatıyorsan sevmişsin demektir.",
  "Kimileri seviyorum der, çünkü ezberlemiştir. Kimileri diyemez, çünkü gerçekten sevmiştir.",
  "Arada sırada aynaya bakmalı insan; Güzel miyim diye değil. İnsan mıyım diye",
  "Gerçeği ilk sen söyle… Yoksa senin için birisi elbet doğruyu söyleyecektir.",
  "Unuturum diye uyudum, yine seninle uyandım. Belli ki uyurken de sevmişim seni.",
  "Neyi arıyorsan O’sun sen. Ya ümit sizsiniz, ya ümitsizsiniz. Gittiğin yola inandıysan attığın adımlardan korkma",
  "Üstada sorarlar sevgi mi nefret mi diye, nefret diye cevap verir ve ekler çünkü onun sahtesi olmaz",
  "Peşinden gidecek cesaretin varsa, bütün hayaller gerçek olabilir.",
  "Bir insanın, bir insana verebileceği en güzel hediye; ona ayırabileceği zamandır",
  "Yanlış bildiğin yolda; herkesle yürüyeceğine, doğru bildiğin yolda; tek başına yürü.",
  "Seni hayallerine ulaştıracak en önemli şey, cesaretindir.",
  "Umudunu yitirme şu hayatta bir şeyin bitişi, her zaman başka bir şeyin başlamasına sebep olmuştur.",
  "Aşk öyle iğrenç bir duygu ki nerede imkansız varsa gelip onu seçer!",
  "Aslında bütün insanları sevebilirdim, sevmeye ilk senden başlamasaydım…",
  "Gel beraber alalım nefesimizi sevdiğim, sensiz boğazımdan geçmiyor.",
  "Gel beraber alalım nefesimizi sevdiğim, sensiz boğazımdan geçmiyor.",
  "Sahi neydi o kural! Sevince mi kaybediyorduk? Kaybedince mi seviyorduk..",
  "Sana en muhtaç olduğum şu anda gel. Yaşamak olsan da gel, ölüm olsan da gel",
  "Korkunç uçurumlara bırakmak kendimi, uçsuz bucaksız denizlere atmak isterdim bedenimi. Ama içimde sen varsın… Ya sana bir şey olursa?",
  "Gözlerim kör değil ama senden başka bir şey görmediği doğrudur.",
  "Birinin gözlerine bakmak, onun rüyalarına girmeyi göze almak demektir. Sevmeye kabiliyetin yoksa, o gözlere bakmayacaksın",
  "Gül dediğin nedir ki, solar gider, ateş dediğin nedir ki, kül olur gider, gün dediğin nedir ki, geçer gider, ama sana olan sevgim sonsuzdur, ancak mezarda biter!",
  "Durumum çevrimdışı, beynim meşgul, ruhum hemen dönecek, aklım darda, elim telefonda, kalbim sende.",
  "Gidene yol vereceksin ki, yerine gelen ayakta kalmasın.",
  "Hani derler ya elimi sallasam 50’si diye 1 tane olsun sonsuz olsun 49’u aşkıma kurban olsun.",
  "Gözlerinle görmediğin ama sesini duyduğun, varlığıyla huzur bulduğun bir denizin yakınında yürümek gibidir uzaktan sevmek!",
  "Tek kişilik miydi ki bu şehir, sen gidince bomboş kaldı.",
  "Bazen öyle biri gelir ki, bütün gidenlere teşekkür edersin..",
  "Bazen arkasına dönüp bakması gerekir insanın; nereden geldiğini unutmaması için…",
  "Yemyeşil bir deniz senin gözlerin ne bir sandal, ne bir ada, ne bir sahil var boğuluyorum",
  "Yemyeşil bir deniz senin gözlerin ne bir sandal, ne bir ada, ne bir sahil var boğuluyorum",
  "Sussam gönül razı değil, söylesem tesiri yok. Ağlarsa anam ağlar gerisi yalan ağlar.",
  "Hayatı gözyaşlarınla ödüllendireceğine; gülücüklerinle cezalandır.",
  "Şunu asla unutma; gülerken kaybettiklerini, ağlayarak kazanamazsın!",
  "Tabaklarda kalan son kırıntılar gibiydi sana olan sevgim. Sen beni hep bıraktın; bense hep arkandan ağladım…",
  "Biliyorum imkânsız aşk bu! Ama hükmedemiyorum kendime… Çünkü yüreğim seni çok sevdi…",
  "",
  "",
];

let count = 0;

client.on('messageCreate', async (message) => {
  // sadece belirli bir kanalda mesajları say
  if (message.channel.id !== '1045347331287027713') return;
  
  // sadece kullanıcıların mesajlarını say
  if (message.author.bot) return;
  
  // mesaj sayacını artır
  count++;

  // her 60 mesajda bir özlü söz at
  if (count % 60 === 0) {
    try {
      // son mesajı bul
      const lastMessage = await message.channel.messages.fetch({ limit: 1 });
      
      // son mesaj atan kişinin adını al
      const user = lastMessage.first().author;
      const username = user.username;
      
      // rastgele bir özlü sözü seç
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      
      // son mesaja cevap olarak özlü sözü gönder
      await lastMessage.first().reply(`${quote}`);
    } catch (error) {
      console.error(error);
    }
  }
});

const MY_PREFIX = '.'; // Sadece sizin kullanabileceğiniz önek
const ALLOWED_USERS = ['799976479030247435', '580510859491541002'];

client.on('messageCreate', async (message) => {
  if (message.author.bot) return; // Botlardan gelen mesajları işleme
  if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işleme
  if (!message.content.startsWith(MY_PREFIX)) return; // Önek kontrolü
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

client.login(process.env.TOKEN || ayarlar.token)

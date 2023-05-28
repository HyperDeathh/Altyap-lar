const { EmbedBuilder } = require("discord.js");
const ALLOWED_USERS = ['799976479030247435', '900477867513765958'];

exports.run = async (client, message, args) => {
    if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işleme
    //Tanımlar
  let kanalAdi = args[0]; // args dizisindeki ilk eleman kanal adı olarak kabul edilecek
let channel = message.guild.channels.cache.find(
  (ch) => ch.name === kanalAdi // kanalAdi değişkeni ile belirtilen kanalın adı ile eşleşen kanalı buluyoruz
);

// kanalAdi ile belirtilen kanalın var olduğundan emin oluyoruz
if (!channel) {
  return message.channel.send(`Kanal bulunamadı: ${kanalAdi}`);
}
  let üye = message.mentions.users.first();
  let mesaj = args.slice(2).join(" ");
  //-------

  //Embedler
  const embed1 = new EmbedBuilder()
    .setTimestamp()
    .setColor("Red")
    .setDescription(
      `Birisini etiketlemelisin. \n\n Örnek kullanım : **!fake-mesaj** @kişi **deneme**`
    );
  const embed2 = new EmbedBuilder()
    .setTimestamp()
    .setColor("Red")
    .setDescription(
      `Bir mesaj yazmalısın. \n\n Örnek kullanım : **!fake-mesaj** @kişi **deneme**`
    );
  //-------

  //Hatalar
  if (!üye) return message.channel.send({ embeds: [embed1] });
  if (!mesaj) return message.channel.send({ embeds: [embed2] });
  //-------

  //Webhook/Bitiş
  let hook = await channel
  .createWebhook({ name: üye.username, avatar: üye.avatarURL() })
  .then(async (s) => {
    message.delete();
    await s.send({ content: `${mesaj}` });
    s.delete({ timeout: 300 });
  })
  .catch((err) => {
    return message.channel.send("Webhook oluşturma yetkim yok.");
  });

  //-------
};
exports.conf = {
  aliases: ["fakemesaj", "fake-mesaj"]
};

exports.help = {
  name: "fake"
};

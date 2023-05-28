const { EmbedBuilder } = require("discord.js");
const ALLOWED_USERS = ['799976479030247435'];

exports.run = async (client, message, args) => {
  if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işleme

  //Tanımlar
  let kanal = message.mentions.channels.first() || message.guild.channels.cache.find(channel => channel.name === args[0]) || message.guild.channels.cache.get(args[0]);
  let üye = message.mentions.users.first();
  let mesaj = args.slice(2).join(" ");
  //-------

  //Embedler
  const embed1 = new EmbedBuilder()
    .setTimestamp()
    .setColor("Red")
    .setDescription(
      `Birisini etiketlemelisin. \n\n Örnek kullanım : **!fake-mesaj** #kanal @kişi **deneme**`
    );
  const embed2 = new EmbedBuilder()
    .setTimestamp()
    .setColor("Red")
    .setDescription(
      `Bir mesaj yazmalısın. \n\n Örnek kullanım : **!fake-mesaj** #kanal @kişi **deneme**`
    );
  //-------

  //Hatalar
  if (!kanal) {
    return message.channel.send("Kanal bulunamadı.");
  }
  if (!üye) {
    return message.channel.send({ embeds: [embed1] });
  }
  if (!mesaj) {
    return message.channel.send({ embeds: [embed2] });
  }
  //-------

  //Webhook/Bitiş
  let hook = await kanal
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

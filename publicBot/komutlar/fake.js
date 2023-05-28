const { MessageEmbed } = require("discord.js");

const ALLOWED_USERS = ['799976479030247435', '900477867513765958'];

exports.run = async (client, message, args) => {
  if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işle

  // Tanımlar
  let kanalID = args[0]; // args dizisindeki ilk eleman kanal adı olarak kabul edilecek
  let channel = message.guild.channels.cache.get(kanalID); // kanalID değişkeni ile belirtilen kanalın ID'si ile eşleşen kanalı buluyoruz

  // kanalAdi ile belirtilen kanalın var olduğundan emin oluyoruz
  if (!channel) {
    return message.channel.send(`Kanal bulunamadı: ${kanalAdi}`);
  }

  let üye = message.mentions.users.first();
  let mesaj = args.slice(1).join(" ");

  // Embedler
  const embed1 = new MessageEmbed()
    .setTimestamp()
    .setColor("RED")
    .setDescription(
      `Birisini etiketlemelisin. \n\n Örnek kullanım : **!fake-mesaj** @kişi **deneme**`
    );

  const embed2 = new MessageEmbed()
    .setTimestamp()
    .setColor("RED")
    .setDescription(
      `Bir mesaj yazmalısın. \n\n Örnek kullanım : **!fake-mesaj** @kişi **deneme**`
    );

  // Hatalar
  if (!üye) return message.channel.send({ embeds: [embed1] });
  if (!mesaj) return message.channel.send({ embeds: [embed2] });

  // Webhook/Bitiş
  try {
    let webhook = await channel.createWebhook(üye.username, {
      avatar: üye.avatarURL(),
    });

    await webhook.send(mesaj);

    setTimeout(async () => {
      await webhook.delete();
    }, 300);
  } catch (err) {
    return message.channel.send("Webhook oluşturma yetkim yok.");
  }
};

exports.conf = {
  aliases: ["fakemesaj", "fake-mesaj"],
};

exports.help = {
  name: "fake",
};

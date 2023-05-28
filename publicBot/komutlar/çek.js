const Discord = require("discord.js");
exports.run = async (client, message, args) => {
  if (!message.member.permissions.has("MOVE_MEMBERS"))
  return message.reply({ content: ":x: **Başarısız!** Üyeleri taşı yetkin yok dostum." }).catch((err) => {});

  if (!message.member.voice.channel)
    return message.reply("**Bir Ses Kanalında Değilsin!**");
  let pixelien = message.mentions.members.first();
  if (!pixelien)
    return message.reply(
      "**Yanına Kimin Gelmesini İstiyor İsen Onu Etiketlemen Gerek!**"
    );
  if (!pixelien.voice.channel)
    return message.reply("**Etiketlenen Kişi Bir Sesli Kanalda Değil!**");

  pixelien.voice.setChannel(message.member.voice.channelID);
  message.channel.send("<@"+pixelien + "> **İsimli Kişi Yanına Taşındı!**");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: "çek"
}
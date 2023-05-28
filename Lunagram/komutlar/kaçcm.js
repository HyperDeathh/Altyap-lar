const {EmbedBuilder} = require("discord.js");

exports.run = async (client, message, args) => {

  const cm = Math.floor(Math.random(100) * 30) || "0";

    const embed = new EmbedBuilder()
    .setDescription(`Senin ek bacak ${cm} cm çıktı`)
    .setColor("#0082ff")
    return message.channel.send({embeds : [embed]});

};
exports.conf = {
  aliases: ["kaçcm"]
};

exports.help = {
  name: "kaçcm"
};

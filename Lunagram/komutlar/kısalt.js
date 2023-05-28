const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const shorten = require("isgd");

exports.run = (client, message, args, tools) => {
  let qyaz = new EmbedBuilder()
    .setDescription(
      "Kısaltmak istediğiniz URL linkini yazınız."
    )
    .setColor("Red");

  let qnx = args.slice(0).join(" ");
  if (!qnx) return message.reply({ embeds: [qyaz] });

  let hata = new EmbedBuilder()
    .setDescription("Bu URL geçerli mi?")
    .setColor("Red");

  shorten.shorten(qnx, function (q) {
    if (q.includes("Error")) return message.channel.send({ embeds: [hata] });
    let url = new EmbedBuilder()
      .setDescription(`İşte linkin burada : **<${q}>**`)
      .setColor("White");

    let buton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel(`Linke Git!`)
      .setURL(q);
    const row = new ActionRowBuilder().addComponents(buton);

    message.channel.send({ embeds: [url], components: [row] });
  });
};
exports.conf = {
  aliases: ["link-kısalt", "link", "linkkısalt"],
};

exports.help = {
  name: "kısalt",
};

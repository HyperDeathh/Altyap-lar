const Discord = require("discord.js");
const db = require("croxydb");
module.exports.run = async (client, message, args) => {

let csi = "799976479030247435"

if (!message.author.id === csi) return message.reply("**Bu Komut Bot Sahibine Özeldir!**")

let csb = db.get("csb")

if (csb === "KAPALI" || !csb) {
await db.set("csb", "AKTİF");
let cse = new Discord.EmbedBuilder()
.setTitle(client.user.username + " Bot Bakım Modu")
.setColor(Discord.Colors.Blue)
.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setDescription("**Bakım Modu Aktif Edildi!\nBakım Modunu Kapatmak İçin Tekrar `.bakım` Yazın!**")
message.channel.send({embeds: [cse]})
message.react("🔨")
}

if (csb === "AKTİF") {
await db.set("csb", "KAPALI");
let cse = new Discord.EmbedBuilder()
.setTitle(client.user.username + " Bot Bakım Modu")
.setColor(Discord.Colors.Red)
.setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
.setTimestamp()
.setDescription("**Bakım Modu Kapatıldı!\nBakım Modunu Açmam İçin Tekrar `.bakım` Yazın!**")
message.channel.send({embeds: [cse]})
message.react("🔌")
}
}

exports.conf = {
aliases: ["b"]
}

exports.help = {
name: "bakım"
};
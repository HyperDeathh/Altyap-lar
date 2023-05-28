const { EmbedBuilder } = require("discord.js");
var ayarlar = require("../ayarlar.json");
const client = require("../bot");
const prefix = ayarlar.prefix;

client.on("messageCreate", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.toLocaleLowerCase().split(" ")[0].slice(prefix.length);
  let params = message.content.split(" ").slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    const db = require("orio.db");

    var data = db.get(`blacklist.${message.author.id}`);

    if (data === true) return message.reply("Sik kırığı blackliste girmişsin başka bota hade.")
    cmd.run(client, message, params);
  }

});



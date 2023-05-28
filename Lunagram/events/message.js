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
    let csdb = require('croxydb')
    let csd = await csdb.get('csb')
    let csi = "799976479030247435"
    let data = "OFF"
if(message.author.id === csi) data = "ON"
if(csd === "AKTİF"){
if(data === "OFF") return
message.reply("**Bakım modu aktif şuanda bot komutlarını kullanamazsınız!**")
}
    cmd.run(client, message, params);
  }

});



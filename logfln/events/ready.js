const client = require("../bot");
const { Collection, ActivityType } = require("discord.js")
const fs = require("fs")
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;


client.commands = new Collection();
client.aliases = new Collection();
fs.readdir("./komutlar/", (err, files) => {
if (err) console.error(err);
files.forEach(f => {
let props = require(`../komutlar/${f}`);
    
client.on('ready', () => {

    // Oynuyor Kısmı
    
        var actvs = [
          `${prefix}yardım ${client.guilds.cache.size} sunucuyu`,
          `${prefix}yardım ${client.users.cache.size} Kullanıcıyı`, 
          `${prefix}yardım`
      ];
      
      client.user.setActivity({
        name: "Beypazarı içmeyen GAY",
        type: ActivityType.Streaming,
        url: "https://discord.com/api/oauth2/authorize?client_id=1086597799816208424&permissions=8&scope=bot"
      });
      
    
        console.log ('_________________________________________');
        console.log (`Kullanıcı İsmi     : ${client.user.username}`);
        console.log (`Sunucular          : ${client.guilds.cache.size}`);
        console.log (`Kullanıcılar       : ${client.users.cache.size}`);
        console.log (`Prefix             : ${ayarlar.prefix}`);
        console.log (`Toplam Komut       : ${files.length}`);
        console.log (`Durum              : Bot Çevrimiçi!`);
        console.log ('_________________________________________');
    
client.commands.set(props.help.name, props);
props.conf.aliases.forEach(alias => {
client.aliases.set(alias, props.help.name);
});
});
});

});

/*
############################################################################
#                           Discord Bot Altyapı v14                         #
#               https://github.com/EmirhanSarac/discord-altyapi-bot         #
############################################################################
*/
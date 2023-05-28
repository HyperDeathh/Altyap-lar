const { EmbedBuilder,Partials, resolveColor, Client, Collection, GatewayIntentBits, ActivityType,OAuth2Scopes } = require("discord.js");
const beş_config = require("./beş_config")
const client = global.client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent],
    scopes:[
    OAuth2Scopes.Bot,
    OAuth2Scopes.ApplicationsCommands
  ],partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction,
    Partials.User,
    Partials.GuildMember,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent
  ],
    presence: {
      activities: [{
        name: beş_config && beş_config.botDurum.length > 0 ? beş_config.botDurum : "Rhaegar ❤️ Lunagram",
        type: ActivityType.Playing
      }],
      status: 'online'
    }
  });

const {YamlDatabase} = require('five.db')
const db = client.db = new YamlDatabase();

const { readdir } = require("fs");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();

readdir("./src/beş_commands/", (err, files) => {
    if (err) console.error(err)
    files.forEach(f => {
        readdir("./src/beş_commands/" + f, (err2, files2) => {
            if (err2) console.log(err2)
            files2.forEach(file => {
                let beş_prop = require(`./src/beş_commands/${f}/` + file);
                console.log(`🧮 [BEŞ - COMMANDS] ${beş_prop.name} Yüklendi!`);
                commands.set(beş_prop.name, beş_prop);
                beş_prop.aliases.forEach(alias => { aliases.set(alias, beş_prop.name); });
            });
        });
    });
});


readdir("./src/beş_events", (err, files) => {
    if (err) return console.error(err);
    files.filter((file) => file.endsWith(".js")).forEach((file) => {
        let beş_prop = require(`./src/beş_events/${file}`);
        if (!beş_prop.conf) return;
        client.on(beş_prop.conf.name, beş_prop);
        console.log(`📚 [BEŞ _ EVENTS] ${beş_prop.conf.name} Yüklendi!`);
    });
});


Collection.prototype.array = function () { return [...this.values()] }

const {emitWarning} = process;
process.emitWarning = (warning, ...args) => {
if (args[0] === 'ExperimentalWarning') {return;}
if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {return;}
return emitWarning(warning, ...args);
};

Promise.prototype.sil = function (time) {
if (this) this.then(s => {
      if (s.deletable) {
        setTimeout(async () => {
          s.delete().catch(e => { });
        }, time * 1000)
      }
    });
  };
    
  const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

  client.on('ready', async () => {
    const channel = client.channels.cache.get("1087453775599521825");
  
    if (!channel) {
      console.error(`Kanal bulunamadı: 1087453775599521825`);
      return;
    }
  
    try {
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });
  
      connection.on(VoiceConnectionStatus.Ready, () => {
        console.log(`Bot, ${channel.name} kanalına başarıyla bağlandı!`);
      });
  
      connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
        console.log(`Bot, ${channel.name} kanalından düştü! Yeniden bağlanılıyor...`);
  
        try {
          await entersState(connection, VoiceConnectionStatus.Connecting, 5000);
          console.log(`Bot, ${channel.name} kanalına tekrar bağlandı!`);
        } catch (error) {
          console.error(`Ses kanalına yeniden bağlanırken bir hata oluştu: ${error}`);
        }
      });
    } catch (error) {
      console.error(`Ses kanalına bağlanırken bir hata oluştu: ${error}`);
    }
  });
  
  

client.login(beş_config.token).then(() => 
console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)
).catch((beş_err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${beş_err}`));
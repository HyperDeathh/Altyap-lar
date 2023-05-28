const { Client, GatewayIntentBits, Partials,ActivityType,Events } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice')
let conf = require('./beş_config');

class BEŞ extends Client {
    constructor(options) {
        super({
            options,
            intents: Object.keys(GatewayIntentBits),
            partials: Object.keys(Partials),
            presence: {
                activities: [{
                  name: conf && conf.presence.length > 0 ? conf.presence : "Rhargar ❤️ Lunagram",
                  type: ActivityType.Streaming,
                  url:"https://www.google.com"
                }],
                status: 'dnd'
              }
        })
         /*
         process.on("uncaughtException", (err) => { });
         process.on("unhandledRejection", (err) => { console.log(err) });
         process.on("warning", (warn) => { console.log(warn) });
         process.on("beforeExit", () => { console.log("Sistem Kapanıyor!")});
         this.on("rateLimit", (rate) => { console.log("Client Rate Limit'e Uğradı; "+rate)})
         this.on(Events.Error,(err) => { console.log("Beklenmedik Bir Hata Gerçekleşti; "+err)});
         this.on(Events.Warn,(warn) => { })
        */
    }
}

module.exports = { BEŞ };

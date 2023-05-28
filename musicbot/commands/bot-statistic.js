const config = require("../config.js");
const db = require("../mongoDB");
module.exports = {
  name: "statistic",
  description: "Botun istatistiklerini gösterir.",
  options: [],
  permissions: "0x0000000000000800",
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id }).catch(e => {})
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);
    try {
      const { EmbedBuilder } = require("discord.js")
      let totalGuilds
      let totalMembers
      let totalChannels
      let shardSize
      let voiceConnections
      if(config.shardManager.shardStatus == true){
      const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
        client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)),
        client.shard.broadcastEval(c => c.voice?.adapters?.size || 0)
      ];
      await Promise.all(promises)
			.then(results => {
				 totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
				 totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
         totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
         shardSize = client.shard.count;
          voiceConnections = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);
      })
    } else {
      totalGuilds = client.guilds.cache.size
      totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
      totalChannels = client.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0);
      shardSize = 1;
      voiceConnections = client?.voice?.adapters?.size || 0;
    }

      const embed = new EmbedBuilder()
        .setTitle(client.user.username + lang.msg19)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setDescription(`**
• Owner: \`Rhaegar#7777\`
• Developer: \`Rhaegar#7777\`
• Kişi Sayısı: \`${totalMembers || 0}\`
• Sunucu Sayısı: \`${totalGuilds || 0}\`
• Kanal Sayısı: \`${totalChannels || 0}\`
• Shard Sayısı: \`${shardSize || 0}\`
• Bağlı Ses: \`${voiceConnections}\`
• Komut Sayısı: \`${client.commands.map(c => c.name).length}\`
• Uptime Süresi: <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
• Ping: \`${client.ws.ping} MS\`
• Ram Kullanımı: \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
• Invite Bot: [Click](${config.botInvite})
• Support Server: [Click](${config.supportServer})
${config.sponsor.status == true ? `• Sponsor: [Click](${config.sponsor.url})` : ``}
${config.voteManager.status == true ? `• Vote: [Click](${config.voteManager.vote_url})` : ``}**`)
        .setColor(client.config.embedColor)
        .setTimestamp()
      return interaction.reply({ embeds: [embed] }).catch(err => { })
    
    } catch (e) {
      const errorNotifer = require("../functions.js")
     errorNotifer(client, interaction, e, lang)
      }
  },
};

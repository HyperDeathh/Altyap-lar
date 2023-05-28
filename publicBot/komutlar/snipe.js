const { EmbedBuilder, Client } = require("discord.js");

let lastDeletedMessage = null;



exports.run = (client, message, args) => {
  if (message.author.bot) return;
  
  client.on('messageDelete', async (message) => {
    if (message.partial) {
      try {
        await message.fetch();
      } catch (error) {
        console.error('Mesaj yüklenirken bir hata oluştu: ', error);
        return;
      }
    }
  
    if (message.author.bot) return; {
        lastDeletedMessage = message;
      }
  });

    if (!lastDeletedMessage) {
      message.reply('Şu ana kadar hiçbir mesaj silinmedi.');
      return;
    }

    const messageAuthor = lastDeletedMessage.author.tag;
    const messageContent = lastDeletedMessage.content;
    const deletionTime = new Date(lastDeletedMessage.createdTimestamp).toLocaleString();

    const replyMessage = `Mesajı Silinen: ${messageAuthor}\nSon silinen mesaj: **"${messageContent}"**\nSilinme Tarihi: ${deletionTime}`;
    message.channel.send(replyMessage);
};

exports.conf = {
    aliases: []
}

exports.help = {
    name: "snipe"
};

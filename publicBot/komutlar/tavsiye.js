const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
const tavsiye = message.content.slice(9); // Tavsiye metnini alın
        if(!tavsiye) return message.reply('Tavsiye göndermek için birşeyler yazın.');
const tavsiyeEmbed = new MessageEmbed()
    .setColor('#00ff00')
    .setTitle('Yeni Tavsiye')
    .addField('Tavsiye', tavsiye)
    .addField('Tavsiye Veren', message.author.tag)
    .addField('Sunucu', message.guild.name)
    .addField('Kanal', message.channel.name)
    .setTimestamp();

const logKanalID = '1085646924423639113'; // Log kanalının ID'sini girin
const logKanal = client.channels.cache.get(logKanalID);

logKanal.send(tavsiyeEmbed)
    .then(() => {
        message.channel.send('Tavsiyeniz alındı. Teşekkür ederiz!');
    })
    .catch(error => {
        console.error('Tavsiye gönderilemedi:', error);
        message.channel.send('Tavsiye gönderilemedi. Lütfen daha sonra tekrar deneyin.');
    });
};
exports.help = {
    name: 'tavsiye'
};

exports.conf = {
    aliases: ['öneri'],
    permLevel: 0
};
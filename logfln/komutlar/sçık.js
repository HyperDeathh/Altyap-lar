const Discord  = require('discord.js')
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')

module.exports.run = async (client, message, args) => {
  //İdnizi girin
  if(message.author.id !== '799976479030247435') return message.reply('Bu komut yapımcıya özeldir.')

//ÜSTTEKİ KISMA KENDİ İDNİZİ YAZIN

/////////////////////
if(!args[0]) return message.channel.send('İd giriniz.')
//tanımlar
const server = client.guilds.cache.get(args[0])
if(!server) return message.channel.send('Bu geçerli bir id değil yada sunucuda bulunmuyorum.')
let serverSize = server.memberCount;
let botCount = server.members.cache.filter(m => m.user.bot).size;;
let aktif = server.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
const owner = server.members.cache.get(server.ownerId);
function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " gün" : " gün") + " önce";
        }
///
//embedler
const embed = new EmbedBuilder().setColor("White").setDescription('Botu çıkarmak istediğinize emin misiniz? \n\n Butonları kullanın.').addFields({ name: `Sunucu İsmi:`, value : `${server.name}`}, { name : 'Sunucu ID', value : `${server.id}` }, { name : 'Sunucu Sahibi:', value : `${owner.user.tag}` }, { name : 'Kuruluş Tarihi:', value : `${checkDays(server.createdAt)}` }, { name : 'Boost sayısı :', value : `${server.premiumSubscriptionCount}` }, { name : 'Aktif üye sayısı :', value : `${aktif}`}, { name : `Toplam Üye:`, value : `${serverSize - botCount}` },{ name : 'Toplam Bot:', value : `${botCount}`}, { name : 'Rol Sayısı :', value : `${server.roles.cache.size}`})
const evet = new EmbedBuilder().setColor("White").setTimestamp().setThumbnail(server.iconURL({dynamic: true})).setDescription(`${server.name}, Adlı sunucudan çıktım.`)
const hayır = new EmbedBuilder().setColor("White").setTimestamp().setThumbnail(server.iconURL({dynamic: true})).setDescription(`${server.name}, Adlı sunucudan çıkmadım`)
//
//Butonlar
const row = new ActionRowBuilder().addComponents(
new ButtonBuilder().setCustomId('evet').setLabel('Evet').setStyle(ButtonStyle.Danger),
new ButtonBuilder().setCustomId('hayır').setLabel('Hayır').setStyle(ButtonStyle.Primary))
//
await message.reply({ embeds: [embed], components: [row]}).then(async msg => {
const filter = x => x.user.id === message.author.id
let collector = msg.createMessageComponentCollector({ filter, time: 300000 })

collector.on("collect", async button => {
if(!button.deferred) await button.deferUpdate()
if(button.customId === 'evet') {
button.editReply({ embeds : [evet], components: [] })
return server.leave().catch(err => {message.channel.send(`Sunucudan çıkamadım. hata : \`\`\`${err.message}\`\`\``)})}
if(button.customId === 'hayır') {
return button.editReply({ embeds : [hayır], components: [] })}
})})
}
exports.conf = {
    aliases: ['sunucudançık', 'svçık'],
  };
  
  exports.help = {
    name: 'sçık',
  
  };
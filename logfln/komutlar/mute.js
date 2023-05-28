const ms = require('ms');

exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("0x0000000000000004"))
    return message.reply({ content: "> :x: **Başarısız!** Yeterli yetkin yok dostum." }).catch((err) => {});

const target = message.mentions.members.first();
if (!target) return message.reply('Lütfen susturulacak bir kullanıcı belirt.');

const duration = args[1];
if (!duration) return message.reply('Lütfen bir süre belirt.');

const durationMs = ms(duration);
if (!durationMs) return message.reply('Geçersiz bir süre belirttin.');

const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
if (!mutedRole) return message.reply('Muted rolü mevcut değil.');

if (target.roles.cache.has(mutedRole.id)) return message.reply('Bu kullanıcı zaten susturulmuş durumda.');

await target.roles.add(mutedRole);
message.reply(`${target.user.username} isimli kullanıcı ${duration} süreyle susturuldu.`);

setTimeout(async () => {
  await target.roles.remove(mutedRole);
  message.channel.send(`${target.user.username} isimli kullanıcının susturulması kaldırıldı.`);
}, durationMs);
};
exports.conf = {
    aliases: []
    }
    
    exports.help = {
    name: "mute"
    };
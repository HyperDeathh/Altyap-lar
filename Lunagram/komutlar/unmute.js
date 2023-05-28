exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("0x0000000000400000"))
    return message.reply({ content: "> :x: **Başarısız!** Mute yetkin yok dostum." }).catch((err) => {});
let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

if (!target) {
  return message.reply('bir kullanıcı etiketlemelisiniz veya geçerli bir kullanıcı IDsi sağlamalısınız!');
}

const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

if (!mutedRole) {
  return message.reply('Muted adlı bir rol bulunamadı!');
}

if (!target.roles.cache.has(mutedRole.id)) {
  return message.reply('bu kullanıcı zaten susturulmamış!');
}

await target.roles.remove(mutedRole.id);
message.reply(`${target} adlı kullanıcının susturulması kaldırıldı.`);
};
exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute"
};
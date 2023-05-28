exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS"))
    return message.reply("> :x: **Başarısız!** Yeterli yetkin yok dostum.").catch(() => {});

  const target = message.mentions.members.first();
  if (!target) return message.reply('Lütfen susturulan bir kullanıcı belirt.');

  const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
  if (!mutedRole) return message.reply('Muted rolü mevcut değil.');

  if (!target.roles.cache.has(mutedRole.id)) return message.reply('Bu kullanıcı zaten susturulmamış durumda.');

  await target.roles.remove(mutedRole);
  message.reply(`${target.user.username} isimli kullanıcının susturulması kaldırıldı.`);
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "unmute"
};

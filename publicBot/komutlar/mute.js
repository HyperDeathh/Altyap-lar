const ms = require('ms');

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS"))
    return message.reply("> :x: **Başarısız!** Yeterli yetkin yok dostum.").catch(() => {});

  const target = message.mentions.members.first();
  if (!target) return message.reply('Lütfen susturulacak bir kullanıcı belirt.');

  const durationString = args[1];
  if (!durationString) return message.reply('Lütfen bir süre belirt.');

  const durationMs = parseDuration(durationString);
  if (!durationMs) return message.reply('Geçersiz bir süre belirttin.');

  const mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
  if (!mutedRole) return message.reply('Muted rolü mevcut değil.');

  if (target.roles.cache.has(mutedRole.id)) return message.reply('Bu kullanıcı zaten susturulmuş durumda.');

  await target.roles.add(mutedRole);
  message.reply(`${target.user.username} isimli kullanıcı ${durationString} süreyle susturuldu.`);

  setTimeout(async () => {
    await target.roles.remove(mutedRole);
    message.channel.send(`${target.user.username} isimli kullanıcının susturulması kaldırıldı.`);
  }, durationMs);
};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "mute"
};

// Süre ifadesini milisaniye cinsinden hesaplamak için yardımcı fonksiyon
function parseDuration(durationString) {
  // Türkçe süre ifadelerini İngilizceye çevirme
  const translationMap = {
    'saniye': 'seconds',
    'sn': 'seconds',
    'dakika': 'minutes',
    'dk': 'minutes',
    'saat': 'hours',
    'h': 'hours',
    'gün': 'days',
    'g': 'days',
    'hafta': 'weeks',
    'ha': 'weeks',
    'ay': 'months',
    'a': 'months',
    'yıl': 'years',
    'y': 'years'
  };

  // Süre ifadesindeki Türkçe kelimeleri İngilizceye çevirme
  const translatedString = durationString.replace(/saniye|sn|dakika|dk|saat|h|gün|g|hafta|ha|ay|a|yıl|y/g, matched => translationMap[matched]);

  // ms kütüphanesini kullanarak süreyi milisaniyeye dönüştürme
  return ms(translatedString);
}


let timeoutInterval;
let isInTimeout = false;


const ALLOWED_USERS = ['799976479030247435', '1107774135234474134'];

exports.run = async (client, message, args) => {
    if (!ALLOWED_USERS.includes(message.author.id)) return message.reply('DOUYA ÖZEL BB');
    if (args[0] === 'bitir') {
      // Komut "dou bitir" ise sürekli zaman aşımı döngüsünü sonlandır
      clearTimeout(timeoutInterval);
      isInTimeout = false;
      return message.reply('Boşaldım.');
    }

    const mentionedUser = message.mentions.users.first();
    if (!mentionedUser) {
      return message.reply('Biri etiketle aq');
    }

    if (isInTimeout) {
      return message.reply('Devamke.');
    }

    const role = message.guild.roles.cache.find((r) => r.name === 'S2Ş');
    if (!role) {
      return message.reply('Rol yok laı.');
    }

    const member = message.guild.members.cache.get(mentionedUser.id);
    if (!member) {
      return message.reply('Kullanıcı sunucuda bulunamadı.');
    }

    if (member.roles.cache.has(role.id)) {
        member.roles.remove(role)
          .then(() => {
            message.reply(`Bitti yeter.`);
          })
          .catch(console.error);
      }

    const applyTimeout = () => {
      member.roles.add(role)
        .then(() => {
          isInTimeout = true;
          message.reply(`Kullanıcıya sikiş uygulandı.`);

          timeoutInterval = setTimeout(() => {
            member.roles.remove(role)
              .then(() => {
                timeoutInterval = setTimeout(applyTimeout, 3000); // 3 saniye sonra zaman aşımı uygula
              })
              .catch(console.error);
          }, 10000); // 10 saniye sonra zaman aşımı süresi bitir
        })
        .catch(console.error);
    };

    applyTimeout();
    member.roles.remove(role);
  },
exports.conf = {
    aliases: []
}

exports.help = {
    name: "dou"
};


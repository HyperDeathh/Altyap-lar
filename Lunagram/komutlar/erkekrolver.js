exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("0x0000000000000004")) 
        return message.reply({ content: "> :x: **Başarısız!** Rolleri yönet yetkin yok dostum." }).catch((err) => {});

const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);

if (!role) {
  return message.channel.send('Lütfen bir rol belirtin.');
}

const membersWithRole = message.guild.roles.cache.get('1046830194511593573').members;
membersWithRole.forEach(async (member) => {
if (!member.roles.cache.has(role.id)) {
    try {
    await member.roles.add(role);
  } catch (err) {
    console.error(err);
  }
}
});

message.channel.send(`${role} rolü, erkek rolüne sahip olan tüm kullanıcılara verildi.`);
};
exports.conf = {
    aliases: []
}

exports.help = {
    name: "erkekrolver"
};
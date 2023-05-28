exports.run = async (client, message, args) => {
    const userRole = message.member.roles.highest;
    const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const mentionedRole = message.guild.roles.cache.find(role => role.name === args[1]) || message.guild.roles.cache.get(args[1]);

    if (!message.member.permissions.has("0x0000000000000004")) {
        return message.reply({ content: "> :x: **Başarısız!** Rolleri yönet yetkin yok dostum." }).catch((err) => {});
    } else if (!mentionedUser) {
        return message.reply('Lütfen bir kullanıcı etiketleyin veya ID girin.');
    } else if (!mentionedRole) {
        return message.reply('Lütfen bir rol adı veya ID si girin.');
    } else if (userRole.comparePositionTo(mentionedRole) <= 0) {
        return message.reply('Kendi rolünden yüksek bir rolü olan veya aynı rolü olan bir kişiye rol veremezsiniz.');
    } else {
        mentionedUser.roles.add(mentionedRole);
        return message.reply(`Başarıyla ${mentionedRole.name} rolü verildi.`);
    }
};

exports.conf = {
    aliases: []
};

exports.help = {
    name: 'rolver'
};

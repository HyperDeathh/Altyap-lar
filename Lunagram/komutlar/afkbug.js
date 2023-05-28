const ALLOWED_USERS = ['799976479030247435'];

exports.run = async (client, message, args, embed) => {
    if (!ALLOWED_USERS.includes(message.author.id)) return; // Sadece izin verilen kullanıcıların mesajlarını işleme

    const afkMembers = message.guild.members.cache.filter((member) => member.displayName.startsWith("[AFK]"));
    if (afkMembers.size < 1) {
      return message.reply("Sunucuda hiçbir kullanıcının isminde [AFK] tagı bulunmuyor.");
    }

    const promises = afkMembers.map(async (member) => {
      try {
        await member.setNickname(member.displayName.replace("[AFK] ", ""));
      } catch (error) {
        console.error(`[AFK BUG] ${error}`);
      }
    });

    await Promise.all(promises);
    return message.reply(`Tüm kullanıcılardaki [AFK] tagı başarıyla kaldırıldı.`);
  }
exports.conf = {
    aliases: []
}

exports.help = {
    name: "afkbug"
};


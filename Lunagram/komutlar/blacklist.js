const db = require("orio.db");

exports.run = async (client, message, args) => {
  const developer = [
    "799976479030247435"
  ];

  if (!developer.includes(message.author.id)) return;

  const member = message.guild.members.cache.get(args[1]);

  if (!args[0])
    return message.channel.send(`Yanlış kullanım = \`at | çıkar\``);

  if (args[0] === "at") {
    if (!member) return message.channel.send(`Bir ID yazmalısın.`);

    const data = db.get(`blacklist.${member.id}`);

    if (data === true) return message.channel.send(`Zaten blacklist'e bulunuyor.`);

    message.channel.send(`Başarıyla ${member.user.tag} blackliste atıldı.`);
    await db.set(`blacklist.${member.id}`, true);
  }

  if (args[0] === "çıkar") {
    if (!member) return message.channel.send(`Bir ID yazmalısın.`);

    const data = db.get(`blacklist.${member.id}`);

    if (data === false) return message.channel.send(`Zaten blacklist'e bulunmuyor.`);

    message.channel.send(`Başarıyla ${member.user.tag} blacklisten çıkartıldı.`);
    await db.set(`blacklist.${member.id}`, false);
  }
};

exports.conf = {
  aliases: [],
};

exports.help = {
  name: "blacklist",
};

const canvafy = require("canvafy");

exports.run = async (client, message, args) => {
    let member;
    if (!args.length) { 
      const members = message.guild.members.cache.filter(member => !member.user.bot); 
      if (!members.size) return message.reply("Sunucuda üye yok!"); //hata
      member = members.random().user; 
    } else {
      member = message.mentions.members.first() || message.guild.members.cache.find(member => member.displayName.toLowerCase().includes(args[0].toLowerCase())) 
      if (!member) {
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args[0].toLowerCase())
        if (role) {
          const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id)).map(member => member.user)
          if (membersWithRole.length === 0) return message.reply(`"${role.name}" rolüne sahip üye bulunamadı.`)
          member = membersWithRole[Math.floor(Math.random() * membersWithRole.length)]
        } else {
          return message.reply({ content: "Lütfen birini etiketle, ismini yaz veya bir rol adı gir." })
        }
      }
    }

  const ship = await new canvafy.Ship()
    .setAvatars(message.author.displayAvatarURL({ forceStatic: true, extension: "png" }), member.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", "https://th.bing.com/th/id/R.248b992f15fb255621fa51ee0ca0cecb?rik=K8hIsVFACWQ8%2fw&pid=ImgRaw&r=0")
    .setBorder("#f0f0f0")
    .setOverlayOpacity(0.5)
    .build();
  message.reply({
    content: `**${message.author.username}** ile **${member.username}**`,
    files: [{
      attachment: ship.toBuffer(),
      name: `ship-${message.member.id}.png`
    }]
  })

};

exports.conf = {
  aliases: ["s"]
}

exports.help = {
  name: "ship"
};
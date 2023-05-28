exports.run = async (client, message, args) => {
    if (message.author.id !== '799976479030247435') {
      return message.reply('La sen hayırdır gizli iş çevirion.');
    }
  
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const role = message.guild.roles.cache.find(role => role.name === args[1]) || message.guild.roles.cache.get(args[1]);
      
    if (!member) {
      return message.reply('Lütfen bir kullanıcı etiketleyin veya ID girin.');
    } else if (!role) {
      return message.reply('Lütfen bir rol adı veya ID si girin.');
    } else {
      await member.roles.add(role);
      await message.delete(); // Kullanıcının komutunu silmek için
      const botMessage = await message.reply(`Başarıyla ${role.name} rolü verildi.`);
      botMessage.delete({timeout: 5000}); // Botun mesajını 5 saniye sonra otomatik olarak silmek için
    }
  };
    
  exports.conf = {
    aliases: []
  };
    
  exports.help = {
    name: 'gizlirolver'
  };
  
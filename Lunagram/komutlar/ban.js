
exports.run = async (client, message, args) => {

    if (!message.member.permissions.has("0x0000000000000004"))
    return message.reply({ content: "> :x: **Başarısız!** Ban yetkin yok dostum." }).catch((err) => {});
    
    let me = message.guild.members.cache.get(client.user.id);
    if (!me.permissions.has("0x0000000000000004"))
    return message.reply({ content: "> :x: **Başarısız!** Benim ban yetkim yok loooooooooooooo" }).catch((err) => {});
    
    let sebep = args.slice(1).join(" ") || "Belirtilmemiş";
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || {id: args[0]}
    
    if (!member) return message.reply({content: "> :x: **Başarısız!** Kimin ensesine çökiyim etiketlemen gerek." }).catch((err) => {});
    
    if (message.guild.ownerId === member.id) return message.reply({ content: "> :x: **Başarısız!** Sunucu sahibini banlamak mı? Yürek yedin mi diye hiç sormıyacağım, yediğin belli." }).catch((err) => {});
    if (message.author.id === member.id)return message.reply({ content: "> :x: **Başarısız!** Knka kendini banlamak yerine sunucudan çıksan daha iyi olur beni de yormamış olursun 🥱" }).catch((err) => {});
    if (client.user.id === member.id) return message.reply({ content: "> :x: **Başarısız!** Beni mi banlıyacaksın :(" }).catch((err) => {});
    
    if (message.guild.ownerId !== message.author.id) {
    if ((member.roles?.highest?.position || -1) >= message.member.roles.highest.position) return message.reply({ content: "> :x: **Başarısız!** Knka kullanıcının rolü senden yüksek dikkat et o seni banlamasın 🤭" }).catch((err) => {});
    }
    
    if ((member.roles?.highest?.position || -1) >= me.roles.highest.position)return message.reply({ content: "> :x: **Başarısız!** Kullanıcının rolü benim rolümden yüksek." }).catch((err) => {});

    
    message.guild.members.ban(member.id, { reason: `By: ${message.author.tag} Reason: ` + sebep || "Belirtilmemiş" }).then(() => {
    message.reply({ content: `> ✅ **Başarılı!** Kullanıcı başarıyla sunucudan banlandı!` })
    }).catch((e) => {
    message.reply({ content: `> :x: **Başarısız!** Kimin ensesine çökiyim etiketlemen gerek` });
    });
    
    }


    exports.conf = {
    aliases: []
    };
    
    exports.help = {
    name: "ban"
    }
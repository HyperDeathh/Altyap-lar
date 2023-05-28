const { EmbedBuilder } = require('discord.js');


exports.run = async (client, message, args) => {
    if (!message.member.permissions.has("0x0000000000002000"))
    return message.reply({ content: "> :x: **Başarısız!** Sil yetkin yok dostum." }).catch((err) => {});
    const amount = parseInt(args[0]) - 1;

    if (isNaN(amount) || amount < 0 || amount > 100) {
        const invalidAmount = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Geçersiz Miktar')
            .setDescription('Lütfen 1-100 arası geçerli bir miktar belirtin.')
            .setTimestamp();
        return message.channel.send({ embeds: [invalidAmount] });
        setTimeout(() => {
            invalidAmount.delete();
        }, 5000);
    }

    await message.channel.bulkDelete(amount + 2, true).catch((err) => {
        const deleteError = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Silme Hatası')
            .setDescription('Mesajları silerken bir hata oluştu: ' + err)
            .setTimestamp();
        return message.channel.send({ embeds: [deleteError] });
        setTimeout(() => {
            deleteError.delete();
        }, 5000);
    });

    const successMessage = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Başarılı')
        .setDescription(`Başarıyla **${amount + 1}** mesaj silindi!`)
        .setTimestamp();
    const successMsg = await message.channel.send({ embeds: [successMessage] });
    setTimeout(() => {
        successMsg.delete();
    }, 5000);
};
exports.help = {
    name: 'sil',
    description: 'Belirtilen kadar mesajı siler.',
    usage: 'sil <1-100 arası bir sayı>',
};
exports.conf = {
    aliases:[]
};
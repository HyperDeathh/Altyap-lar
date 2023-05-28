const { MessageEmbed } = require('discord.js');

exports.run = async (client, message, args) => {
    const prefix = '.';
    const commands = [
        { name: '**mesaj-log-ayarla** (mla)', description: 'Silinen veya düzenlenen tüm mesajların logunu tutar.' },
        { name: '**kanal-log-ayarla** (kla)', description: 'Kanalın silinmesi, düzenlenmesi yada yeni kanal oluşturulduğunda logunu tutar.' },
        { name: '**ban-log-ayarla** (bla)', description: 'Banlanan ve banı kaldırılan kullanıcıların logunu tutar' },
        { name: '**rol-log-ayarla** (rla)', description: 'Rol oluşturma, düzenleme, silme, kullanıcıya rol verme, rol alma loglarını tutar.' },
        { name: '**pp-log-ayarla** (pla)', description: 'Değiştirilen profil fotoğraflarının kaydını alır. Açmak için kullanıp ardından Rhaegar#7777 dm gelin.' },
        { name: '**ses-log-ayarla** (sla)', description: 'Sese giren, çıkan, ses değiştiren kişilerin logunu tutar.' },
        { name: '**tepki-log-ayarla** (tla)', description: 'Bir mesaja eklenilen tepkilerin kullanıcı ayrıntılarıyla logunu tutar.' },
        { name: '**webhook-log-ayarla** (wla)', description: '**BAKIMDA**' },
        { name: '**thread-log-ayarla** (thla)', description: '**BAKIMDA**' },
        { name: '**emoji-log-ayarla** (ela)', description: 'Silinen, eklenen, düzenlenen emojilerin logunu tutar.' },
        { name: '**davet-log-ayarla** (dla)', description: 'Oluşturulan ve silinen davet linklerinin logunu tutar' },
        { name: '**durum-log-ayarla** (dula)', description: 'Bir kullanıcı çevrimiçi özelliğini değiştirme logunu tutar.' },
        { name: '**sunucu-log-ayarla** (sula)', description: 'Sunucuda ki ayarlarından birisi değişirse logu tutar.' },
        { name: '**logkanallar**', description: 'belirttiğiniz log kanallarını listeler.' },
        { name: '**logsil**', description: 'Log kanalını siler. Detaylı bilgi için => **.yardım logsil**' },
        { name: '**tümlogsil**', description: 'belirlediğiniz tüm log kanallarını sıfırlar.'}
    ];
    const logTypes = [
      { name: '**logsil mesajlog**', description: 'Belirlediğiniz **mesaj** logu kanalını iptal eder.' },
      { name: '**logsil banlog**', description: 'Belirlediğiniz **ban** logu kanalını iptal eder.' },
      { name: '**logsil emojilog**', description: 'Belirlediğiniz **emoji** logu kanalını iptal eder.' },
      { name: '**logsil kanallog**', description: 'Belirlediğiniz **kanal** logu kanalını iptal eder.' },
      { name: '**logsil linklog**', description: 'Belirlediğiniz **davet linki** logu kanalını iptal eder.' },
      { name: '**logsil durumlog**', description: 'Belirlediğiniz **durum** logu kanalını iptal eder.' },
      { name: '**logsil tepkilog**', description: 'Belirlediğiniz **tepki** logu kanalını iptal eder.' },
      { name: '**logsil rollog**', description: 'Belirlediğiniz **rol** logu kanalını iptal eder.' }, 
      { name: '**logsil sunuculog**', description: 'Belirlediğiniz **sunucu** logu kanalını iptal eder.' },
      { name: '**logsil webhooklog**', description: 'Belirlediğiniz **webhook** logu kanalını iptal eder.' },
      { name: '**logsil threadlog**', description: 'Belirlediğiniz **threadlog** logu kanalını iptal eder.' },
      { name: '**logsil voicelog**', description: 'Belirlediğiniz **voice** logu kanalını iptal eder.' }
    ];

    if (!args[0]) {
      const embed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Komutlar Hakkında Yardım')
        .setDescription(`Aşağıdaki komutları kullanabilirsiniz. Komutların yanında parantez içinde bulunan idler kullanım kolaylaştırmak içindir. **Örnek:** .mla #kanal.\n**Uyarı:** Bazı loglar çok kişilik sunucularda sıkıntı çıkartabilir!`)
        .setFooter(`Prefix: ${prefix}`);

      commands.forEach((command) => {
        embed.addField(`${prefix}${command.name}`, command.description);
      });

      return message.channel.send(embed);
    }
    if (args[0] === 'logsil') {
      const logSilEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('logsil Komutu')
        .setDescription('`**.logsil**` komutu, belirtilen log türünü silmek için kullanılır. (Komutları kullanırken hepsini küçük yazınız)')
        .setFooter(`Prefix: ${prefix}`);
  
      logTypes.forEach((logType) => {
        logSilEmbed.addField(`${prefix}${logType.name}`, logType.description);
      });
  
      return message.channel.send(logSilEmbed);
    }
  };

exports.conf = {
    aliases: ['yardım']
}

exports.help = {
    name: "help"
};

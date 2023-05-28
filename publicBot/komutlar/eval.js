const { inspect } = require('util');

exports.run = async (client, message, args) => {
    if (message.author.id !== '799976479030247435') return;

    const code = args.join(' ');
    if (!code) return message.reply('Lütfen bir şeyler yazın ki onu çalıştırayım.');

    try {
        const result = await eval(code);
        let output = result;
        if (typeof result !== 'string') {
            output = inspect(result);
        }
        message.channel.send(output, { code: 'js' });
    } catch (error) {
        console.log(error);
        message.channel.send('Eval işlemi çok uzun sürdü!');
    }
};

    exports.help = {
        name: 'eval'
    };

    exports.conf = {
        aliases: [],
        permLevel: 0
    };

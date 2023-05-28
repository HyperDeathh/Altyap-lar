module.exports = {
    TOKEN: "MTA4NjU5Nzc5OTgxNjIwODQyNA.GcX7YA.ADxI72q-ByIlyLRG5UawwVY2WcAan3-a2G9ykY",
    ownerID: ["799976479030247435"], //write your discord user id. example: ["id"] or ["id1","id2"]
    botInvite: "https://discord.com/api/oauth2/authorize?client_id=1086597799816208424&permissions=8&scope=bot", //write your discord bot invite.
    supportServer: "https://imghost.pics/invite.php?id=UPNTLK", //write your discord bot support server invite.
    mongodbURL: "mongodb+srv://timarhanemusic:4wMPOMw6BzJI9j2v@cluster0.n22jlvi.mongodb.net/?retryWrites=true&w=majority", //write your mongodb url.
    status: '/play',
    commandsDir: './commands', //Please don't touch
    language: "tr", //en, tr, nl, pt, fr, ar, zh_TW, it
    embedColor: "ffa954", //hex color code
    errorLog: "1098223985587654740", //write your discord error log channel id.
    
    
    sponsor: {
    status: false, //true or false
    url: "https://google.com", //write your discord sponsor url.
    },
    
    voteManager: { //optional
    status: false, //true or false
    api_key: "", //write your top.gg api key. 
    vote_commands: ["back","channel","clear","dj","filter","loop","nowplaying","pause","play","playlist","queue","resume","save","search","skip","stop","time","volume"], //write your use by vote commands.
    vote_url: "", //write your top.gg vote url.
    },
    shardManager:{
    shardStatus: false //If your bot exists on more than 1000 servers, change this part to true.
    },
    
    playlistSettings:{
    maxPlaylist: 10, //max playlist count
    maxMusic: 75, //max music count
    },
    
    opt: {
    DJ: {
    commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume', 'shuffle'] //Please don't touch
    },
    
    voiceConfig: {
    leaveOnFinish: true, //If this variable is "true", the bot will leave the channel the music ends.
    leaveOnStop: true, //If this variable is "true", the bot will leave the channel when the music is stopped.
    
    leaveOnEmpty: { //The leaveOnEnd variable must be "false" to use this system.
    status: true, //If this variable is "true", the bot will leave the channel when the bot is offline.
    cooldown: 20000, //1000 = 1 second
    },
    
    },
    
    maxVol: 150, //You can specify the maximum volume level.
    
    }
    }
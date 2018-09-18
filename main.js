//HTTP-Express-BodyParser-Path
var http = require('http');

setInterval(() => {
    http.get('http://zillabotgamma.herokuapp.com/');
}, 1000*60*10);

const express = require('express');
var port = process.env.PORT||8080;

const bodyParser = require('body-parser');
const path = require('path');
 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/aboutzillafam', (req, res) => {
    res.sendFile(__dirname + '/aboutzillafam.html');
})

app.get('/joinzillafam', (req, res) => {
    res.sendFile(__dirname + '/joinzillafam.html');
});

app.post('/applied', (req, res) => {
    requestzilla.send({embed: {
        color: 0xCBFDFC,
        description: 'A user requests to join Zilla Fam',
        fields: [
            {
                name: 'Username:',
                value: req.body.username
            },
            {
                name: 'ID:',
                value: req.body.id
            },
            {
                name: 'Description:',
                value: req.body.description
            }
        ],
        footer: {
            text: 'IP address: ' + req.ip
        }
    }});
    res.redirect('/submitted');
});

app.get('/submitted', (req, res) => {
    res.sendFile(__dirname + '/submitted.html');
});

app.listen(port, () => {
    console.log('Listening on Port ' + port);
});

//Google and YTDL-Core

const google = require('google');
const ytdl = require('ytdl-core');

//ClashOfClans API

const clashApi = require('clash-of-clans-api');
const coctoken = require('./Confidential/coctoken.json');

const client = clashApi({
    token: coctoken.hp
});

const zbgsword = '<:zbgsword:491145706527129610>';
const zbgswordbroken = '<:zbgswordbroken:491149383161741332>';
const zbgaxe = '<:zbgaxe:491678714736672768>';
const zbgshield = '<:zbgshield:484296508775071744>';
const zbgshieldbroken = '<:zbgshieldbroken:484296563418464256>';
const zbgcocstarempty = '<:zbgcocstarempty:484275771784036354>';
const zbgcocstarfull = '<:zbgcocstarfull:484275745728888832>';
const zbgcocstarnew = '<:zbgcocstarnew:485749764701421568>';
const zbgdonate = '<:zbgdonate:491641211761721364>';
const zbgreceive = '<:zbgreceive:491641238710386688>';

const zbgcup = '<:zbgcup:491619880152334336>';
const zbgbuildercup = '<:zbgbuildercup:491619992824184832>';

const th = [
    'dum',
    '<:th1:491612093079093249>',
    '<:th2:491612107008376842>',
    '<:th3:491612121356828674>',
    '<:th4:491612135290437634>',
    '<:th5:491612167892762636>',
    '<:th6:491612194857812008>',
    '<:th7:491612225459585024>',
    '<:th8:491612242249383937>',
    '<:th9:491612259009953803>',
    '<:th10:491612277330542613>',
    '<:th11:491612293411635226>',
    '<:th12:491612306929876992>'
];

const bh = [
    'dum',
    '<:bh1:491612804881580032>',
    '<:bh2:491612821621178379>',
    '<:bh3:491612838453051392>',
    '<:bh4:491612853518729227>',
    '<:bh5:491612867762585610>',
    '<:bh6:491612882522341386>',
    '<:bh7:491612897924087820>',
    '<:bh8:491612912004235274>'
];

function getEmojiLink(emote) {
    var id = emote.slice(emote.length-19, emote.length-1);
    return `https://cdn.discordapp.com/emojis/${id}.png`;
}

//Discord

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./Confidential/discordtoken.json');

var responseMessage = require('./Messages/msghandle.js').responseMessage;
var reactEmoji = require('./Messages/msghandle.js').reactEmoji;

var zillaguild;
var logzilla;
var musiczilla;
var populationchannel;
var requestzilla;

//Ready

bot.on('ready', () => {
    console.log('I am ready to be OP!');
    bot.user.setActivity('the OPness radiation', {type: 'STREAMING', url: 'https://www.twitch.tv/prittclash'});

    zillaguild = bot.guilds.get('390547531634966530');

    requestzilla = bot.channels.get('486592940899303445');

    populationchannel = bot.channels.get('484967681871577088');
    populationchannel.setName('Members count: ' + zillaguild.memberCount);

    logzilla = bot.channels.get('409928557469630464');

    musiczilla = bot.channels.get('392990490317946882');
    musiczilla.leave();    
});

//

//Message

//

bot.on('message', (message) => {
    var sentmessage = responseMessage(message, bot);

    if(sentmessage.text != 'None') {
        message.channel.send(sentmessage.text);
    }

    if(sentmessage.usertoban) {
        sentmessage.usertoban.ban();
    }

    if(sentmessage.usertokick) {
        sentmessage.usertokick.kick();
    }

    if(message.content.startsWith('Z!get-invite')) {
        var ruleszilla = bot.channels.get('419886005605236736');
        ruleszilla.createInvite({
            maxUses: 1
        }).then(invite => {
            message.channel.send('One time use invite link: ' + invite);
        }).catch(err => {
            console.log(err);
            message.channel.send('An error occured while creating the invite, please check the console');
        });
    }

    if(message.content.startsWith('Z!unban')) {
        if(message.member.roles.get('434642446761066506')) {
            var query = message.content.slice(8, message.content.length);
            var unbanuserid;

            if(query.length == 18) {
                unbanuserid = query;
            }
            else if((query.length == 22) || (query.length == 21)){
                unbanuserid = query.slice(query.length - 19, query.length - 1);
            }

            zillaguild.fetchBans()
            .then(collection => {
                var unbanuser = collection.get(unbanuserid);
                message.channel.send('***' + unbanuser.username + '#' + unbanuser.discriminator + '*** has been unbanned.');
                zillaguild.unban(unbanuserid);
            })
            .catch(err => {
                console.log(err);
                message.channel.send('An unexpected error occured as a promise was rejected. Please check the logs.');
            });
        }
        else {
            return {
                text: 'Nice try. You can\'t unban members without having the **Admin** role.'
            }
        }
    }

    var isplaying = false;
    if((message.content.startsWith('Z!play')) && (isplaying == false)) {
        var query = message.content.slice(7, message.content.length);
        var href;
        var atext;
        var ytid;
        isplaying = true;

        google(query + ' site:youtube.com', (err, res) => {
            if(err) console.log(err);
            
            for(var i=0; i<res.links.length; i++) {
                if(res.links[i].href != null) {
                    href = res.links[i].href;
                    ytid = href.slice(32, href.length);
                    atext = `<:zbgmusic:491619439230582784> Now playing **` + res.links[i].title +`**`;
                    break;
                }
            }

            var streamOptions = {seek: 0, volume: 1};

            musiczilla.join()
            .then(connection => {
                var stream = ytdl(href, {filter : 'audioonly'});
                var dispatcher = connection.playStream(stream, streamOptions);
                message.channel.send({embed: {
                    color: 0xCBFDFC,
                    description: atext,
                    image: {
                        url: `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`
                    }
                }});
                isplaying = true;
                dispatcher.on('end', end => {
                    setTimeout(() => {
                        message.channel.send({embed: {
                            color: 0xCBFDFC,
                            description: '<:zbgmusic:491619439230582784> Song concluded. Leaving voice channel.'
                        }});
                        musiczilla.leave();
                        isplaying = false;
                    }, 500);
                });
            })
            .catch(console.error);
        });
    }
    else {
        if(message.content.startsWith('Z!play')) {
            message.channel.send('A song is already playing! Wait for it to end!');
        }
    }

    if(message.content == 'Z!stop-playing') {
        if(message.author.id == '334911278298562561') {
            musiczilla.leave();
            isplaying = false;
        }
        else {
            message.channel.send('You dont have permissions to stop songs!');
        }
    }

    if(message.content.startsWith('Zc!')) {
        var command = message.content.slice(3, message.content.length);

        if(command.startsWith('playerinfo')) {
            var query = command.slice(11, command.length);
            if(query.startsWith('#')) {
                client
                    .playerByTag(query)
                    .then(response => {
                        var maintroopres = '';
                        var i=0;

                        var buildertroopres = '';
                        var j=response.troops.length - 1;

                        var spellres = '';
                        var k=0;

                        var mainherores = '';
                        var m=0;
                        
                        while(response.troops[i].village == 'home') {
                            maintroopres = maintroopres + `*${response.troops[i].name}:* lvl${response.troops[i].level}\n`;
                            i++;
                        }

                        while(response.troops[j].village == 'builderBase') {
                            buildertroopres = `*${response.troops[j].name}:* lvl${response.troops[j].level}\n` + buildertroopres;
                            j--;
                        }

                        while(response.spells[k]) {
                            spellres = spellres + `*${response.spells[k].name}:* lvl${response.spells[k].level}\n`;
                            k++;
                        }

                        while(response.heroes[m]) {
                            mainherores = mainherores + `*${response.heroes[m].name}:* lvl${response.heroes[m].level}\n`;
                            m++;
                        }

                        if(response.league == undefined) {
                            message.channel.send({embed: {
                                color: 0xCBFDFC,
                                author: {
                                    name: response.name,
                                    icon_url: 'https://vignette.wikia.nocookie.net/clashofclans/images/c/c0/Unranked_League.png'
                                },
                                thumbnail: {
                                    url: getEmojiLink(th[response.townHallLevel])
                                },
                                fields: [
                                    {
                                        name: 'Tag:',
                                        value: response.tag
                                    },
                                    {
                                        name: 'XP:',
                                        value: response.expLevel
                                    },
                                    {
                                        name: 'Townhall level:',
                                        value: response.townHallLevel
                                    },
                                    {
                                        name: 'Main base trophies:',
                                        value: `${zbgcup} ` + response.trophies,
                                    },
                                    {
                                        name: 'Attack Wins:',
                                        value: `${zbgsword} ` + response.attackWins,
                                        inline: true,
                                    },
                                    {
                                        name: 'Defense Wins:',
                                        value: `${zbgshield} ` + response.defenseWins,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troops donated:',
                                        value: `${zbgdonate} ` + response.donations,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troops received:',
                                        value: `${zbgreceive} ` + response.donationsReceived,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troop levels:',
                                        value: maintroopres
                                    },
                                    {
                                        name: 'Spell levels:',
                                        value: spellres
                                    },
                                    {
                                        name: 'Hero levels:',
                                        value: mainherores
                                    }
                                ]
                            }});
                            message.channel.send({embed: {
                                color: 0xCBFDFC,
                                thumbnail: {
                                    url: getEmojiLink(bh[response.builderHallLevel])
                                },
                                fields: [
                                    {
                                        name: 'Builder hall level:',
                                        value: response.builderHallLevel
                                    },
                                    {
                                        name: 'Builder base trophies:',
                                        value: `${zbgbuildercup} ` + response.versusTrophies
                                    },
                                    {
                                        name: 'Versus battle wins:',
                                        value: `${zbgaxe} ` + response.versusBattleWins
                                    },
                                    {
                                        name: 'Builder Troop levels:',
                                        value: buildertroopres
                                    }
                                ],
                                timestamp: new Date(),
                                footer: {
                                    text: `Requested by ${message.author.username}`,
                                    icon_url: message.author.avatarURL
                                }
                            }});
                        }
                        else {
                            message.channel.send({embed: {
                                color: 0xCBFDFC,
                                author: {
                                    name: response.name,
                                    icon_url: response.league.iconUrls.medium
                                },
                                thumbnail: {
                                    url: getEmojiLink(th[response.townHallLevel])
                                },
                                fields: [
                                    {
                                        name: 'Tag:',
                                        value: response.tag
                                    },
                                    {
                                        name: 'XP:',
                                        value: response.expLevel
                                    },
                                    {
                                        name: 'Townhall level:',
                                        value: response.townHallLevel
                                    },
                                    {
                                        name: 'Main base trophies:',
                                        value: `${zbgcup} ` + response.trophies,
                                    },
                                    {
                                        name: 'Attack Wins:',
                                        value: `${zbgsword} ` + response.attackWins,
                                        inline: true,
                                    },
                                    {
                                        name: 'Defense Wins:',
                                        value: `${zbgshield} ` + response.defenseWins,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troops donated:',
                                        value: `${zbgdonate} ` + response.donations,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troops received:',
                                        value: `${zbgreceive} ` + response.donationsReceived,
                                        inline: true,
                                    },
                                    {
                                        name: 'Troop levels:',
                                        value: maintroopres
                                    },
                                    {
                                        name: 'Spell levels:',
                                        value: spellres
                                    },
                                    {
                                        name: 'Hero levels:',
                                        value: mainherores
                                    }
                                ]
                            }});
                            message.channel.send({embed: {
                                color: 0xCBFDFC,
                                thumbnail: {
                                    url: getEmojiLink(bh[response.builderHallLevel])
                                },
                                fields: [
                                    {
                                        name: 'Builder hall level:',
                                        value: response.builderHallLevel
                                    },
                                    {
                                        name: 'Builder base trophies:',
                                        value: `${zbgbuildercup} ` + response.versusTrophies
                                    },
                                    {
                                        name: 'Versus battle wins:',
                                        value: `${zbgaxe} ` + response.versusBattleWins
                                    },
                                    {
                                        name: 'Builder Troop levels:',
                                        value: buildertroopres
                                    }
                                ],
                                timestamp: new Date(),
                                footer: {
                                    text: `Requested by ${message.author.username}`,
                                    icon_url: message.author.avatarURL
                                }
                            }});
                        }
                    })
                    .catch(err => console.log(err));
            }
            else {
                message.channel.send('Please give a proper player ID');
            }
        }
        
    }

    var reactedemoji = reactEmoji(message.content);
    if((reactedemoji != 'None') && (message.author != bot.user)) {
        for(var i=0; i<reactedemoji.length; i++) {
            message.react(reactedemoji[i]);
        }
    }
});

bot.login(token.value);
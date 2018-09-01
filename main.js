//HTTP-Express-BodyParser-Path
var http = require('http');

setInterval(() => {
    http.get('http://zillabotgamma.herokuapp.com/');
    console.log('Pinging app');
}, 1000*60*10);

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080, () => {
    console.log('Listening on Port 8080');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/applied', (req, res) => {
    requestzilla.send({embed: {
        color: 0xCBFDFC,
        fields: [
            {
                name: 'Name:',
                value: req.body.lol
            }
        ],
        footer: {
            text: 'IP address: ' + req.ip
        }
    }});
    res.redirect('/');
});

//Google and YTDL-Core

const google = require('google');
const ytdl = require('ytdl-core');

//Discord

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./Confidential/token.json');

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
    logzilla = bot.channels.get('409928557469630464');
    musiczilla = bot.channels.get('392990490317946882');
    musiczilla.leave();

    zillaguild = bot.guilds.get('390547531634966530');

    populationchannel = bot.channels.get('484967681871577088');
    populationchannel.setName('Members count: ' + zillaguild.memberCount);

    requestzilla = bot.channels.get('388244076685688834');
});

//Member Join

bot.on('guildMemberAdd', (member) => {
    populationchannel.setName('Members count: ' + zillaguild.memberCount);
});

//Member Leave

bot.on('guildMemberRemove', (member) => {
    populationchannel.setName('Members count: ' + zillaguild.memberCount);
});

//Message

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
                    atext = `<:zbgmusic:484702955568758794> Now playing **` + res.links[i].title +`**`;
                    break;
                }
            }

            var streamOptions = {seek: 0, volume: 1};

            musiczilla.join()
            .then(connection => {
                message.channel.send({embed: {
                    color: 0xCBFDFC,
                    description: atext,
                    image: {
                        url: `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`
                    }
                }});
                var stream = ytdl(href, { filter : 'audioonly' });
                var dispatcher = connection.playStream(stream, streamOptions);
                isplaying = true;
                dispatcher.on('end', end => {
                    setTimeout(() => {
                        message.channel.send({embed: {
                            color: 0xCBFDFC,
                            description: '<:zbgmusic:484702955568758794> Song concluded. Leaving voice channel.'
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

    var reactedemoji = reactEmoji(message.content);
    if((reactedemoji != 'None') && (message.author != bot.user)) {
        for(var i=0; i<reactedemoji.length; i++) {
            message.react(reactedemoji[i]);
        }
    }
});

bot.login(token.value);
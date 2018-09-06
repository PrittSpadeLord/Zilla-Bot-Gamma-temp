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

    requestzilla = bot.channels.get('486592940899303445');
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
                    atext = `<:zbgmusic:484702955568758794> Now playing **` + res.links[i].title +`**`;
                    break;
                }
            }

            var streamOptions = {seek: 0, volume: 1};

            musiczilla.join()
            .then(connection => {
                var stream = ytdl(href, { filter : 'audioonly' });
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
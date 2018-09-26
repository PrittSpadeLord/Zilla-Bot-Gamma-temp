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
        color: blueEmbed,
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
    token: coctoken.hp2
});

const roarzilla = '<:rawwwrrrr:432568571323744259>';
const dabzilla = '<:zilladab:392389485578420224>';
const ragezilla = '<:rage:493464259309600770>';

const zbgsword = '<:zbgsword:491145706527129610>';
const zbgswordbroken = '<:zbgswordbroken:491149383161741332>';
const zbgaxe = '<:zbgaxe:491678714736672768>';
const zbgshield = '<:zbgshield:484296508775071744>';
const zbgshieldbroken = '<:zbgshieldbroken:484296563418464256>';
const zbgcocstarempty = '<:zbgcocstarempty:484275771784036354>';
const zbgcocstarfull = '<:zbgcocstarfull:484275745728888832>';
const zbgcocstarnew = '<:zbgcocstarnew:492579407811313664>';
const zbgdonate = '<:zbgdonate:491641211761721364>';
const zbgreceive = '<:zbgreceive:491641238710386688>';

const zbgcup = '<:zbgcup:491619880152334336>';
const zbgbuildercup = '<:zbgbuildercup:491619992824184832>';
const legendcup = '<:legendcup:492327906412855297>';

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

var myteam = [];

function getEmojiLink(emote) {
    var id = emote.slice(emote.length-19, emote.length-1);
    return `https://cdn.discordapp.com/emojis/${id}.png`;
}

String.prototype.insertAt = function(index, string) { 
    return this.substr(0, index) + string + this.substr(index);
}

//Discord

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = require('./Confidential/discordtoken.json');

const blueEmbed = 0xCBFDFC;
const greenEmbed = 0xCBFDCB;
const greyEmbed = 0xCBCBCB;
const redEmbed = 0xFDCBCB;

var responseMessage = require('./Messages/msghandle.js').responseMessage;
var reactEmoji = require('./Messages/msghandle.js').reactEmoji;

var zillaguild;
var logzilla;
var musiczilla;
var populationchannel;
var requestzilla;
var warfeedzilla;
var clanrecogzilla;
var twitterzilla;

var warannouncement = '';

var oldWarData;
var first = true;
var attackfirst = true;

//Ready

bot.on('ready', () => {
    console.log('I am ready to be OP!');

    //

    bot.user.setActivity('the OPness radiation', {type: 'STREAMING', url: 'https://www.twitch.tv/prittclash'});

    //

    zillaguild = bot.guilds.get('390547531634966530');

    //

    requestzilla = bot.channels.get('486592940899303445');

    //

    populationchannel = bot.channels.get('484967681871577088');
    populationchannel.setName('Members count: ' + zillaguild.memberCount);

    //

    logzilla = bot.channels.get('409928557469630464');

    //

    musiczilla = bot.channels.get('392990490317946882');
    musiczilla.leave();
    
    //

    warfeedzilla = bot.channels.get('492389323698864137');
    clanrecogzilla = bot.channels.get('492389323698864137');
    
    var warData;
    var oldAttacks = [];

    setInterval(() => {
        client
        .clanCurrentWarByTag('#20GVU20LY') //#22G2GG80R
        .then(response => {
            warData = response;
            if(first == true) {
                oldWarData = warData;
                first = false;
            }

            else {
                if((warData.state == 'preparation') && (oldWarData.state == 'notInWar')) {
                    // WAR HAS BEEN DECLARED
                    
                    var ourteam = '', oppdisplay = '';
                    oppth = [];
                    oppth[0] = 'dum';
                    for(var k=1; k<=12; k++) {
                        oppth[k] = 0;
                    }
                    var i=1;

                    while(warData.clan.members[i-1] != undefined) {
                        for(var l=0; l<warData.clan.members.length; l++) {
                            if(warData.clan.members[l].mapPosition == i) {
                                ourteam = ourteam + `${i}. ${warData.clan.members[l].name} ${th[warData.clan.members[l].townhallLevel]}\n`;
                                myteam[i-1] = warData.clan.members[l].name;
                                i++;
                            }
                        }
                    }

                    for(var l=0; l<warData.opponent.members.length; l++) {
                        oppth[warData.opponent.members[l].townhallLevel] = oppth[warData.opponent.members[l].townhallLevel] + 1;
                    }

                    for(var l=oppth.length-1; l>=1; l--) {
                        if(oppth[l] != 0) {
                            oppdisplay = oppdisplay + `${th[l]}x${oppth[l]}, `;
                        }
                    }
                    oppdisplay = oppdisplay.slice(0, oppdisplay.length - 2);

                    warfeedzilla.send({embed: {
                        author: {
                            name: warData.clan.name,
                            icon_url: warData.clan.badgeUrls.small
                        },
                        color: blueEmbed,
                        title: `War has been declared against ${warData.opponent.name}`,
                        thumbnail: {
                            url: warData.opponent.badgeUrls.large
                        },
                        description: '**Our clan:**\n\n' + ourteam,
                        fields: [
                            {
                                name: 'Opponent clan composition: ',
                                value: oppdisplay
                            }
                        ],
                        timestamp: response.startTime.insertAt(4, '-').insertAt(7, '-').insertAt(13, ':').insertAt(16, ':'),
                        footer: {
                            text: `War will start `,
                            icon_url: bot.user.avatarURL
                        }
                    }});
                }
                
                if((warData.state == 'inWar') && (oldWarData.state == 'preparation')) {
                    // BATTLE DAY HAS BEGUN

                    if(warannouncement.length == 0) {
                        warannouncement = 'No announcement for this war';
                    }

                    warfeedzilla.send({embed: {
                        author: {
                            name: warData.clan.name,
                            icon_url: warData.clan.badgeUrls.small
                        },
                        color: blueEmbed,
                        title: `War against **${warData.opponent.name}** has begun!`,
                        fields: [
                            {
                                name: 'War announcement:',
                                value: warannouncement
                            }
                        ],
                        thumbnail: {
                            url: warData.opponent.badgeUrls.large
                        },
                        timestamp: response.endTime.insertAt(4, '-').insertAt(7, '-').insertAt(13, ':').insertAt(16, ':'),
                        footer: {
                            text: `War will end `,
                            icon_url: bot.user.avatarURL
                        }
                    }});                    
                }
                else if((warData.state == 'inWar') && (oldWarData.state == 'inWar')) {
                    // DURING WAR (lots of shit to do here)

                    var attacks = [];
                    var newAttacks = [];
                    
                    for(var i=0; i<warData.clan.members.length; i++) {
                        if(warData.clan.members[i].attacks != undefined) {
                            for(var j=0; j<warData.clan.members[i].attacks.length; j++) {
                                warData.clan.members[i].attacks[j].attackerName = warData.clan.members[i].name;
                                warData.clan.members[i].attacks[j].attackerTH = warData.clan.members[i].townhallLevel;
                                warData.clan.members[i].attacks[j].attackerPosition = warData.clan.members[i].mapPosition;
                                for(var k=0; k<warData.opponent.members.length; k++) {
                                    if(warData.opponent.members[k].tag == warData.clan.members[i].attacks[j].defenderTag) {
                                        warData.clan.members[i].attacks[j].defenderName = warData.opponent.members[k].name;
                                        warData.clan.members[i].attacks[j].defenderTH = warData.opponent.members[k].townhallLevel;
                                        warData.clan.members[i].attacks[j].defenderPosition = warData.opponent.members[k].mapPosition;
                                    }
                                }
                                warData.clan.members[i].attacks[j].ourAttack = true;
                                attacks.push(warData.clan.members[i].attacks[j]);
                            }
                        }
                    }
        
                    for(var i=0; i<warData.opponent.members.length; i++) {
                        if(warData.opponent.members[i].attacks != undefined) {
                            for(var j=0; j<warData.opponent.members[i].attacks.length; j++) {
                                warData.opponent.members[i].attacks[j].attackerName = warData.opponent.members[i].name;
                                warData.opponent.members[i].attacks[j].attackerTH = warData.opponent.members[i].townhallLevel;
                                warData.opponent.members[i].attacks[j].attackerPosition = warData.opponent.members[i].mapPosition;
                                for(var k=0; k<warData.clan.members.length; k++) {
                                    if(warData.clan.members[k].tag == warData.opponent.members[i].attacks[j].defenderTag) {
                                        warData.opponent.members[i].attacks[j].defenderName = warData.clan.members[k].name;
                                        warData.opponent.members[i].attacks[j].defenderTH = warData.clan.members[k].townhallLevel;
                                        warData.opponent.members[i].attacks[j].defenderPosition = warData.clan.members[k].mapPosition;
                                    }
                                }
                                warData.opponent.members[i].attacks[j].ourAttack = false;
                                attacks.push(warData.opponent.members[i].attacks[j]);
                            }
                        }
                    }                    

                    if(attackfirst == true) {
                        oldAttacks = attacks;
                        attackfirst = false;
                    }
                    else {
                        //write deal with attacks here
                        if(attacks.length != oldAttacks.length) {
                            for(var i=0; i<attacks.length; i++) {
                                var istrue = true;
                                for(var j=0; j<oldAttacks.length; j++) {
                                    if((attacks[i].attackerTag == oldAttacks[j].attackerTag) && (attacks[i].defenderTag == oldAttacks[j].defenderTag))  {
                                        istrue = false;
                                    }
                                }
                                if(istrue == true) {
                                    newAttacks.push(attacks[i]);
                                }
                            }
                            
                            for(var k=0; k<newAttacks.length; k++) {
                                var embed = {
                                    color: 2,
                                    fields: [
                                        {
                                            name: '',
                                            value: '',
                                            inline: true
                                        },
                                        {
                                            name: '',
                                            value: '',
                                            inline: true
                                        },
                                        {
                                            name: '',
                                            value: '',
                                            inline: true
                                        }
                                    ]
                                };
            
                                if(newAttacks[k].stars == 3) {
                                    embed.fields[1].value = `${zbgcocstarfull}${zbgcocstarfull}${zbgcocstarfull}`;
                                }
                                else if(newAttacks[k].stars == 2) {
                                    embed.fields[1].value = `${zbgcocstarfull}${zbgcocstarfull}${zbgcocstarempty}`;
                                }
                                else if(newAttacks[k].stars == 1) {
                                    embed.fields[1].value = `${zbgcocstarfull}${zbgcocstarempty}${zbgcocstarempty}`;
                                }
                                else {
                                    embed.fields[1].value = `${zbgcocstarempty}${zbgcocstarempty}${zbgcocstarempty}`;
                                }
                                
                                if(newAttacks[k].ourAttack == true) {
                                    embed.fields[0].name = newAttacks[k].attackerName;
                                    embed.fields[1].name = `${th[newAttacks[k].attackerTH]} ${newAttacks[k].attackerPosition} vs ${newAttacks[k].defenderPosition} ${th[newAttacks[k].defenderTH]}`;
                                    embed.fields[2].name = newAttacks[k].defenderName;
                                    if(newAttacks[k].stars == 3) {
                                        embed.color = greenEmbed;
                                        embed.fields[0].value = `${zbgsword}\n${newAttacks[k].attackerTag}`;
                                        embed.fields[2].value = `${zbgshieldbroken}\n${newAttacks[k].defenderTag}`;
                                    }
                                    else if((newAttacks[k].stars == 2) || (newAttacks[k].stars == 1)) {
                                        embed.color = greyEmbed;
                                        embed.fields[0].value = `${zbgsword}\n${newAttacks[k].attackerTag}`;
                                        embed.fields[2].value = `${zbgshieldbroken}\n${newAttacks[k].defenderTag}`;
                                    }
                                    else {
                                        embed.color = redEmbed;
                                        embed.fields[0].value = `${zbgswordbroken}\n${newAttacks[k].attackerTag}`;
                                        embed.fields[2].value = `${zbgshield}\n${newAttacks[k].defenderTag}`;
                                    }
                                }
                                else {
                                    embed.fields[0].name = newAttacks[k].defenderName;
                                    embed.fields[1].name = `${th[newAttacks[k].defenderTH]} ${newAttacks[k].defenderPosition} vs ${newAttacks[k].attackerPosition} ${th[newAttacks[k].attackerTH]}`;
                                    embed.fields[2].name = newAttacks[k].attackerName;
                                    if(newAttacks[k].stars == 3) {
                                        embed.color = redEmbed;
                                        embed.fields[0].value = `${zbgshieldbroken}\n${newAttacks[k].defenderTag}`;
                                        embed.fields[2].value = `${zbgsword}\n${newAttacks[k].attackerTag}`;
                                    }
                                    else if((newAttacks[k].stars == 2) || (newAttacks[k].stars == 1)) {
                                        embed.color = greyEmbed;
                                        embed.fields[0].value = `${zbgshieldbroken}\n${newAttacks[k].defenderTag}`;
                                        embed.fields[2].value = `${zbgsword}\n${newAttacks[k].attackerTag}`;
                                    }
                                    else {
                                        embed.color = greenEmbed;
                                        embed.fields[0].value = `${zbgshield}\n${newAttacks[k].defenderTag}`;
                                        embed.fields[2].value = `${zbgswordbroken}\n${newAttacks[k].attackerTag}`;
                                    }
                                }
            
                                warfeedzilla.send({embed: embed});
                            }
                        }

                        oldAttacks = attacks;
                    }
                }
                else if((warData.state == 'warEnded') && (oldWarData.state == 'inWar')) {
                    // WAR HAS ENDED

                    warannouncement = '';
                    attackfirst = true;

                    var sixpacks = '';
                    var triples = '';
                    var missedattacks = '';
                    var winOrLoseOrDraw;

                    if(warData.clan.stars > warData.opponent.stars) {
                        winOrLoseOrDraw = `${zbgsword} **VICTORY** ${zbgsword}`;
                    }
                    else if(warData.clan.stars == warData.opponent.stars) {
                        if(warData.clan.destructionPercentage > warData.opponent.destructionPercentage) {
                            winOrLoseOrDraw = `${zbgsword} **VICTORY** ${zbgsword}`;
                        }
                        else if(warData.clan.destructionPercentage == warData.opponent.destructionPercentage) {
                            winOrLoseOrDraw = `${zbgshield} **Draw** ${zbgshield}`;
                        }
                        else if(warData.clan.destructionPercentage < warData.opponent.destructionPercentage) {
                            winOrLoseOrDraw = `${zbgswordbroken} **Defeat** ${zbgswordbroken}`;
                        }
                    } else if(warData.clan.stars , warData.opponent.stars) {
                        winOrLoseOrDraw = `${zbgswordbroken} **Defeat** ${zbgswordbroken}`;
                    }

                    for(var i=0; i<warData.clan.members.length; i++) {
                        var stars = 0;
                        var star = [0, 0];
                        var numofattacks = 0;
                        if(warData.clan.members[i].attacks != undefined) {
                            for(var j=0; j<warData.clan.members[i].attacks.length; j++) {
                                stars = stars + warData.clan.members[i].attacks[j].stars;
                                star[j] = star[j] + warData.clan.members[i].attacks[j].stars;
                                numofattacks = warData.clan.members[i].attacks.length
                            }
                        }
                        if(stars == 6) {
                            sixpacks = sixpacks + warData.clan.members[i].name + '\n';
                        }

                        if(((star[0] == 3) && (star[1] != 3)) || ((star[0] != 3) && (star[1] == 3))) {
                            triples = triples + warData.clan.members[i].name + '\n';
                        }

                        if(numofattacks == 1) {
                            missedattacks = missedattacks + `${warData.clan.members[i].name} missed an attack\n`;
                        }
                        else if(numofattacks == 0) {
                            missedattacks = missedattacks + `${warData.clan.members[i].name} missed BOTH attacks\n`;
                        }
                    }

                    clanrecogzilla.send(`<@&399482131723845632>, here are the statistics for the war against **${warData.opponent.name}**:\n\n`);
                    clanrecogzilla.send({embed: {
                        color: blueEmbed,
                        author: {
                            name: warData.clan.name,
                            icon_url: warData.clan.badgeUrls.small
                        },
                        fields: [
                            {
                                name: winOrLoseOrDraw,
                                value: `${zbgcocstarnew} ${warData.clan.stars} vs ${zbgcocstarnew} ${warData.opponent.stars}`
                            },
                            {
                                name: `**Six pack beasts** ${roarzilla} ${roarzilla} ${roarzilla} ${roarzilla} ${roarzilla} ${roarzilla}\n`,
                                value: sixpacks
                            },
                            {
                                name: `**Triples** ${dabzilla} ${dabzilla} ${dabzilla}\n`,
                                value: triples
                            },
                            {
                                name: `${ragezilla} **Missed attacks** ${ragezilla}\n`,
                                value: missedattacks
                            },
                        ],
                        thumbnail: {
                            url: warData.opponent.badgeUrls.large
                        },
                        timestamp: warData.endTime.insertAt(4, '-').insertAt(7, '-').insertAt(13, ':').insertAt(16, ':'),
                        footer: {
                            text: 'War ended ',
                            icon_url: bot.user.avatarURL
                        }
                    }});
                }
                else {

                }

                oldWarData = warData;
            }
        })
        .catch(err => {
            console.log('An error occured:\n');
            console.log(err);
        });
    }, 5*60*100);

    var twitterzilla = bot.channels.get('');
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
                    color: blueEmbed,
                    description: atext,
                    image: {
                        url: `https://img.youtube.com/vi/${ytid}/hqdefault.jpg`
                    }
                }});
                isplaying = true;
                dispatcher.on('end', end => {
                    setTimeout(() => {
                        message.channel.send({embed: {
                            color: blueEmbed,
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

        if(command.startsWith('set-war-announcement')) {
            if(message.member.roles.get('425671437790085120')) {
                warannouncement = command.slice(21, command.length);
                message.channel.send('War announcement set as: ' + warannouncement);
            }
            else {
                message.channel.send('You dont have the permissiont to set war announcements');
            }
        }

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
                        
                        while(response.troops[i] != undefined) {
                            if(response.troops[i].village == 'home') {
                                maintroopres = maintroopres + `*${response.troops[i].name}:* lvl${response.troops[i].level}\n`;
                                i++;
                            }
                            else {
                                i++;
                            }
                        }

                        while(response.troops[j] != undefined) {
                            if(response.troops[j].village == 'builderBase') {
                                buildertroopres = `*${response.troops[j].name}:* lvl${response.troops[j].level}\n` + buildertroopres;
                                j--;
                            }
                            else {
                                j--;
                            }
                        }

                        while(response.spells[k]) {
                            spellres = spellres + `*${response.spells[k].name}:* lvl${response.spells[k].level}\n`;
                            k++;
                        }

                        while(response.heroes[m]) {
                            mainherores = mainherores + `*${response.heroes[m].name}:* lvl${response.heroes[m].level}\n`;
                            m++;
                        }

                        if(response.legendStatistics != undefined) {
                            if(response.league == undefined) {
                                message.channel.send({embed: {
                                    color: blueEmbed,
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
                                            name: 'Legend trophies:',
                                            value: `${legendcup} ` + response.legendStatistics.legendTrophies
                                        },
                                        {
                                            name: 'War stars:',
                                            value: `${zbgcocstarnew} ` + response.warStars
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
                                    color: blueEmbed,
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
                                        },
                                        {
                                            name: 'Link to player profile:',
                                            value: `https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${query}`
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
                                    color: blueEmbed,
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
                                            name: 'Legend trophies:',
                                            value: `${legendcup} ` + response.legendStatistics.legendTrophies
                                        },
                                        {
                                            name: 'War stars:',
                                            value: `${zbgcocstarnew} ` + response.warStars
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
                                    color: blueEmbed,
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
                                        },
                                        {
                                            name: 'Link to player profile:',
                                            value: `https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${query}`
                                        }
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Requested by ${message.author.username}`,
                                        icon_url: message.author.avatarURL
                                    }
                                }});
                            }
                        }
                        else {
                            if(response.league == undefined) {
                                message.channel.send({embed: {
                                    color: blueEmbed,
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
                                            name: 'War stars:',
                                            value: `${zbgcocstarnew} ` + response.warStars
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
                                    color: blueEmbed,
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
                                        },
                                        {
                                            name: 'Link to player profile:',
                                            value: `https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${query}`
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
                                    color: blueEmbed,
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
                                            name: 'War stars:',
                                            value: `${zbgcocstarnew} ` + response.warStars
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
                                    color: blueEmbed,
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
                                        },
                                        {
                                            name: 'Link to player profile:',
                                            value: `https://link.clashofclans.com/?action=OpenPlayerProfile&tag=${query}`
                                        }
                                    ],
                                    timestamp: new Date(),
                                    footer: {
                                        text: `Requested by ${message.author.username}`,
                                        icon_url: message.author.avatarURL
                                    }
                                }});
                            }
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
//MongoDB

const MongoClient = require('mongodb').MongoClient;
var db;
var cc = {list: []};
var reactions = {list: []};
var dogs;
var cats;
var snakes;

MongoClient.connect('mongodb://userp:passp1@ds020218.mlab.com:20218/zilla-bot-gamma', {useNewUrlParser: true}, (err, client) => {
    if(err) throw err;
    console.log('Connected to database!');
    db = client.db('zilla-bot-gamma');

    db.collection('cc').find().toArray((err, results) => {
        if(err) console.log(err);
        cc = results[0];
    });

    db.collection('reactions').find().toArray((err, results) =>  {
        if(err) console.log(err);
        reactions = results[0];
    });

    db.collection('dogs').find().toArray((err, results) => {
        if(err) console.log(err);
        dogs = results[0];
    });

    db.collection('cats').find().toArray((err, results) => {
        if(err) console.log(err);
        cats = results[0];
    });

    db.collection('snakes').find().toArray((err, results) => {
        if(err) console.log(err);
        snakes = results[0];
    });
});

//Google

const google = require('google');

const zbgmusic = '<:zbgmusic:484702955568758794>';

//Coc Message Handler declaration

var cocmsghandle = require('./ClashOfClans/cocmsghandle.js').cocmsghandle;

//Discord Message Functions

exports.responseMessage = function(message, bot) {
    if(message.content.startsWith('Z!')) {
        var command = message.content.slice(2, message.content.length);
       
        for(var i=0; i<cc.list.length; i++) {
            if(command.toLowerCase() == cc.list[i].name) {
                return {
                    text: cc.list[i].value
                };
                break;
            }
        }

        if(command == 'ping') {
            return {
                text: ':ping_pong: Pong! Response time: ' + bot.ping + 'ms'
            }
        }

        else if(command.startsWith('enlarge')) {
            var toEnlarge = command.slice(8, command.length);
            if(toEnlarge.startsWith('<@')) {
                //User-avatar-url
                var userid = toEnlarge.slice(toEnlarge.length - 19, toEnlarge.length - 1);
                var enlargeuser = bot.users.get(userid);
                if(enlargeuser) {
                    return {
                        text: enlargeuser.avatarURL
                    }
                }
                else {
                    return {
                        text: 'User not found. Please check the id and retry.'
                    }
                }
            }
            else if(toEnlarge.startsWith('<:')) {
                //Non-animated emote
                var emojiid = toEnlarge.slice(toEnlarge.length - 19, toEnlarge.length - 1);
                return {
                    text: `https://cdn.discordapp.com/emojis/${emojiid}.png`
                }
            }
            else if(toEnlarge.startsWith('<a:')) {
                //Animated-emote
                var aemojiid = toEnlarge.slice(toEnlarge.length - 19, toEnlarge.length - 1);
                return {
                    text: `https://cdn.discordapp.com/emojis/${aemojiid}.gif`
                }
            }
            else {
                return {
                    text: 'I dont know how to enlarge ' + toEnlarge + ' fam.'
                };
            }
        }

        else if(command == 'help') {
            return {
                text: {embed: {
                    author: {
                        icon_url: bot.user.avatarURL,
                        name: bot.user.username
                    },
                    color: 0xCBFDFC,
                    description: 'Zilla Bot Gamma is the third and the most extensive update, successor to the Zilla Bot Beta. It is loaded with a lot of new features:',
                    fields: [
                        {
                            name: 'Moderation:',
                            value: 'The bot comes with kick and ban functionality, as well as logging'
                        },
                        {
                            name: 'Music:',
                            value: 'Zilla bot gamma can play music streaming from Youtube just like many other music bots, but is a little primitive atm as it has no queueing method as yet, but will be added shortly'        
                        },
                        {
                            name: 'COC API:',
                            value: 'One of the important features of Zilla bot gamma that makes this app stand out from the others is it\'s COC API support, which willl give it the functions of Announcer, Sidekick, and ClashOfStats combined together, making it the perfect COC bot.'
                        },
                        {
                            name: 'Custom commands and reactions:',
                            value: 'Custom command feature has been update and custom reactions have been introduced.'
                        },
                        {
                            name: 'Website:',
                            value: 'Zilla bot has it\'s own website, which you can access at http://zillabotgamma.herokuapp.com, which we will be using to expand our reach and recruit more zillas'
                        },
                        {
                            name: 'Misc:',
                            value: 'Several other misc commands such as Z!enlarge were added'
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        icon_url: message.author.avatarURL,
                        text: `Requested by ${message.author.username}#${message.author.discriminator}`
                    }
                }}
            };
        }

        else if(command.startsWith('ban')) {  
            if(message.member.roles.get('390792319001034754') || message.member.roles.get('434642446761066506')) {
                var query = command.slice(4, command.length);
                var banuserid;

                if(query.length == 18) {
                    banuserid = query;
                }
                else if((query.length == 22) || (query.length == 21)){
                    banuserid = query.slice(query.length - 19, query.length - 1);
                }

                var banmember = bot.guilds.get('390547531634966530').members.get(banuserid);
                var banuser = bot.users.get(banuserid);
                if(banmember.roles.get('390792319001034754') || banmember.roles.get('434642446761066506')) {
                    return {
                        text: 'I won\'t allow you to ban moderators or admins'
                    }
                }
                else if(banmember) {
                    return {
                        text: '<:zbgban:485297960100429825> ***' + banuser.username + '#' + banuser.discriminator + '*** has been banned.',
                        usertoban: banmember
                    }
                }
                else {
                    return {
                        text: 'Error. Cannot find this user.'
                    }
                }
            }
            else {
                return {
                    text: 'Nice try. You can\'t ban members without having the **Admin** role.'
                }
            }
        }

        else if(command.startsWith('kick')) {  
            if(message.member.roles.get('390792319001034754')) {
                var query = command.slice(5, command.length);
                var kickuserid;

                if(query.length == 18) {
                    kickuserid = query;
                }
                else if((query.length == 22) || (query.length == 21)){
                    kickuserid = query.slice(query.length - 19, query.length - 1);
                }

                var kickmember = bot.guilds.get('390547531634966530').members.get(kickuserid);
                var kickuser = bot.users.get(kickuserid);
                if(kickmember.roles.get('390792319001034754') || kickmember.roles.get('434642446761066506')) {
                    return {
                        text: 'I won\'t allow you to kick moderators or admins'
                    }
                }
                else if(kickmember) {
                    return {
                        text: '<:zbgban:485297960100429825> ***' + kickuser.username + '#' + kickuser.discriminator + '*** has been kicked.',
                        usertokick: kickmember
                    }
                }
                else {
                    return {
                        text: 'Error. Cannot find this user.'
                    }
                }
            }
            else {
                return {
                    text: 'Nice try. You can\'t kick members without having the **Moderator** role.'
                }
            }
        }
        
        else if(command.startsWith('create-cc')) {
            if(message.author.id == '334911278298562561') {
                var namevalue = command.slice(10, command.length);
                var spaceloc = namevalue.indexOf(" ");
                var nname = namevalue.slice(0, spaceloc).toLowerCase();
                var nvalue = namevalue.slice(spaceloc+1, namevalue.length);
            
                cc.list.push({
                    name: nname,
                    value: nvalue
                });
    
                db.collection('cc').save(cc, (err, result) => {
                    if(err) {
                        return {
                            text: 'Command creation failed! An error occured, please check the console.'
                        };
                        console.log(err);
                    }
                    console.log('CC updated!');
                });
                return {
                    text: '[gamma] Command successfully created! Typing `Z!' + nname + '` will output `' + nvalue + '` now!'
                };
            }
    
            else {
                return {
                    text: 'You do not have the permission to create custom commands!'
                };
            }
        }

        else if(command.startsWith('delete-cc')) {
            if(message.author.id == '334911278298562561') {
                var dname = command.slice(10, command.length);
                for(var j=0; j<cc.list.length; j++) {
                    if(dname == cc.list[j].name) {
                        cc.list.splice(j, 1);
    
                        db.collection('cc').save(cc, (err, result) => {
                            if(err) {
                                return {
                                    text: 'Command deletion failed! An error occured, please check the console.'
                                };
                                console.log(err);
                            }
                            console.log('CC deleted!');
                        });
                    }
                }
                return {
                    text: '[gamma] Command successfully deleted!'
                };
            }
    
            else {
                return {
                    text: 'You do not have the permissions to delete custom commands!'
                };
            }
        }

        else if(command == "list-cc") {
            var plist = cc.list[0].name;
            for(var k=1; k<cc.list.length; k++) {
                plist = plist + ", " + cc.list[k].name;
            }
            return {
                text: plist
            };
        }

        else if(command.startsWith('reaction-add')) {
            if(message.author.id == '334911278298562561') {
                var namevalue = command.slice(13, command.length);
                var spaceloc = namevalue.indexOf(" ");
                var nname = namevalue.slice(0, spaceloc).toLowerCase();
                var nvalue = namevalue.slice(spaceloc+1, namevalue.length);
            
                reactions.list.push({
                    trigger: nname,
                    output: nvalue
                });
    
                db.collection('reactions').save(reactions, (err, result) => {
                    if(err) {
                        return {
                            text: 'Command creation failed! An error occured, please check the console.'
                        };
                        console.log(err);
                    }
                    console.log('Reactions updated!');
                });
                return {
                    text: '[gamma] Reaction successfully added! Typing `' + nname + '` anywhere in the message will add the reaction: `' + nvalue + '` now!'
                };
            }
    
            else {
                return {
                    text: 'You do not have the permission to add custom reactions!'
                };
            }
        }

        else if(command.startsWith('reaction-remove')) {
            if(message.author.id == '334911278298562561') {
                var dname = command.slice(16, command.length);
                for(var j=0; j<reactions.list.length; j++) {
                    if(dname == reactions.list[j].trigger) {
                        reactions.list.splice(j, 1);
    
                        db.collection('reactions').save(reactions, (err, result) => {
                            if(err) {
                                return {
                                    text: 'Reaction deletion failed! An error occured, please check the console.'
                                };
                                console.log(err);
                            }
                            console.log('Reaction deleted!');
                        });
                    }
                }

                return {
                    text: '[gamma] Reaction successfully removed!'
                };
            }
    
            else {
                return {
                    text: 'You do not have the permissions to remove custom reactions!'
                };
            }
        }
    }
    else if(message.content.startsWith('Zc!')) {
        //Zilla Fam Clan commands
        var command = message.content.slice(3, message.content.length);

        return cocmsghandle(command);
    }
    else {
        //Other random responses
    }

    return {
        text: 'None'
    };
}

exports.reactEmoji = function(messageContent) {
    var reactEmojicontents = [];
    var j=0;
    for(var i=0; i<reactions.list.length; i++) {
        if(messageContent.toLowerCase().indexOf(reactions.list[i].trigger) >= 0) {
            reactEmojicontents[j] = reactions.list[i].output;
            j++;
        }
    }

    if(reactEmojicontents[0]) {
        return reactEmojicontents;
    }

    return 'None';
}
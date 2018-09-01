//MongoDB

const MongoClient = require('mongodb').MongoClient;
var db;
var cc;
var reactions;

MongoClient.connect('mongodb://userp:passp1@ds020218.mlab.com:20218/zilla-bot-gamma', { useNewUrlParser: true }, (err, client) => {
    if(err) console.log(err);
    console.log('Connected to database!');
    db = client.db('zilla-bot-gamma');

    db.collection('cc').find().toArray((err, results) => {
        if(err) console.log(err);
        cc = results[0];
    });

    db.collection('reactions').find().toArray((err, results) => {
        if(err) console.log(err);
        reactions = results[0];
    });
});

//Google

const google = require('google');

const zbgmusic = '<:zbgmusic:484702955568758794>';

//ClashOfClans API

//const clashApi = require('clash-of-clans-api');
const coctoken = require('./CocData/coctoken.json');

//const client = clashApi({
//    token: coctoken.value
//});

const zbgsword = '<:zbgsword:484289482640850945>';
const zbgswordbroken = '<:zbgswordbroken:484292615999717376>';
const zbgshield = '<:zbgshield:484296508775071744>';
const zbgshieldbroken = '<:zbgshieldbroken:484296563418464256>';
const zbgcocstarempty = '<:zbgcocstarempty:484275771784036354>';
const zbgcocstarfull = '<:zbgcocstarfull:484275745728888832>';
const zbgcocstarnew = '';

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

        if(command.startsWith('enlarge')) {
            var toEnlarge = command.slice(8, command.length);
            console.log(toEnlarge);
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

        if(command.startsWith('create-cc')) {
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
    }
    else {

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
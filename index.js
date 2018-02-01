const Discord = require('discord.js');
const client = new Discord.Client();
const express = require("express");
var app = express();
var errorlog = require("./errors.json")
const yt = require('ytdl-core');
var RedisSessions = require("redis-sessions");
var rs = new RedisSessions();
var ffmpeg = require("ffmpeg-binaries");
var search = require('youtube-search');
var prefix = "/";
var con = console.log;
var moment = require("moment");
var config = {   
            "youtube_api_key" : process.env.YOUTUBE_API_KEY,
        } 
queues = {},
fs = require('fs'),
ytdl = require('ytdl-core'),
opts = {
    part: 'snippet',
    maxResults: 10,
    key: config.youtube_api_key
}
var intent;
function getQueue(guild) {
    if (!guild) return
    if (typeof guild == 'object') guild = guild.id
    if (queues[guild]) return queues[guild]
    else queues[guild] = []
    return queues[guild]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

fighting = new Set();

app.get("/queue/:guildid",function(req,res){
  let queue = getQueue(req.params.guildid);
    if(queue.length == 0) return res.send("Uh oh... pas de musique!");
    let text = '';
    for(let i = 0; i < queue.length; i++){
      text += `${(i + 1)}. ${queue[i].title} | by ${queue[i].requested}\n`    };
  res.send(text)
})
        
var paused = {};
function play(message, queue, song) {
    try {
        if (!message || !queue) return;
        if (song) {
            search(song, opts, function(err, results) {
               
                if (err) return message.channel.send("Vidéo non trouvée, essayez d'utiliser un lien YouTube à la place.."); 
                
                song = (song.includes("https://" || "http://")) ? song : results[0].link
                let stream = ytdl(song, {
                    audioonly: true
                })
                let test
                if (queue.length === 0) test = true
                queue.push({
                    "title": results[0].title,
                    "requested": message.author.username,
                    "toplay": stream,
		"link": results[0].link,
                })
      
                console.log("Queued " + queue[queue.length - 1].title + " in " + message.guild.name + " as requested by " + queue[queue.length - 1].requested)
            
message.channel.send("**:mag_right: Searching  - ** `" + message.content.substr(6) + "`");
                message.channel.send("**:ballot_box_with_check: Ajout à la file d'attente - ** `" + queue[queue.length - 1].title + "`");
                if (test) {
                    setTimeout(function() {
                        play(message, queue)
                    }, 1000)
                }
            })
        } else if (queue.length != 0) {
            
        message.channel.send("**:notes: Now playing - ** `" + queue[0].title + "`** | Requested by ** `" + queue[0].requested + "`" + "\n" + queue[0].link);
      console.log(`Lecture ${queue[0].title} Requested by ${queue[0].requested} i ${message.guild.name}`);
            let connection = message.guild.voiceConnection
            if (!connection) return con("pas de connexion!");
            intent = connection.playStream(queue[0].toplay)

            intent.on('error', () => {
                queue.shift()
                play(message, queue)
            })

            intent.on('end', () => {	
       setTimeout(() => {
          if (queue.length > 0) { 
              queue.shift()
       play(message, queue) 
              } 
       }, 1000)

            })
            
        } else {
            message.channel.send("Pas de musique dans la file d'attent !")
            
        }
    } catch (err) {
        console.log("Error\n\n" + err.stack)
        errorlog[String(Object.keys(errorlog).length)] = {
            "code": err.code,
            "error": err,
            "stack": err.stack
        }
        fs.writeFile("./errors.json", JSON.stringify(errorlog), function(err) {
            if (err) return con("Error");
        });
        

    }
}

var util = require('util');
var youtube_node = require('youtube-node');



var request = require('request')




            client.on("message", function(message) {
    const messagea = message.content
    try {
		if (message.channel.type === "dm") return;
        if (message.author === client.user)
        
            if (message.guild === undefined) {
                message.channel.send("The bot only works in servers!")

                return;
            }
        if (message.content.startsWith(prefix + 'mhelp')) {
message.reply("Check your dm's");
message.author.send("```Prefix = '*'\n\n play - for playing\n pause - for pause music\n resume - for resume music\n skip - for skip music\n queue - for watch the queue\n clearQ - for clear the queue\n youtube-search - for find more information about a video```");

  }    
        if (message.content.startsWith(prefix + 'play')) {

            if (!message.guild.voiceConnection) {
                
                if (!message.member.voiceChannel) return message.channel.send(' Vous devez être dans un canal vocal')
                
                message.member.voiceChannel.join()
            }
            let suffix = messagea.split(" ").slice(1).join(" ")
            
            if (!suffix) return message.channel.send(' Vous devez spécifier un lien de chanson ou un nom de chanson!')
            

            play(message, getQueue(message.guild.id), suffix)
        }
        if (message.content.startsWith(prefix + 'leave')) {

            console.log('leave');
            if (!message.guild.voiceConnection) {
               
                if (!message.member.voiceChannel) return message.channel.send(' Vous devez être dans un canal vocal')
                
}
                var chan = message.member.voiceChannel;
               message.member.voiceChannel.leave();
                let queue = getQueue(message.guild.id);
                
                if (queue.length == 0) return message.channel.send(`Pas de musique dans le files`).then(response => { response.delete(5000) });
                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
                message.channel.send(`La file d'attente est effacée`).then(response => { response.delete(5000) });

                
            
        }
        
        if (message.content.startsWith(prefix + "clearQ")) {
         
                let queue = getQueue(message.guild.id);
                
                if (queue.length == 0) return message.channel.send(`Pas de musique effacée`).then(response => { response.delete(5000) });
                
                for (var i = queue.length - 1; i >= 0; i--) {
                    queue.splice(i, 1);
                }
                
                message.channel.send(":wastebasket: File d'attente effacée avec succès").then(response => { response.delete(5000) })
                
            }
        if (message.content.startsWith(prefix + 'skip')) {
          
        if (!message.member.voiceChannel) return message.channel.send(' Vous devez être dans un canal vocal')
                let player = message.guild.voiceConnection.player.dispatcher
                if (!player || player.paused) return message.channel.send("Le bot ne joue pas!").then(response => { response.delete(5000) });
                message.channel.send(':fast_forward: Skipping song...').then(response => { response.delete(5000) });
                player.end()
            

        }

        if (message.content.startsWith(prefix + 'pause')) {
          
                
                    if (!message.member.voiceChannel) return message.channel.send(' Vous devez être dans un canal vocal').then(response => { response.delete(5000) });
                    let player = message.guild.voiceConnection.player.dispatcher
                    if (!player || player.paused) return message.channel.send("Le bot ne joue pas!").then(response => { response.delete(5000) });
                    player.pause();
                    message.channel.send(":pause_button: Pausing Music...").then(response => { response.delete(5000) });
                
               
            } 
        if (message.content.startsWith(prefix + 'volume')) {
         let suffix = message.content.split(" ")[1];
                        
            var player = message.guild.voiceConnection.player.dispatcher
            if (!player || player.paused) return message.channel.send(' Pas de musique m8, filez quelque chose avec `' + prefix + 'play`');
            
            if (!suffix) {
var player = message.guild.voiceConnection.player.dispatcher
                
                message.channel.send(` Le volume actuel est ${(player.volume * 100)}`).then(response => { response.delete(5000) });
                
            } var player = message.guild.voiceConnection.player.dispatcher
                let volumeBefore = player.volume
                let volume = parseInt(suffix);
                
                if (volume > 100) return message.channel.send("Volume max 100").then(response => { response.delete(5000) });
                player.setVolume((volume / 100));
                 message.channel.send(":speaker: **Volume à** `"+ volume + "`").then(response => { response.delete(5000) });
                
            }
        

        if (message.content.startsWith(prefix + 'resume')) {
          
                
                if (!message.member.voiceChannel) return message.channel.send('Vous devez être dans un canal vocal').then(response => { response.delete(5000) });
                let players = message.guild.voiceConnection.player.dispatcher
                if (!players) return message.channel.send(' Aucune musique ne joue en ce moment.').then(response => { response.delete(5000) });
                if (players.playing) return message.channel.send(' La musique joue déjà').then(response => { response.delete(5000) });
                
                var queue = getQueue(message.guild.id);
           
                players.resume();
                
                message.channel.send(":arrow_forward: **Resuming music...**").then(response => { response.delete(5000) });
                
            } 
      

        if (message.content.startsWith(prefix + 'queue')) {
          let queue = getQueue(message.guild.id);
            
            if (queue.length == 0) return message.channel.send("Pas musique en **Attente**");
            let text = '';
            for (let i = 0; i < queue.length; i++) {
                text += `${(i + 1)}. ${queue[i].title} | Requested by ${queue[i].requested}\n`
            };
            message.channel.send(":globe_with_meridians: **Queue:**\n`" + text + "`");
            
        }
    } catch (err) {
        
        console.log("Error\n\n\n" + err.stack)
        errorlog[String(Object.keys(errorlog).length)] = {
            "code": err.code,
            "error": err,
            "stack": err.stack
        }
        fs.writeFile("./errors.json", JSON.stringify(errorlog), function(err) {
            if (err) return console.log("Error");
        })
        


    } 
		if(message.content.startsWith(prefix + 'rename')){
if(message.author.id == "240508683455299584"){
	client.user.setUsername(message.content.substr(8));
} else {
    message.channel.send("You do not have permission to use this command!")
  }
}   
	if (message.content.startsWith(prefix + "syt")) {
var args = message.content.split(" ").slice(1).join(" ");
const searchvideo = require("request-promise-native");
if (!args) return message.channel.send("**:x: Error, please specify a title of video**");
searchvideo("https://www.googleapis.com/youtube/v3/search?q="+encodeURIComponent(args)+"&type=video&part=snippet&key="+config.youtube_api_key).then(objet => { 
let ytvideo = JSON.parse(objet);
 if (ytvideo.pageInfo.totalResults === 0) return message.channel.send("**:x: I can't find this video**"); searchvideo("https://www.googleapis.com/youtube/v3/videos?id="+ytvideo.items[0].id.videoId+"&part=contentDetails&key="+config.youtube_api_key).then(info => { 
let videoInfo = JSON.parse(info);
var embed = new Discord.RichEmbed()
.setAuthor(ytvideo.items[0].snippet.channelTitle) 
.setTitle(ytvideo.items[0].snippet.title) 
.setURL("https://www.youtube.com/watch?v="+ytvideo.items[0].id.videoId)
.setColor(0xff0000) 
.setThumbnail("https://www.egedeniztextile.com/wp-content/uploads/2017/09/Youtube-logo-2017.png")  
.setDescription(ytvideo.items[0].snippet.description ? ytvideo.items[0].snippet.description : "null")
.addField("Duration", videoInfo.items[0].contentDetails.duration.toString().replace(/["PT", "S"]/g, "").replace("H", ":").replace("M", ":"), true)
.addField("URL", "https://www.youtube.com/watch?v="+ytvideo.items[0].id.videoId);
 return message.channel.send(embed); }); });
} 	    
});

app.listen(5000);
var AwaitingPlayer = [];


const createrole = require('./modules/adminstrateur/createrole.js');
const delchannel = require('./modules/adminstrateur/delchannel.js');


const addrole = require('./modules/moderation/addrole.js');
const ban = require('./modules/moderation/ban.js');
const kick = require('./modules/moderation/kick.js');
const mute = require('./modules/moderation/mute.js');
const unmute = require('./modules/moderation/unmute.js');
const rmrole = require('./modules/moderation/rmrole.js');
const role = require('./modules/moderation/role.js');
const purge = require('./modules/moderation/purge.js');

const admin = require("./modules/owner/admin.js");


const afk = require("./modules/utile/afk.js");
const hafk = require("./modules/utile/hafk.js");
const helps = require("./modules/utile/helps.js");

client.on('message', msg => {
  if (msg.channel.type != "dm") {
   
   createrole(msg, prefix, client)
   delchannel(msg, prefix, client)

   rmrole(msg, prefix, client) 
   addrole(msg, prefix, client)
   ban(msg, prefix, client)
   kick(msg, prefix, client)
   mute(msg, prefix, client)
   purge(msg, prefix, client)
   unmute(msg, prefix, client)

   admin(msg, prefix, client)
   role(msg, prefix, client)


   afk(msg, prefix, client)
   hafk(msg, prefix, client)
   helps(msg, prefix, client)
   

   
   
  }
});

client.on("ready", () => {
  
  
  client.user.setStatus("dnd");
  console.log("--------------------------------------");
  console.log("je suis pré");
  });


  client.on('message', msg => {
if(msg.channel.name == "captcha"){
if(msg.author !== client.user) {
msg.delete();
}else{
msg.channel.send();
}}

if(msg.author.id != client.id){
if(msg.channel.name == "captcha" && msg.content.startsWith(prefix)){
        var say = msg.content.substr(1);
        for(i=0;i<AwaitingPlayer.length;i++){
            var code = AwaitingPlayer[i].indexOf("x");
        }
        code++;
        for(i=0;i<AwaitingPlayer.length;i++){
var newCode = AwaitingPlayer[i].substr(code);
}
		if(say == newCode){
            AwaitingPlayer.pop();     
let newMember = msg.guild.roles.find("name", "👤Membres");
if(!msg.guild.roles.exists("name", "👤Membres")) {
        return  msg.channel.send("**:x: Le role `👤Membres` n'est pas présent merci de le crée!**")
      } 
msg.member.addRole(newMember).catch(err => console.log(err));         
        }else{
            msg.author.send("**:x: Tu est un bot donc ByeBye**");
            msg.delete();
            if(!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
  return;
}
msg.guild.member(msg.author).kick();
		}
}
}
});

                client.on("messageDelete", function(message) {
                  if (message.author.bot) return;
                  if (!message.guild.channels.exists('name','admin-logs')) return;
                   message.guild.channels.find('name','admin-logs').send({ 
                  embed: {
                  author:{
                  name: message.member.user.tag,
                  icon_url: message.member.user.avatarURL
                  },		
                        color: 0xff0000,			
                  description: 'Message by **@'+message.member.user.username+'** deleted in  **#'+message.channel.name+'**\n',
                    fields: [{				
                      name: '**content:**',			
                        value: message.content					
                  }],	
                        timestamp: new Date(),
                   footer: {
                  text: 'User ID: ' + message.member.user.id,
                  }
                  }
                  });
                   });  
                  
                     client.on('messageUpdate', (oldMessage, newMessage) => {
                  if(oldMessage.author.bot || oldMessage.cleanContent === newMessage.cleanContent) return;
                  
                  if (!newMessage.guild.channels.exists('name','admin-logs')) return;
                   newMessage.guild.channels.find('name','admin-logs').send({ 
                  embed: {
                  author:{
                  name: newMessage.member.user.tag,
                  icon_url: newMessage.member.user.avatarURL
                  },
                        color: 16758725,			
                  description: 'Message by **@'+newMessage.member.user.username+'** edited in  **#'+newMessage.channel.name+'**\n',
                    fields: [{				
                      name: '**Before:**',			
                        value: oldMessage.cleanContent		
                  },{			
                        name: '**After:**',	
                            value: newMessage.cleanContent
                          }],	
                        timestamp: new Date(),
                   footer: {
                  text: 'User ID: ' + newMessage.member.user.id,
                  }
                  }
                  }); 
                })

client.on('guildMemberAdd', member => {  
const channel = member.guild.channels.find('name', 'departs_arrivees');
    if(!channel) 
    return;
var captcha = String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4) + String(Math.random()).charAt(4);
            AwaitingPlayer.push(member.user.id + "x" + captcha);
            member.user.send("Salut " + member.user.username + " bienvenue dans notre communautée !\nVoici les règles que tu auras à suivre dans nôtre serveur:\n\n**1. Pub interdit sous peine de kick ou de ban\n2. Merci de ne pas dire d'insulte \n3. Pas de spam ou de Majuscule \n4. Tout message de vente sera supprimer et vous serrez kick\n6. C'est un serveur sérieux, les non sérieux sont priés de s'abstenir\nLe manque de respecte d’une de c’est règle sera sanctionner plus a moins selon la gravité de l’acte.**");
            member.send("Bienvenue" +member.user.username + "** Copie et colle le code dans <#384733478769655809> \n```/" + captcha + "```");
            member.user.id;
            channel.send("Bienvenue " + member +  " sur " +member.guild.name+ "passe un bon moment avec nous");
          });
      
          client.on('guildMemberRemove', member => {
            const channel = member.guild.channels.find('name', 'departs_arrivees');
            if(!channel) {
                return;
            }
                    channel.send( "oh non pourquoi tu est partie" +member+  " à quitté " +member.guild.name+ "revient vite");
        })
              
    
       
client.login(process.env.TOKEN);

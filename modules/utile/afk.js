function afk(msg,prefix,client){
    
    const fs = require("fs");
    var msg = msg;
     var mentionned = msg.mentions.users.first();
    let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
    if (msg.content.startsWith(prefix + "delafk")){
    if (afk[msg.author.id]) {
    delete afk[msg.author.id];
    if (msg.member.nickname === null) {
     msg.channel.send("", {embed: {
                   title: "Afk retour",
                   color: 0xBB, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        timestamp: new Date(), 
                           description: " Tu n'es plus afk"
    
                             }}).catch(console.error);
    
      }else{
     msg.channel.send("", {embed: {
                   title: "Afk retour",
                   color: 0xBB, 
    thumbnail: {
                            icon_url : client.user.avatarURL 
                        },
                        timestamp: new Date(), 
                           description: " Tu n'es plus afk"
    
                             }}).catch(console.error);
    
      }
    fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
    }else{
     msg.channel.send("", {embed: {
                   
                   color: 0xBB, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " Erreur ! Tu es déjà afk -_-"
    
                             }}).catch(console.error);
    
      }
    }
    
    
    if (msg.content.startsWith(prefix + "afk")||msg.content === prefix + "afk") {
    if (afk[msg.author.id]) {
    return  msg.channel.send("", {embed: {
                   
                   color: 0xBB, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " Erreur ! Tu es déjà afk -_-"
    
                             }}).catch(console.error);
    
      
    }else{
    let args1 = msg.content.split(" ").slice(1);
    if (args1.length === 0) {
    afk[msg.author.id] = {"reason" : true};
    msg.delete();
    msg.channel.send("", {embed: {
                   
                   color: 0xBB, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " tu es désormais afk, met `<delafk` pour enlever ton afk"
    
                             }}).catch(console.error);
    
      
    }
    else{
    afk[msg.author.id] = {"reason" : args1.join(" ")};
    msg.delete();
    msg.channel.send("", {embed: {
                   
                   color: 0xBB,
    thumbnail: {
                           icon_url : client.user.avatarURL
                        },
                        
                           description: " tu es désormais afk, met `<delafk` pour enlever ton afk"
    
                             }}).catch(console.error);
    }
    fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
    }
    }
        
        var mentionned = msg.mentions.users.first();
    if(msg.mentions.users.size > 0) {
    if (afk[msg.mentions.users.first().id]) {
    if (afk[msg.mentions.users.first().id].reason === true) {
     msg.channel.send("", {embed: {
                   author: {
                                    name: ""+ mentionned.username + " est afk",
                                    icon_url: mentionned.avatarURL
                                },
                   color: 0xBB,
                           description: ``
    
                             }}).catch(console.error);
    }else{
     msg.channel.send("", {embed: {
                   author: {
                                    name: ""+ mentionned.username + " est afk",
                                    icon_url: mentionned.avatarURL
                                },
                   color: 0xBB,
                           description: `${afk[msg.mentions.users.first().id].reason}`
    
                             }}).catch(console.error);
    
      
    }
    }
}
}
module.exports = afk;
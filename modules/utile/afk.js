function afk(message,prefix,client){
    
    const fs = require("fs");
    var message = message;
     var mentionned = message.mentions.users.first();
    let afk = JSON.parse(fs.readFileSync("./afks.json", "utf8"));
    if (message.content.startsWith(prefix + "delafk")){
    if (afk[message.author.id]) {
    delete afk[message.author.id];
    if (message.member.nickname === null) {
     message.channel.send("", {embed: {
                   title: "Afk retour",
                   color: 2067276, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        timestamp: new Date(), 
                           description: " Tu n'es plus afk"
    
                             }}).catch(console.error);
    
      }else{
     message.channel.send("", {embed: {
                   title: "Afk retour",
                   color: 2067276, 
    thumbnail: {
                            icon_url : client.user.avatarURL 
                        },
                        timestamp: new Date(), 
                           description: " Tu n'es plus afk"
    
                             }}).catch(console.error);
    
      }
    fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
    }else{
     message.channel.send("", {embed: {
                   
                   color: 15158332, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " Erreur ! Tu es déjà afk -_-"
    
                             }}).catch(console.error);
    
      }
    }
    
    
    if (message.content.startsWith(prefix + "afk")||message.content === prefix + "afk") {
    if (afk[message.author.id]) {
    return  message.channel.send("", {embed: {
                   
                   color: 15158332, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " Erreur ! Tu es déjà afk -_-"
    
                             }}).catch(console.error);
    
      
    }else{
    let args1 = message.content.split(" ").slice(1);
    if (args1.length === 0) {
    afk[message.author.id] = {"reason" : true};
    message.delete();
    message.channel.send("", {embed: {
                   
                   color: 15158332, 
    thumbnail: {
                           icon_url : client.user.avatarURL 
                        },
                        
                           description: " tu es désormais afk, met `<delafk` pour enlever ton afk"
                          }}).catch(console.error);
                          
                            
                          }
                          else{
                          afk[message.author.id] = {"reason" : args1.join(" ")};
                          message.delete();
                          message.channel.send("", {embed: {
                                         
                                         color: 15158332,
                          thumbnail: {
                                                 icon_url : client.user.avatarURL
                                              },
                                              
                                                 description: " tu es désormais afk, met `<delafk` pour enlever ton afk"
                          
                                                   }}).catch(console.error);
                          }
                          fs.writeFile("./afks.json", JSON.stringify(afk), (err) => { if (err) console.error(err);});
                          }
                          }
                              
                              var mentionned = message.mentions.users.first();
                          if(message.mentions.users.size > 0) {
                          if (afk[message.mentions.users.first().id]) {
                          if (afk[message.mentions.users.first().id].reason === true) {
                           message.channel.send("", {embed: {
                                         author: {
                                                          name: ""+ mentionned.username + " est afk",
                                                          icon_url: mentionned.avatarURL
                                                      },
                                         color: 15158332,
                                                 description: ``
                          
                                                   }}).catch(console.error);
                          }else{
                           message.channel.send("", {embed: {
                                         author: {
                                                          name: ""+ mentionned.username + " est afk",
                                                          icon_url: mentionned.avatarURL
                                                      },
                                         color: 15158332,
                                                 description: `${afk[message.mentions.users.first().id].reason}`
                          
                                                   }}).catch(console.error);
                          
                            
                          }
                          }
                          }
                          }
  module.exports = afk

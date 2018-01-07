function ban(msg,prefix,client){

 if(msg.content.startsWith(prefix +'ban')){
    if (msg.channel.type === "dm") return;
                if(!msg.guild.member(msg.author).hasPermission("BAN_MEMBERS")) {
      return msg.reply("**:x: Tu n'a pas le permission d'utiliser la commande !**").catch(console.error);
    }
    if(msg.mentions.users.size === 0) {
      return msg.channel.send("**:x: Manque l'utilisateur !**")
    }
    if(!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return msg.reply("**:x: j'ai pas les droit !**").catch(console.error);
    }
    let banMember = msg.guild.member(msg.mentions.users.first());
    if(!banMember) {
      return msg.channel.send("**:x: Utilisateur invalide !**");
    }
             
    banMember.ban().then(member => {
        msg.channel.send("", {embed: {
              title: "Success:",
              color: 0xffffff,
              description: `**${member.user.username}** banni`,
              
            }}).catch(console.error);
    })
            }
    
    };
module.exports = ban;
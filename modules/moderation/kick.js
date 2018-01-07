function kick(msg,prefix,client){
  
    if(msg.content.startsWith(prefix +'kick')){
        if (msg.channel.type === "dm") return;
        console.log('**' + msg.author.tag + '** a utilisé la commande `<kick` dans le serveur: **'+msg.guild.name+'**, **Owner: **'+msg.guild.owner.user.username+', **Nombre de membres: **'+msg.guild.memberCount);
        let modRole = msg.guild.roles.find("name", "Mod");
                    if(!msg.guild.roles.exists("name", "Mod")) {
                return  msg.channel.send("**:x: Le role **Mod** n'existe pas dans dans ce serveur!**");
              } 
              if(!msg.member.roles.has(modRole.id)) {
               return   msg.channel.send("**:x: Vous n'avez visiblement pas la permission d'utilisez cette commande**");
        }
        if(msg.mentions.users.size === 0) {
          return msg.channel.send("**:x: Veuillez spécifier un utilisateur!**");
        }
        
        let kickMember = msg.guild.member(msg.mentions.users.first());
        if(!kickMember) {
          return msg.channel.send("**:x: Cet utilisateur est invalide!**");
        }
        if(!msg.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
          return msg.reply("Je n'ai pas les permissions requises pour kick").catch(console.error);
        }
                 if(!msg.guild.channels.exists("name", "admin-logs")){
        
        msg.guild.createChannel('admin-logs');
        
        return msg.channel.send("**:x: Le salon-textuel ``admin-logs`` n'existe pas dans ce serveur, je l'ai donc crée pour vous**");
        }
        kickMember.kick().then(member => {
            msg.channel.send(`**${member.user.username}**`+` à bien été kick :hammer:**`);
        }).then(msg.guild.channels.find('name','admin-logs').send({
                embed: {
                  type: 'rich',
                  description: ':hammer: **Action**: Kick\n:person_with_blond_hair: **Utilisateur**: @'+ kickMember.user.username +'\n:cop: **Moderateur**: @'+ msg.author.username,
                  
               
                  color: 0xffffff,
                  footer: {
                    text: ' ',
                    proxy_icon_url: ' '
                  },
        
                  
                }
        })).catch(console.error);
    }
}
module.exports = kick;
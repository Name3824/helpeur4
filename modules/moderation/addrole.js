function addrole(msg,prefix,client){
    if (msg.content.startsWith(prefix + "addrole")) {
        if (msg.channel.type === "dm") return;
        console.log('**' + msg.author.tag + '** a utilisé la commande `<addrole` dans le serveur: **'+msg.guild.name+'**, **Owner: **'+msg.guild.owner.user.username+', **Nombre de membres: **'+msg.guild.memberCount);
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
        let addmember = msg.guild.member(msg.mentions.users.first());
        if(!addmember) {
          return msg.channel.send("**:x: Cet utilisateur est invalide!**");
        
              }else{
        let args = msg.content.split(" ").slice(1);
                              var amount = msg.content.slice(msg.content.indexOf(msg.content.split(" ")[2]))
        let userRoleID = msg.guild.roles.find("name", `${amount}`);
        if(!msg.guild.roles.exists("name", `${amount}`)) {
                msg.channel.send(":no_entry_sign: Le role **"+amount+"** n'existe pas dans ce serveur :no_entry_sign: ");
              }else{
        if(!msg.guild.channels.exists("name", "admin-logs")){
        
        msg.guild.createChannel('admin-logs');
        
        return msg.channel.send("**:x: Le salon-textuel ``admin-logs`` n'existe pas dans ce serveur, je l'ai donc crée pour vous**");
        }
                    addmember.addRole(userRoleID).catch(error => console.log(error));
          msg.channel.send(`**${addmember}** Now has the role **${amount}**`).then(msg.guild.channels.find('name','admin-logs').send({
                embed: {
                  type: 'rich',
                  description: ':hammer: **Action**: Ajout de role \n:person_with_blond_hair: **Utilisateur**: @'+ addmember.user.username +'\n:cop: **Moderateur**: @'+ msg.author.username,
                  
               
                  color: 0xffffff,
                  footer: {
                    text: ' ',
                    proxy_icon_url: ' '
                  },
        
                  
                }
        })).catch(console.error);
        }
        }
        }
    }

module.exports = addrole;  
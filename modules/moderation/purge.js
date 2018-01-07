function purge(msg,prefix,client){
  
  if (msg.content.startsWith(prefix + "purge")) {
    if (msg.channel.type === "dm") return;
    console.log('**' + msg.author.tag + '** a utilisé la commande `h!purge` dans le serveur: **'+msg.guild.name+'**, **Owner: **'+msg.guild.owner.user.username+', **Nombre de membres: **'+msg.guild.memberCount);
        let modRole = msg.guild.roles.find("name", "Mod");
                if(!msg.guild.roles.exists("name", "Mod")) {
            return  msg.channel.send("**:x: The **Mod** role does not exist in this server!**");
          } 
          if(!msg.member.roles.has(modRole.id)) {
            return   msg.channel.send("**:x: You do not have a permission**");
          }else{
    
    const user = msg.mentions.users.first();
     const amount = !!parseInt(msg.content.split(' ')[1]) ? parseInt(msg.content.split(' ')[1]) : parseInt(msg.content.split(' ')[2]) 
    if (!amount) return msg.reply('Number between 1 to 100'); 
    if (!amount && !user) 
    return msg.reply('Number between 1 to 100');
    if (!user){
    if(isNaN(msg.content.split(' ')[1]) || parseInt(msg.content.split(' ')[1]) < 2 || parseInt(msg.content.split(' ')[1]) > 100){
    msg.channel.send('Number between 1 to 100')
    }
    }
    if(msg.content.split(' ')[2]){
    if(isNaN(msg.content.split(' ')[2]) || parseInt(msg.content.split(' ')[2]) < 2 || parseInt(msg.content.split(' ')[2]) > 100){
    msg.channel.send('Number between 1 to 100')
    }
    }
     msg.channel.fetchMessages({ limit: amount, }).then((msgs) => {
     if (user) {
    const filterBy = user ? user.id : Client.user.id;
    msgs = msgs.filter(m => m.author.id === filterBy).array().slice(0, amount);
     }
     msg.channel.bulkDelete(msgs).catch(error => console.log(error.stack));
    
    msg.channel.send("", {embed: {
             color: 0xffffff,
                            
                            fields: [
                              {
                                name: 'Messages deleted',
                                value: "Success" + "! :wastebasket:\n\n"+ "`" + msg.author.username + " deleted " + amount + " messages`"
                              }
                            ],
                            timestamp: new Date(),
                            
                          }});
     });
        
      }
    }
  }

module.exports = purge;
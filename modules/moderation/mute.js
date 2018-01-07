function mute(msg,prefix,client){
  
    if (msg.content.startsWith(prefix + "mute")) {
        if (msg.channel.type === "dm") return;
                    if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) {
          return msg.reply("**:x: You do not have the permission administrator!**").catch(console.error);
        }
        if(msg.mentions.users.size === 0) {
          return msg.channel.send("**:x: Please specify the user you want mute !**")
        }
        let muteMember = msg.guild.member(msg.mentions.users.first());
        if(!muteMember) {
          return msg.channel.send("**:x: The user you entered is not valid !**")
        }
        if(!msg.guild.member(client.user).hasPermission("ADMINISTRATOR")) {
          return msg.reply("**:x: I do not have permissions!**").catch(console.error);
        }
        
        msg.channel.overwritePermissions(muteMember, { SEND_MESSAGES: false }).then(member => {
            msg.channel.send("", {embed: {
                  title: "Success:",
                  color: 0xffffff,
                  description: `**${muteMember.user.username}** was muted on **#${msg.channel.name}** :mute:`,
                  
                }}).catch(console.error);
        })
        }
    }
module.exports = mute;
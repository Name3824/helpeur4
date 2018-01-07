function unmute(msg,prefix,client){

if (msg.content.startsWith(prefix + "unmute")) {
    if (msg.channel.type === "dm") return;
                if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")) {
      return msg.reply("**:x: You do not have the permission administrator!**").catch(console.error);
    }
    
    if(msg.mentions.users.size === 0) {
      return msg.channel.send("**:x: Please specify the user you want unmute !**")
    }
    
    let muteMember = msg.guild.member(msg.mentions.users.first());
    if(!muteMember) {
      return msg.channel.send("**:x: The user you entered is not valid !**")
    }
    
    msg.channel.overwritePermissions(muteMember, { SEND_MESSAGES: true }).then(member => {
        msg.channel.send("", {embed: {
              title: "Success:",
              color: 0xffffff,
              description: `**${muteMember.user.username}** was unmuted on **#${msg.channel.name}** :loud_sound:`,
              
            }}).catch(console.error);
    })
    }
}
module.exports = unmute;
function delchannel(msg,prefix,client){
if(msg.content.startsWith(prefix + "rmchannel")) {
    
    var args = msg.content.slice(prefix.length).split(" ").slice(1)

    if(args.length < 1 ){
    return msg.reply("Stp mention le channel que tu veux supprimée");
}

    if(!msg.guild.members.get(msg.author.id).permissions.has('ADMINISTRATOR')){
    return msg.reply("tu a pas la permission pour utiliser cette commande");
    }
            
     var salon= msg.mentions.channels.first();
    
    if(!salon){ 
    return msg.reply("Ce salon existe pas dans ce server");
    }

    if(msg.guild.members.get(msg.author.id).permissions.has('ADMINISTRATOR')){
    msg.channel.send(`Le salons ${salon} a bien été supprimée!`)
    salon.delete()
}}
}
module.exports = delchannel;
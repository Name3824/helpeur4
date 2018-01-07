function createrole(msg,prefix,client){
    if(msg.content.startsWith(prefix+ "createrole")) {
        // variables
            let myrole = msg.guild.member(client.user).hasPermission("MANAGE_ROLES");
            let yourole = msg.guild.member(msg.author).hasPermission("MANAGE_ROLES");
            var substr = msg.content.substr(13)
    
            if(!myrole){
                return msg.channel.send({embed: {
                    color: 3447003,
                    description: "Je n'est pas la permissions suffisantes!"
                }});
            }
            if(!yourole){
                return msg.channel.send({embed: {
                    color: 3447003,
                    description: "Vous n'avez pas la permissions suffisantes!"
                }});
            }
    
                    msg.guild.createRole({
                        name: substr,
                        color: 3447003,
                    }).then(r=>{
                        msg.channel.send(`Le role **${substr}** a bien été crée!`);
                    })
             }
            }
    module.exports = createrole;
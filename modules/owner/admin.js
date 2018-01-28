function admin(msg,prefix,client){      
        if (msg.content.startsWith(prefix + "setgame")) {
            if (msg.author.id != '320923152576282624') {return msg.reply("Vous n'avez pas la permission d'utiliser cette commande!")
            } else {
                var game = msg.content.substr(10);
                msg.delete(msg.author)
                client.user.setPresence({game: {name : game, type :0}});
            }}
        }

       /* if(msg.content.startsWith(prefix + 'rename')){
            if(msg.author.id == "320923152576282624"){
                client.user.setUsername(msg.content.substr(8));
            } else {
                msg.channel.send("You do not have permission to use this command!")
              }
            } */

module.exports = admin;  

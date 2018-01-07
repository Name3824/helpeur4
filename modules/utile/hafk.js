function hafk(msg,prefix,client){
    if (msg.content.startsWith(prefix + 'hafk')) {
        msg.delete();
        msg.channel.send({embed: {
            color: 3447003,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            //title: "Voici quelque information ",
            //url: "http://google.com",
            //description: "Voici les commandes les commande diposible",
            fields: [{
                name: "Te mettre **AFK**",
                value: "**<afk** + **raison**",
                inline : true
              },
              {
                name: "Retirer sont **AFK**",
                value: "**<delafk**",
                inline : true
              }
            ],
            footer: {
              icon_url: client.user.avatarURL,
              text: "Dev par TutoRapide"
            }
          }
          });
    }
}
    module.exports = hafk;
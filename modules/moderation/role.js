function role(msg,prefix,client){
    var roleme = ['Homme','Femme','celibataire','En couple'];
    if(msg.content.startsWith(prefix + "role")){
        msg.delete();
        var searchrole = msg.content.slice(msg.content.indexOf(msg.content.split(" ")[1]));						
            var roleauthor = msg.guild.member(msg.author);	
            if(searchrole.includes("Homme") || searchrole.includes("Femme") || searchrole.includes("celibataire") || searchrole.includes("en couple")){
        var homme = msg.guild.roles.find("name", "Joueur Build");
        var femme = msg.guild.roles.find("name", "Joueur Faction")
        var couple = msg.guild.roles.find("name", "Joueur DayZ")
        
        roleauthor.addRole(msg.guild.roles.find("name", searchrole)).then(msg.channel.send("Rôle ajouter avec succée `"+searchrole+"` :smile:"));
            
        }else{	
            msg.channel.send("Je ne trouve pas `"+ searchrole +"` dans ma listes 👀"); 	
        
        }
        }
    };
    module.exports = role;

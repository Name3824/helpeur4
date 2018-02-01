function role(msg,prefix,client){
    var roleme = ['Joueur Build','Joueur Faction,'Joueur DayZ'];
    if(msg.content.startsWith(prefix + "role")){
        msg.delete();
        var searchrole = msg.content.slice(msg.content.indexOf(msg.content.split(" ")[1]));						
            var roleauthor = msg.guild.member(msg.author);	
            if(searchrole.includes("Joueur Build") || searchrole.includes("Joueur Faction") || searchrole.includes("Joueur DayZ")){
        var Joueur Build = msg.guild.roles.find("name", "Joueur Build");
        var Joueur Faction = msg.guild.roles.find("name", "Joueur Faction")
        var Joueur DayZ = msg.guild.roles.find("name", "Joueur DayZ")
        
        roleauthor.addRole(msg.guild.roles.find("name", searchrole)).then(msg.channel.send("Rôle ajouter avec succée `"+searchrole+"` :smile:"));
            
        }else{	
            msg.channel.send("Je ne trouve pas `"+ searchrole +"` dans ma listes 👀"); 	
        
        }
        }
    };
    module.exports = role;

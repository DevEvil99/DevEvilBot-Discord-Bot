const Discord = require("discord.js");
const canvacord = require("canvacord")
module.exports = {
name: "jail",
run: async (client, message, args) => {
      const member =
    message.mentions.users.first() ||
    message.author;
let yee = false
message.channel.startTyping()
  let avatar = member.displayAvatarURL({dynamic : false, format : 'png'});
  let image = await canvacord.Canvas.jail(avatar).catch((err) => { 
    yee = true
    
    message.channel.stopTyping()
    return message.channel.send(err.toString())
  });
  
  
  if(!yee) {
    let attachment = new Discord.MessageAttachment(image, "jail.png");
	message.channel.send(attachment)
	message.channel.stopTyping()
  }
}
};
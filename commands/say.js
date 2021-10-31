const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "say",

    async run (client, message, args) {
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		if(!message.member.hasPermission("ADMINISTRATOR"))return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**')
        if(!message.guild.me.hasPermission("MANAGE_MESSAGE")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permissions : MANAGE_MESSAGE**')
        message.delete()

        let text = message.content.replace(`${messageArry[0]}`, '')
        let sayEmbed = new Discord.MessageEmbed()
        if(text && text !== ""){

            sayEmbed.setDescription(text)
            .setColor(colors.main)
            message.channel.send(sayEmbed)

        }else{
            
            sayEmbed.setDescription("Write a text")
            sayEmbed.setAuthor("Say Command")
            sayEmbed.setColor(colors.main)
            message.channel.send(sayEmbed)
            .then(msg => {
                msg.delete({timeout: 5000})
            })
        }    
	}
}
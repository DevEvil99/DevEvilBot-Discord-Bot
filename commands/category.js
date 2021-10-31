const Discord = require('discord.js');
module.exports = {
    name: "category",

    async run (client, message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**');
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		if(!args[0]) return message.channel.send('**Please include a name for the category**');
		message.guild.channels.create(args.slice(0).join("	"), {type: 'category'}), message.channel.send('<a:yes:784463701305458708> **Category created**');
		
	}
}	

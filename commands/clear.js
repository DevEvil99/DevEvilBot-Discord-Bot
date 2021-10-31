const Discord = require("discord.js");
const colors = require('../colors.json')

module.exports = {
    name: "clear",

    async run (client, message, args) {
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_MESSAGES**");
		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions**')
		if(!args[0]) return message.channel.send("**Please provide a number of messages to be cleared**");
		message.channel.bulkDelete(args[0]).then(() => {
		  message.channel.send(`<a:yes:784463701305458708> **Cleared ${args[0]} messages**`);
		});
		  
	}
} 
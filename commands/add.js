const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "add",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		if(!message.guild.me.hasPermission("MOVE_MEMBERS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MOVE_MEMBERS**')

		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`**<a:no:784463793366761532> Incorrect Usage, Correct Usage : ${prefix}add <member>**`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					message.channel.send(`<a:yes:784463701305458708> **Successfully added ${member} to ${message.channel}**`);
				});
			}
			catch(e) {
				return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
			}
		}
	}
}
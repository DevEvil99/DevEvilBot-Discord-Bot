const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "add-money",

    async run (client, message, args) {
		let pr = db.get(`premium_${message.author.id}`);

		if(!pr) {
			return message.channel.send('<a:no:784463793366761532> **This is premium command**')
		}
		
		let target = db.get(`userb_${message.author.id}`);

		const ban_error = new Discord.MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(color.main)

		if(target) {
			return message.reply(ban_error)
		}

		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
	
		if (!args[0]) return message.reply('<a:no:784463793366761532> **Please specify an amount to add**')
		if (isNaN(args[0])) return message.reply('<a:no:784463793366761532> **That was not a valid number**')
		
		try{
			let user = message.mentions.users.first() || message.author
			message.channel.send(`<a:yes:784463701305458708> **Successfully added ${args[0]} to ${user.tag}**`)
			db.add(`money_${user.id}`, args[0])
		}
		catch(e) {
			return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
		}

	}
}
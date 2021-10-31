const Discord = require('discord.js')

module.exports = {
    name: "addrole",

    async run (client, message, args) {
		if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_ROLES**')
		if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_ROLES**')
		
		try{
					
		let user = message.mentions.members.first()
		if(!user) return message.channel.send('<a:no:784463793366761532> **You need to mention the user**')

		let role = message.mentions.roles.first()
		if(!role) return message.channel.send('<a:no:784463793366761532> **You need to mention the role**')
		if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('<a:no:784463793366761532> **Role Is Currently Higher Than Me Therefore Cannot Add It To The User**')

		message.channel.send(`<a:yes:784463701305458708> ${user} **now has the** ${role} **role**`)
		user.roles.add(role)
		}
		catch(e) {
			return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
		}

	}
}
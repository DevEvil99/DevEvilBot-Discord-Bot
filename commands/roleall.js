const colors = require('../colors.json')
const Discord = require('discord.js');
require('discord-reply'); 
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
const pagination = require('discord.js-pagination');

module.exports = {
    name: "roleall", 

    async run (client, message, args) {
		if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_ROLES**')
            let role = message.mentions.roles.first() 
            if (!role) return message.channel.send(`**${message.author.username}, not found the role**`)
			if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('<a:no:784463793366761532> **Role Is Currently Higher Than Me Therefore Cannot Add It To The User**')
            message.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))
            message.channel.send(`<a:yes:784463701305458708> **All the members now have the ${role} role**`)
        }
}
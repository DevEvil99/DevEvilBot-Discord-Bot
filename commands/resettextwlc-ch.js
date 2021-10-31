const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "resettext-wlc",

    async run (client, message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")) {
			return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**")
		  }
		  
			db.delete(`wlctextch_${message.guild.id}`)
		   return await message.channel.send("<a:yes:784463701305458708> **Reseted text welcome channel**")
		  
	}
}
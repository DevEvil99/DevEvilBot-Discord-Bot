const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "settextwlc-msg",

    async run (client, message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")) {
			return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**")
		  }
		  
			if(!args[0]) {
			return message.channel.send("<a:no:784463793366761532> **Please give the message to set**")
		  }
		  
		  let msg = args.slice(0).join(" ")
		  
		  db.set(`wlctextmsg_${message.guild.id}`, `${msg}`)
		await message.channel.send(`<a:yes:784463701305458708> **Text welcome message seted to ${msg}**`)
	}
}
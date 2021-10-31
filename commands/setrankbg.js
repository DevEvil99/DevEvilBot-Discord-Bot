const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "setrankbg",

    async run (client, message, args) {
		let pr = db.get(`premium_${message.author.id}`);

		if(!pr) {
			return message.channel.send('<a:no:784463793366761532> **This is premium command**')
		}
		
		let user = message.author;
		  
		  if(!args[0]) {
			return message.channel.send("<a:no:784463793366761532> **Please give the link of the image**")
		  }
		  
		  db.set(`rankbg_${user.id}`, args[0])
		await message.channel.send(`<a:yes:784463701305458708> **Rank card background image seted to ${args[0]}**`)
	}
}
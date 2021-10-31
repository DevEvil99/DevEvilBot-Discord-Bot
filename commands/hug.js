const Discord = require('discord.js');
const superagent = require('superagent')
const colors = require('../colors.json')

module.exports = {
    name: "hug",

    async run (client, message, args) {
		if (message.channel.nsfw === false) {
			if (!message.mentions.users.first()) return message.reply("<a:no:784463793366761532> **You need to mention the user**");
			const { body } = await superagent
			.get("https://nekos.life/api/hug");
				const hug = new Discord.MessageEmbed()
				.setTitle(`${message.author.username} hugged ${message.mentions.users.first().username}`)
				.setImage(body.url)
				.setColor(colors.main)
			  message.channel.send(hug)
		}
	}
}
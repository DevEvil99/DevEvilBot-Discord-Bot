const Discord = require('discord.js');
const superagent = require('superagent')
const colors = require('../colors.json')

module.exports = {
    name: "gonewild",

    async run (client, message, args) {
		if (message.channel.nsfw === true) {
			superagent.get('https://nekobot.xyz/api/image')
			.query({ type: 'gonewild'})
			.end((err, response) => {
				const porn = new Discord.MessageEmbed()
				.setTitle('Enjoy :smiling_imp:')
				.setImage(response.body.message)
				.setColor(colors.main)
			  message.channel.send(porn)
			});
		  } else {
			message.channel.send("<a:no:784463793366761532> **This isn't NSFW channel**")
		}
	}
}
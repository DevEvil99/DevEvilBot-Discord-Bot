const Discord = require('discord.js');
const superagent = require('superagent')
const colors = require('../colors.json')

module.exports = {
    name: "ass",

    async run (client, message, args) {
		if (message.channel.nsfw === true) {
			superagent.get('https://nekobot.xyz/api/image')
			.query({ type: 'ass'})
			.end((err, response) => {
				const ass = new Discord.MessageEmbed()
				.setTitle('Enjoy :smiling_imp:')
				.setImage(response.body.message)
				.setColor(colors.main)
			  message.channel.send(ass)
			});
		  } else {
			message.channel.send("<a:no:784463793366761532> **This isn't NSFW channel**")
		}
	}
}
const Discord = require("discord.js")
const colors = require('../colors.json')
module.exports = {
    name: "kill",

    async run (client, message, args) {
		let killed = message.mentions.members.first();
		if(!killed) {
		
		let emb = new Discord.MessageEmbed()
		.setColor(colors.main)
		.setImage('https://media.giphy.com/media/NP62IQxvvTdC0/giphy.gif')
		.setDescription(`${message.author} committed suicide`)
		
		message.channel.send(emb)
		
		} else {
		
		let emb = new Discord.MessageEmbed()
		.setColor(colors.main)
		.setImage('https://tenor.com/view/axe-axe-murderer-murder-gif-10632977')
		.setDescription(`${message.author} kills ${killed}`)
		
		message.channel.send(emb)
	 }	
	
	}
		
}

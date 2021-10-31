const Discord = require("discord.js")
const colors = require('../colors.json')
const ms = require('ms');

module.exports = {
    name: "8ball",

    async run(client, message, args) {
		if(!args[1]) return message.reply("<a:no:784463793366761532> **Plesae enter a full question with 2 or more words**");
		let replies = ["Yes", "No", "I don't know", "Ask again later!","I am not sure!",];
	
		let result = Math.floor((Math.random() * replies.length));
		let question = args.join(" ");
	
		let ballembed = new Discord.MessageEmbed()
	
		.setAuthor(message.author.username)
		.setColor(colors.main)
		.addField("Question", `**${question}**`)
		.addField("Answer", `**${replies[result]}**`);
	
		message.channel.send(ballembed)
	
		message.delete();
	
	
	}
}
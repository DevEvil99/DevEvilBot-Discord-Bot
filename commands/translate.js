const color = require('../colors.json')
const Discord = require('discord.js');
const translate = require('@iamtraction/google-translate')


module.exports = {
    name: "translate",

    async run (client, message, args) {
		const txt = args.slice(1).join(" ")
		const lang = args[0]
		if(!lang) return message.channel.send("**Please provide a ISO code of the language**")
		if(!txt) return message.channel.send("**Please provide a text to translate**")
		translate(txt, { to: lang }).then(res => {
			const embed = new Discord.MessageEmbed()
			.setTitle('Translate')
			.setDescription(`**${res.text}**`)
			.setColor(color.main)
			.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
			message.channel.send(embed); 
		  }).catch(err => {
			message.channel.send("<a:no:784463793366761532> **Please provide a valid ISO language code \n Example : fa, en, ar, fr ...**")
		  });
	}
}
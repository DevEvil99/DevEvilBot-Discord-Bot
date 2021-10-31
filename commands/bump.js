const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const ms = require("ms")

module.exports = {
    name: "bump",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		let cooldown2 = 7.2e+6;
		let amount2 = 1;
	
		let point = await db.fetch(`bump_${message.guild.id}`);
		let points = await db.get(`account.${message.guild.id}.balance`);
	
		try {
			
			if (point !== null && cooldown2 - (Date.now() - point) > 0) {
				return message.channel.send(`<a:no:784463793366761532> **Please wait another 2 hours until the server can be bumped**`);
			} else {
				db.add(`svpoints_${message.guild.id}`, amount2)
	        	db.set(`bump_${message.guild.id}`, Date.now())
				const embed = new Discord.MessageEmbed()
				.setTitle('DevEvilBot.xyz : A Multifunctional Discord Bot')
				.setURL('https://dsc.gg/devevilbot')
				.setDescription(`<a:yes:784463701305458708> **Server bumped** \n**Type \`${prefix}svpoints\` to see the server points**`)
				.setImage('https://cdn.discordapp.com/attachments/468141324906921984/879445217919504384/bumped.png')
				.setColor(color.main)
				.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
				.setTimestamp()
				return message.channel.send(embed);
			}
	
		} catch (error) {
			console.log(error);
			return message.channel.send(`<a:no:784463793366761532> **Oopsie, unknown error I guess: ${error}**`);
		}
	}
}
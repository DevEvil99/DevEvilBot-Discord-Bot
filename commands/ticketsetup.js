const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
const pagination = require('discord.js-pagination');

module.exports = {
    name: "ticketsetup",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		.setTitle('Ticket Commands')
		.addField('Setup a default ticket message', `\`${prefix}ticket-message\``, true)
		.addField('Create a ticket', `\`${prefix}ticket\``, true)
		.addField('Close the ticket', `\`${prefix}close\``, true)
		.addField('Re-opens a ticket', `\`${prefix}open\``, true)
		.addField('Adds a member to a specified ticket', `\`${prefix}add <member>\``, true)
		.addField('Removes a member to a specified ticket', `\`${prefix}remove <member>\``, true)
		.addField('Delete a specified ticket', `\`${prefix}delete\``, true)
		.addField('Transcripts a specified ticket', `\`${prefix}transcript\``, true)
		.setColor(colors.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(page1)
	}
}
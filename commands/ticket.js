const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "ticket",

    async run (client, message, args) {
        let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')

		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply('<a:no:784463793366761532> **You already have a ticket, please close your exsisting ticket first before opening a new one**');
		}

		message.delete();

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			const ticket = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} Ticket\'s`)
			.setDescription(`**${message.author}, Welcome to your channel! Support will be arriving soon**\n**While you wait please tell us what your problem is**\n**If you want to close the ticket please type \`${prefix}close\`**`)
			.setColor(color.main)
			message.reply(`<a:yes:784463701305458708> **You have successfully created a ticket, Please click on ${channel} to view your ticket**`).then(m => m.delete({ timeout: 14000 }).catch(e => {}));
			channel.send(`${message.author}`, ticket);
			let mChannel = db.fetch(`modlog_${message.guild.id}`)
		    let tChannel = message.guild.channels.cache.get(mChannel)
		    if(!tChannel) return;
		    tChannel.send(`**Ticket ${message.author.id} created, Click the following to veiw <#${channel.id}>**`)
		});
	}
}
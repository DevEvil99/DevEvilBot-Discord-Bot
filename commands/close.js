const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const sourcebin = require('sourcebin_js');

module.exports = {
    name: "close",

    async run (client, message, args) {
        let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
        if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.hasPermission('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

					let response;
					try {
						response = await sourcebin.create([
							{
								name: 'DevEvilBot.xyz Ticket',
								content: output,
								languageId: 'text',
							},
						], {
							title: `Chat transcript for ${channel.name}`,
							description: `The ticket of ${message.author.tag}`,
						});
					}
					catch(e) {
						return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
					}

					const embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.tag} Ticket\'s Transcript`)
                    .setDescription(`**Here is a transcript of your ticket, please click the link below to view the transcript** \n**[View](${response.url})**`)
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setColor(color.main);
					member.send(embed);
				}).then(() => {
					try {
						message.channel.updateOverwrite(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`<a:yes:784463701305458708> **Successfully closed ${message.channel}**`);
						});
					}
					catch(e) {
						return message.channel.send('<a:no:784463793366761532> **An error occurred, please try again**');
					}
				});
			}
		}
		else {
			return message.reply('<a:no:784463793366761532> **You cannot use this command here, Please use this command when you\'re closing a ticket**');
		}
    },
}
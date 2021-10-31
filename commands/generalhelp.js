const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "general",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const general = new Discord.MessageEmbed()
		.setTitle('General Commands')
		.addField('Suggest', `\`${prefix}suggest\``)
		.addField('Vote', `\`${prefix}vote\``)
		.addField('Report Bot Bug', `\`${prefix}report <bug>\``)
		.addField('Ping', `\`${prefix}ping\``)
		.addField('Calculator', `\`${prefix}calc\``)
		.addField('Find Emoji', `\`${prefix}find-emoji <emoji name> | find-emoji\``)
		.addField('Create Embed', `\`${prefix}embed\``)
		.addField('Reminder', `\`${prefix}remindme <time> <reminder name>\``)
		.addField('AFK', `\`${prefix}afk <time>\``)
		.addField('Webhook', `\`${prefix}webhook <user> <message>\``)
		.addField('Record Your Voice', `\`${prefix}record-vc\``)
		.addField('Play Your Voice', `\`${prefix}play-vc\``)
		.addField('Delete Your Voice', `\`${prefix}delete-vc <message/request>\``)
		.setColor(colors.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
	    message.channel.send(general)
	}

}
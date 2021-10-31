const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "wlcmsg-embed-help",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		.setTitle('Welcomemessage Options')
		.setDescription('**__Important, Read this, You must use one of this variables in your message__**')
		.addField('Command', `\`${prefix}setwlcmsg-embed <message>\``)
		.addField('Example', `\`${prefix}setwlcmsg-embed {member}, Welcome to {guild}, You are our {count}th Member\``)
		.addField('Welcomemessage Variables', '``{member}, {guild}, {count}``')
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
}
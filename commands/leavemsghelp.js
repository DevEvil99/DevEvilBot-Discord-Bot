const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "leavemsg-help",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		.setTitle('Leavemessage Options')
		.setDescription('**__Important, Read this, You must use one of this variables in your message__**')
		.addField('Command', `\`${prefix}setleavemsg <message>\``)
		.addField('Example', `\`${prefix}setleavemsg {member}, Left the server\``)
		.addField('Leavemessage Variables', '``{member}, {guild}, {count}``')
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
}
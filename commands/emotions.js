const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "emo",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const emo = new Discord.MessageEmbed()
		 .setTitle('Emotions Commands')
		 .addField('Hug', `\`${prefix}hug <user>\``)
		 .addField('Kiss', `\`${prefix}kiss <user>\``)
		 .addField('Pat', `\`${prefix}pat <user>\``)
		 .addField('Slap', `\`${prefix}slap <user>\``)
		 .addField('Love Percentage', `\`${prefix}love <user>\``)
		 .addField('Kill', `\`${prefix}kill [user]\``)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		message.channel.send(emo)
	}
}
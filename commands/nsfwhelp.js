const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "nsfw",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const nsfw = new Discord.MessageEmbed()
		 .setTitle('NSFW Commands')
		 .addField('4K', `\`${prefix}4k\``, true)
		 .addField('Pussy', `\`${prefix}pussy\``, true)
		 .addField('Ass', `\`${prefix}ass\``, true)
		 .addField('Anal', `\`${prefix}anal\``, true)
		 .addField('Blowjob', `\`${prefix}bj\``, true)
		 .addField('Boobs', `\`${prefix}boobs\``, true)
		 .addField('Porn Gif', `\`${prefix}pgif\``, true)
		 .addField('Hentai', `\`${prefix}hentai\``, true)
		 .addField('Thigh', `\`${prefix}thigh\``, true)
		 .addField('Gonewild', `\`${prefix}gonewild\``, true)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		message.channel.send(nsfw)
	}
}
const colors = require('../colors.json')
const Discord = require('discord.js');
require('discord-reply'); 
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
const pagination = require('discord.js-pagination');

module.exports = {
    name: "music-help", 

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const page1 = new Discord.MessageEmbed()
		 .setTitle('Music Commands List')
		 .addField('Play', `\`${prefix}play <song>\``, true)
		 .addField('Pause', `\`${prefix}pause\``, true)
		 .addField('Resume', `\`${prefix}resume\``, true)
		 .addField('Disconnect', `\`${prefix}dc\``, true)
		 .addField('Now Playing', `\`${prefix}np\``, true)
		 .addField('Loop', `\`${prefix}loop\``, true)
		 .addField('Disable Loop', `\`${prefix}disable-loop\``, true)
		 .addField('Queue', `\`${prefix}queue\``, true)
		 .addField('Clear Queue', `\`${prefix}clearq\``, true)
		 .addField('Skip', `\`${prefix}skip\``, true)
		 .addField('Shuffle', `\`${prefix}shuffle\``, true)
		 .addField('Change Volume', `\`${prefix}volume <volume percentage>\``, true)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(page1)
	}
}
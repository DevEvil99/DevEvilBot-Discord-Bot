const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "game",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const game = new Discord.MessageEmbed()
		 .setTitle('Game Commands')
		 .addField('Akinator', `\`${prefix}aki\``)
		 .addField('Roll', `\`${prefix}roll\``)
		 .addField('Rock-Paper-Scissors', `\`${prefix}rps\``)
		 .addField('Dice', `\`${prefix}dice\``)
		 .addField('Would You Rather', `\`${prefix}wyr\``)
		 .addField('Coinflip', `\`${prefix}coinflip\``)
		 .addField('Playstore', `\`${prefix}playstore\``)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		message.channel.send(game)
	}
}
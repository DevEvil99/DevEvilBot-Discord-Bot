const color = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "dice",
	description: 'Rolls dice',

    async run (client, message, args) {
		const dice = Math.floor(Math.random() * 6) + 1
		- 1 + 1;

	const diceembed = new Discord.MessageEmbed()
		.setAuthor(message.member.user.tag)
		.setColor(color.main)
		.setTimestamp()
		.setDescription(`**You got a ${dice}** :game_die:`)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }));
	message.reply({ embed: diceembed });

    }
}


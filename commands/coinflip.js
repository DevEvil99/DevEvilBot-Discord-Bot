const color = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "coinflip",
	description: 'Flips a coin',

    async run (client, message, args) {
		const n = Math.floor(Math.random() * 2);
		let result;
		if (n === 1) result = 'heads';
		else result = 'tails';
		const embed = new Discord.MessageEmbed()
		  .setTitle('Coinflip')
		  .setDescription(`**I flipped a coin for you, ${message.member}. It was ${result}**`)
		  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		  .setTimestamp()
		  .setColor(color.main);
		message.channel.send(embed);

    }
}


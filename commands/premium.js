const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');


module.exports = {
    name: "premium",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const embed = new Discord.MessageEmbed()
		 .setTitle('Premium Commands')
		 .setDescription(`**Do you want premium? [Click Here](https://devevilbot.xyz/devevil-plus)**`)
		 .addField(':trophy: Add XP', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`, true)
		 .addField(':trophy: Set Rank Card Background', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`)
		 .addField(':trophy: Set Profile Card Background', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`)
		 .addField(':currency_exchange: Add Money', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`)
		 .addField(':currency_exchange: Remove Money', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`)
		 .addField('<:verify:836158287107063848> Verification System', `**[Click Here](https://devevilbot.xyz/devevil-plus)**`, true)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		 message.channel.send(embed)
	} 
}
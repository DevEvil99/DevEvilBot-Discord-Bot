const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "lvlsetup",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const ranksetup = new Discord.MessageEmbed()
		.setTitle('Leveling System')
		.setDescription('**Max Level = ``100``**')
		.addField('Set Level Up Channel', `\`${prefix}setrank\``)
		.addField('Disable Level Up Channel', `\`${prefix}disablerankch\``)
		.addField('Rank', `\`${prefix}rank\``)
		.addField('Set Rank Card Background <a:premium:886151535271219240>', `\`${prefix}setrankbg\``)
		.addField('Add XP <a:premium:886151535271219240>', `\`${prefix}add-xp\``)
		.addField('Leaderboard', `\`${prefix}ranklb\``)
		.addField('Level Up', '**From level ``1`` to ``10`` = you will level up with every ``25`` messages** \n**From level ``11`` to ``20`` = you will level up with every ``50`` messages** \n**From level ``21`` to ``30`` = you will level up with every ``100`` messages** \n**From level ``31`` to ``40`` = you will level up with every ``200`` messages** \n**From level ``41`` to ``50`` = you will level up with every ``500`` messages** \n**From level ``51`` to ``60`` = you will level up with every ``1000`` messages**\n**From level ``61`` to ``70`` = you will level up with every ``1100`` messages**\n**From level ``71`` to ``80`` = you will level up with every ``1500`` messages**\n**From level ``81`` to ``90`` = you will level up with every ``2000`` messages**\n**From level ``91`` to ``100`` = you will level up with every ``3000`` messages**')
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(ranksetup)
	}
}
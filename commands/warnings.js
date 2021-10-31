const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) warnings = 0;

	const warningsem = new Discord.MessageEmbed()
	.setTitle('Warnings')
	.setDescription(`**${user} have __${warnings}__ warning(s)**`)
	.setColor(color.main)
	.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))


    message.channel.send(warningsem);
  }
};
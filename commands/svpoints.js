const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
  name: "svpoints",
  run: (client, message, args) => {
    const user = message.mentions.members.first() || message.author;

    let points2 = db.get(`svpoints_${message.guild.id}`);

    if (points2 === null) points2 = 0;

	const em = new Discord.MessageEmbed()
	.setTitle(`Server Points`)
	.setDescription(`**${message.guild.name} have __${points2}__ Points**`)
	.setColor(color.main)
	.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))


    message.channel.send(em);
  }
};
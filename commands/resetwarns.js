const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
  name: "resetwarns",
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**')
	if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		
    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.send("<a:no:784463793366761532> **Please mention a user**");
    }

    if (message.mentions.users.first().bot) {
      return message.channel.send("<a:no:784463793366761532> **Bot are not allowed to have warnings**");
    }

    if (message.author.id === user.id) {
      return message.channel.send("<a:no:784463793366761532> **You are not allowed to reset your warnings**");
    }

    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

    if (warnings === null) {
      return message.channel.send(`<a:no:784463793366761532> **${message.mentions.users.first().username} don\'t have any warnings**`);
    }

    db.delete(`warnings_${message.guild.id}_${user.id}`);
	const resetwarn = new Discord.MessageEmbed()
	.setTitle('Warnings Reseted')
	.setDescription(`<a:yes:784463701305458708> **Your warnings are reseted by ${message.author.username} from ${message.guild.name}**`)
	.setColor(color.main)
	.setTimestamp()
	.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    user.send(
      resetwarn
    );
	const resetwarn2 = new Discord.MessageEmbed()
	.setTitle('Warnings Reseted')
	.setDescription(`<a:yes:784463701305458708> **Reseted all warnings of ${message.mentions.users.first().username}**`)
	.setColor(color.main)
	.setTimestamp()
	.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    await message.channel.send(
      resetwarn2
    );
  }
};
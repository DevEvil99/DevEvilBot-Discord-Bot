const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "unmute",

    async run (client, message, args) {
		if (!message.member.hasPermission("MUTE_MEMBERS")) {
			return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: MUTE_MEMBERS**");
		  }
		  if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
			return message.channel.send("<a:no:784463793366761532> **I do not have the correct permissions | Permission : MUTE_MEMBERS**");
		  }
	  
		  const user = message.mentions.members.first();
	  
		  if (!user) {
			return message.channel.send("<a:no:784463793366761532> **Please mention the member to who you want to unmute**");
		  }
	  
		  let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
	  
		  if (user.roles.cache.has(muterole)) {
			return message.channel.send("<a:no:784463793366761532> **This user dont have a Muted role**");
		  }
	  
		  user.roles.remove(muterole)

		  message.react('<a:yes:784463701305458708>')

		  const mute = new Discord.MessageEmbed()
		.setTitle('User Unmuted')
		.setColor(color.main)
		.addField('Username', `**${message.mentions.users.first().username}**`)
		.addField('Unmuted by', `**${message.author}**`)

		let mChannel = db.fetch(`modlog_${message.guild.id}`)
		if(!mChannel) return message.channel.send(mute)
		let muteChannel = message.guild.channels.cache.get(mChannel)
		if(!muteChannel) return;
		muteChannel.send(mute)
	  
	  
		  user.send(`**You are now unmuted from ${message.guild.name}**`);
		  
		}
}
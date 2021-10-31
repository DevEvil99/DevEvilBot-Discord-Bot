const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "warn",

    async run (client, message, args) {
		var embedColor = '0x5D40F2' 
		
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**')
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		
	  
		  const user = message.mentions.members.first();
	  
		  if (!user) {
			return message.channel.send(
			  "<a:no:784463793366761532> **Please mention a user**"
			);
		  }
	  
		  if (message.mentions.users.first().bot) {
			return message.channel.send("<a:no:784463793366761532> **You can not warn bots**");
		  }
	  
		  if (message.author.id === user.id) {
			return message.channel.send("<a:no:784463793366761532> **You can not warn yourself -_-**");
		  }
	  
		  if (user.id === message.guild.owner.id) {
			return message.channel.send(
			  "<a:no:784463793366761532> **Bruh, you can not warn server owner -_-**"
			);
		  }
	  
		  const reason = args.slice(1).join(" ");
	  
		  if (!reason) {
			return message.channel.send(
			  "<a:no:784463793366761532> **Please provide reason to warn**"
			);
		  }

		  message.react('<a:yes:784463701305458708>')
	  
		  let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);
	  
		  if (warnings === null) {
			db.set(`warnings_${message.guild.id}_${user.id}`, 1);
			var warningEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle(`**You've been warned in ${message.guild.name}**`)
			.addField('Warned by', `**${message.author.tag}**`)
			.addField('Reason', `**${reason}**`)
			.setTimestamp();
			user.send(warningEmbed);

			var warnSuccessfulEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setDescription(`<a:yes:784463701305458708> **User Successfully Warned**`)
			.addField('Warned by', `${message.author}`)
			.addField('Reason', `**${reason}**`)
			let mChannel = db.fetch(`modlog_${message.guild.id}`)
		    if(!mChannel) return message.channel.send(warnSuccessfulEmbed)
		    let warnChannel = message.guild.channels.cache.get(mChannel)
		    if(!warnChannel) return;
		    warnChannel.send(warnSuccessfulEmbed)
		  } else if(warnings !== null) {
			
			db.add(`warnings_${message.guild.id}_${user.id}`, 1);
			
			var warningEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setAuthor(message.author.username, message.author.avatarURL)
			.setTitle(`**You've been warned in ${message.guild.name}**`)
			.addField('Warned by', `**${message.author.tag}**`)
			.addField('Reason', `**${reason}**`)
			.setTimestamp();
			user.send(warningEmbed);
			
			var warnSuccessfulEmbed = new Discord.MessageEmbed()
			.setColor(embedColor)
			.setDescription(`<a:yes:784463701305458708> **User Successfully Warned**`)
			.addField('Warned by', `${message.author}`)
			.addField('Reason', `**${reason}**`)

		    message.delete(); 
		    let mChannel = db.fetch(`modlog_${message.guild.id}`)
		    if(!mChannel) return message.channel.send(warnSuccessfulEmbed)
		    let warnChannel = message.guild.channels.cache.get(mChannel)
		    if(!warnChannel) return;
		    warnChannel.send(warnSuccessfulEmbed)
			
			
		  }
	}
}
const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "mute",

    async run (client, message, args) {
		if (!message.member.hasPermission("ADMINISTRATOR")) {
			return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**");
		  }
		  if (!message.guild.me.hasPermission("MUTE_MEMBERS")) {
			return message.channel.send("<a:no:784463793366761532> **I do not have the correct permissions | Permission : MUTE_MEMBERS**");
		  }
	  
		  const user = message.mentions.members.first();
	  
		  if (!user) {
			return message.channel.send("<a:no:784463793366761532> **Please mention the user for mute**");
		  }
		  if (user.id === message.author.id) {
			return message.channel.send("<a:no:784463793366761532> **I can't mute you because you are message author**");
		  }
		  let reason = args.slice(1).join("");
	  
		  if (!reason) {
			return message.channel.send("<a:no:784463793366761532> **Please give some reason for mute** ");
		  }
		  
	  
		  const vrole = user.roles.cache
	  
		  let muterole = message.guild.roles.cache.find(x => x.name === "Muted");
	  
		  if(!muterole){
			try{
			  muterole = await message.guild.roles.create({
			   data: {
				  name: "Muted",
				  color: "#8b6363",
				  permissions: ['ADD_REACTIONS', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY']
			   },
			  })
			}catch(e){
			  console.log(e.stack);
			}
		}
		  
		  await user.roles.remove(vrole);
		  await user.roles.add(muterole);
		  message.react('<a:yes:784463701305458708>')
		  
		const mute = new Discord.MessageEmbed()
		.setTitle('User Mute')
		.setColor(color.main)
		.addField('Username', `**${message.mentions.users.first().username}**`)
		.addField('Muted by', `**${message.author}**`)
		.addField('Reason', `**${reason}**`)

		let mChannel = db.fetch(`modlog_${message.guild.id}`)
		if(!mChannel) return message.channel.send(mute)
		let muteChannel = message.guild.channels.cache.get(mChannel)
		if(!muteChannel) return;
		muteChannel.send(mute)
	}
}
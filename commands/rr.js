const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');


module.exports = {
    name: "rr",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		if (!message.member.hasPermission("ADMINISTRATION")) {
            return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**");
        }
		
		if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
			return message.channel.send("<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_ROLES**");
		  }

		let channel = message.mentions.channels.first();
		if(!channel) return message.channel.send(`<a:no:784463793366761532> **${prefix}rr <#channeL> <MESSAGEID> <ROLE> <EMOJI>**`)
			if(!args[1]) return message.channel.send(`<a:no:784463793366761532> **${prefix}rr ${channel} <MESSAGEID> <ROLE> <EMOJI>**`)        
		
		let messageid = client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`)
		 if(!messageid) return message.channel.send(`<a:no:784463793366761532> **That's not an vaild message ID** `)
		
		if(isNaN(args[1])) return message.channel.send(`<a:no:784463793366761532> **Message ID Must be a number**`)
		let role = message.mentions.roles.first();
		if(!role) return message.channel.send(`<a:no:784463793366761532> **${prefix}rr ${channel} ${args[1]} <@role> <Emoji>**`)
		let check = message.guild.roles.cache.find(r => r.name === `${role.name}`)
		if(!check) return message.channel.send(`<a:no:784463793366761532> **invaild role**`)
		if(!args[3]) return message.channel.send(`<a:no:784463793366761532> **${prefix}rr ${channel} ${args[1]} ${role.name} <EMOJI> **`)
		function isCustomEmoji(emoji) {
			return emoji.split(":").length == 1 ? false : true;
		  }
		  if (isCustomEmoji(args[3])) {
		  let customemoji = Discord.Util.parseEmoji(args[3]);
		let emojicheck = client.emojis.cache.find(emoji => emoji.id === `${customemoji.id}`);
		if(!emojicheck) return message.channel.send(`<a:no:784463793366761532> **this emoji is invaild**`)
	  let embed = new Discord.MessageEmbed()
	 .setThumbnail(message.guild.iconURL())
	 .setTitle(`<a:yes:784463701305458708> Reaction Role`)
	 .setDescription(`**<a:yes:784463701305458708> Reaction Role Sucsses**
	 
	 **[Go To Message](https://discord.com/channels/${message.guild.id}/${channel.id}/${args[1]})
	  Role : ${role}
	  [Emoji](https://cdn.discordapp.com/emojis/${emojicheck.id}.png?v=1) : ${emojicheck}
	 Channel : ${channel}**
	 `)
	 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
	 .setColor(colors.main)
	
		message.channel.send(embed)
		 client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`).then(a => {
			 a.react(emojicheck.id)
		  db.set(`rrremove_${message.guild.id}_${args[1]}2`, channel.id)
		 db.set(`rrremove_${message.guild.id}_${args[1]}_${args[3]}`, emojicheck.id)
		  db.set(`rerremove_${message.guild.id}_${args[1]}`, args[1])
		 db.set(`emoteid_${message.guild.id}_${emojicheck.id}`, emojicheck.id)
		 db.set(`role_${message.guild.id}_${emojicheck.id}`, role.id)
		 db.set(`message_${message.guild.id}_${emojicheck.id}`, args[1])
		 return;    
		})
			 return;
		}
		  db.set(`rrremove_${message.guild.id}_${args[1]}2`, channel.id)
		 db.set(`rrremove_${message.guild.id}_${args[1]}_${args[3]}`, args[3])
		 db.set(`rerremove_${message.guild.id}_${args[1]}`, args[1])
		 db.set(`emoteid_${message.guild.id}_${args[3]}`, args[3])
		 db.set(`role_${message.guild.id}_${args[3]}`, role.id)
		 db.set(`message_${message.guild.id}_${args[3]}`, args[1])
		 let embed = new Discord.MessageEmbed()
		 .setThumbnail(message.guild.iconURL())
		 .setTitle(`Reaction Role`)
		 .setDescription(`**<a:yes:784463701305458708> Reaction Role Sucsses**
		 
		 **[Go To Message](https://discord.com/channels/${message.guild.id}/${channel.id}/${args[1]})
		  Role : ${role}
		  Emoji : ${args[3]}
		 Channel : ${channel}**
		 `)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		
			message.channel.send(embed)
			 client.channels.cache.get(`${channel.id}`).messages.fetch(`${args[1]}`).then(a => {
				 a.react(args[3])
			 })    
	}
}
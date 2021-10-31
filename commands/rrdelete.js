const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');


module.exports = {
    name: "rrdelete",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		if(!args[0]) return message.channel.send(`<a:no:784463793366761532> **${prefix}rrdelete <messageid> <emoji>**`)
    let channel = await db.get(`rrremove_${message.guild.id}_${args[0]}2`)
    let messageid = await db.get(`rerremove_${message.guild.id}_${args[0]}`)

    if(!channel) return message.channel.send(`<a:no:784463793366761532> **Message ID Not Found**`)
    if(!messageid) return message.channel.send(`<a:no:784463793366761532> **MessageID Not Found**`)
    let a = client.channels.cache.get(channel).messages.fetch(args[0])
   if(!a) return message.channel.send(`<a:no:784463793366761532> **That's Message ID Is Invaild**`)
   if(!args[1]) return message.channel.send(`<a:no:784463793366761532> **${prefix}rrdelete <messageid> <emoji>**`)
   function isCustomEmoji(emoji) {
      return emoji.split(":").length == 1 ? false : true;
    }
    if (isCustomEmoji(args[1])) {

   let customemoji = Discord.Util.parseEmoji(args[1]);
    let emojicheck = client.emojis.cache.find(emoji => emoji.id === `${customemoji.id}`);
   if(!emojicheck) return message.channel.send(`<a:no:784463793366761532> **this emoji is invaild**`)

   let emote = await db.get(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
   if(!emote) return message.channel.send(`<a:no:784463793366761532> **theres no emojis with ${emojicheck} on ${args[0]}**`)
   client.channels.cache.get(channel).messages.fetch(args[0]).then(darkcodes => {
darkcodes.reactions.cache.get(`${emojicheck.id}`).remove() 
   })

   let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`
        **Removed  [Go To Message](https://discord.com/channels/${message.guild.id}/${channel}/${args[0]})**
      **Reaciton Cleared**
      **Reaciton Role Removed**`)
	  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
	  .setColor(colors.main)
        message.channel.send(embed)
        db.delete(`emoteid_${message.guild.id}_${emojicheck}`)
        db.delete(`emojistatus_${args[0]}_${args[1]}`)
        db.delete(`role_${message.guild.id}_${emojicheck}`)
        db.delete(`message_${message.guild.id}_${emojicheck}`)
       db.delete(`rrremove_${message.guild.id}_${args[0]}2`)
       db.delete(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
       db.delete(`rerremove_${message.guild.id}_${args[0]}`)
       return;
}
client.channels.cache.get(channel).messages.fetch(args[0]).then(darkcodes => {
   darkcodes.reactions.cache.get(`${args[1]}`).remove() 
      })
   
      let embed = new Discord.MessageEmbed()
	  .setAuthor(message.author.username, message.author.displayAvatarURL())
	  .setDescription(`
	  **Removed  [Go To Message](https://discord.com/channels/${message.guild.id}/${channel}/${args[0]})**
	**Reaciton Cleared**
	**Reaciton Role Removed**`)
	.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
	.setColor(colors.main)
           message.channel.send(embed)
           db.delete(`emojistatus_${args[0]}_${args[1]}`)
           db.delete(`emoteid_${message.guild.id}_${args[1]}`)
           db.delete(`role_${message.guild.id}_${args[1]}`)
           db.delete(`message_${message.guild.id}_${args[1]}`)
          db.delete(`rrremove_${message.guild.id}_${args[0]}2`)
          db.delete(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
          db.delete(`rerremove_${message.guild.id}_${args[0]}`)
	}
}
const db = require('quick.db')
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const color = require('../colors.json')


module.exports = {
    name: "voicekick",

    async run (client, message, args) {
		if (!message.guild.me.hasPermission(["KICK_MEMBERS"]))
      return message.channel.send(
        "<a:no:784463793366761532> **I dont have a right permission | Permission: KICK_MEMBERS**"
      );

	  if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: KICK_MEMBERS**");
	  }

    if (!message.mentions.members.first())
      return message.channel.send(
        `<a:no:784463793366761532> **Please mention user that you want to kick from voice channel`
      );

    let { channel } = message.mentions.members.first().voice;

    if (!channel)
      return message.channel.send(`<a:no:784463793366761532> **User is not in any voice channel**`);

    message.mentions.members.first().voice.kick();

    message.react('<a:yes:784463701305458708>')

	let e = new Discord.MessageEmbed()
        .setTitle('User has been kicked from voice channel')
        .setColor(color.main)
        .addField('Username', `**${member}**`)
        .addField('Kicked by', `**${message.author}**`)
        .setFooter('Kick time', client.user.displayAvatarURL())
        .setTimestamp()

	let mChannel = db.fetch(`modlog_${message.guild.id}`)
		if(!mChannel) return message.channel.send(e)
		let vkChannel = message.guild.channels.cache.get(mChannel)
		if(!vkChannel) return;
		vkChannel.send(e)
    
	}
}
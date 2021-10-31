const db = require('quick.db')
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ytsr = require('ytsr');

module.exports = {
    name: "setwlc-embed",

    async run (client, message, args) {
		if (!message.member.hasPermission("ADMINISTRATION")) {
            return message.channel.send("<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**");
          }
          let channel = message.mentions.channels.first()
          
          if(!channel) {
            return message.channel.send("<a:no:784463793366761532> **Please Mention the channel first**")
          }
          
          
          db.set(`welcemchannel_${message.guild.id}`, channel.id)
          
          message.channel.send(`<a:yes:784463701305458708> **Welcome Channel is seted as ${channel}**`)



    
	}
}
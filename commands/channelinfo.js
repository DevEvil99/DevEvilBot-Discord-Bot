const colors = require('../colors.json')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "channelinfo",

    async run (client, message, args) {
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send("<a:no:784463793366761532> **Channel Not Found**");

        const embed = new MessageEmbed()
		.setTitle(`Channel Information for ${channel.name}`)
		.setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
		.addField(":underage: NSFW", `**${channel.nsfw}**`)
		.addField(":id: **Channel ID**", `**${channel.id}**`)
		.addField(":file_folder: **Channel Type**", `**${channel.type}**`)
		.addField(":clipboard: **Channel Description**", `**${channel.topic || "No Description"}**`)
		.addField(":calendar: **Channel Created At**", `**${channel.createdAt}**`)
		.setColor(colors.main)
        message.channel.send(embed);
	}
}
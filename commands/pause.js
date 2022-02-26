const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: 'pause',
    description: 'Pause the queue', 
    run: async (client, message, args) => {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`<a:no:784463793366761532> **You must be in a voice channel to play something**`)
            if (!voice_channel) return message.channel.send(embed);
            let song = client.player.pause(message);
            const pause = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`**Type \`${prefix}resume\` to continue playing**`)
            if(song) 
            
            message.channel.send(pause);
    }
}
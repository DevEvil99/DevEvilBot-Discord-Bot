const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')

module.exports = {
    name: 'clearq',
    description: 'Clears the queue', 
    run: async (client, message, args) => {
        const voice_channel = message.member.voice.channel;
        const embed = new MessageEmbed()
        .setColor(colors.main)
        .setDescription(`<a:no:784463793366761532> **You must be in a voice channel to play something**`)
        const embed1 = new MessageEmbed()
        .setColor(colors.main)
        .setDescription('<a:yes:784463701305458708> **Cleared the queue**')
        if (!voice_channel) return message.channel.send(embed);
        let isDone = client.player.clearQueue(message);
        if(isDone)
            message.channel.send(embed1);
    }
}
const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')

module.exports = {
    name: 'disable-loop', 
    description: 'Stop looping the queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`<a:no:784463793366761532> **You must be in a voice channel to play something**`)
            if (!voice_channel) return message.channel.send(embed);

            let status = client.player.setQueueRepeatMode(message, false);

            const disloop = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`<a:yes:784463701305458708> **Queue will not be longer repeated**`)
            if(status === null)
            return;
            message.channel.send(disloop);
    }
}
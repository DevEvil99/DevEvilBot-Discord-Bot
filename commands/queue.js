const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')

module.exports = {
    name: 'queue',
    description: 'Gives you info about the server queue', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`<a:no:784463793366761532> **You must be in a voice channel to play something**`)
            if (!voice_channel) return message.channel.send(embed);
            let queue = client.player.getQueue(message);
            if(queue)
            message.channel.send('**Queue:\n'+(queue.songs.map((song, i) => {
                return `${i === 0 ? 'Now Playing' : `**#${i+1}`} - ${song.name} | ${song.author}**`
            }).join('\n')));
    }
}
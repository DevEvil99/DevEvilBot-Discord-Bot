const { MessageEmbed } = require('discord.js')
const colors = require('../colors.json')

module.exports = {
    name: 'np',
    description: 'Gives info about the song that its being played and the progress of it', 
    run: async (client, message, args) => {
            const voice_channel = message.member.voice.channel;
            const embed = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`<a:no:784463793366761532> **You must be in a voice channel to play something**`)
            if (!voice_channel) return message.channel.send(embed);
            let progressBar = client.player.createProgressBar(message, {
                size: 20,
                block: '▬',
                arrow: '🔘'
            

                
            });
            let song = await client.player.nowPlaying(message)
            const bar = new MessageEmbed()
            .setColor(colors.main)
            .setTitle(`${song.name}`)
            .setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setDescription(`**Requested by ${message.author}
            \`${progressBar}\`**`)

            if(progressBar)

            

                
                message.channel.send(bar);
    }
}
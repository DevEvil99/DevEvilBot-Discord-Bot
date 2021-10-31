const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "play-vc",

    async run (client, message, args) {
		const channel = message.member.voice.channel;
        if(!channel) return message.channel.send('<a:no:863733318809812992> **Please join a voice channel**');

		if(!fs.existsSync(`./recorded-voices/recorded-${message.author.tag}.pcm`)) return message.channel.send('<a:no:863733318809812992> **Your audio is not recorded**')

		const connection = await message.member.voice.channel.join();
		const stream = fs.createReadStream(`./recorded-voices/recorded-${message.author.tag}.pcm`)

		const dispatcher = connection.play(stream, {
			type: 'converted'
		})


		dispatcher.on('finish', () => {
			message.member.voice.channel.leave();
			message.channel.send('<a:yes:784463701305458708> **Finished playing audio**')
		});


	}
}
const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const fs = require('fs');

module.exports = {
    name: "record-vc",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		const channel = message.member.voice.channel;
        if(!channel) return message.channel.send('<a:no:863733318809812992> **Please join a voice channel**');

		const connection = await message.member.voice.channel.join();
		const receiver = connection.receiver.createStream(message.member, {
			mode: "pcm",
            end: "silence"
		})

		const embed = new Discord.MessageEmbed()
		.setDescription(`<a:yes:784463701305458708> **__Attention__ : Your voice is now stored in the database, if you want me play your voice, i need to take your voice from database, if you want delete your voice type \`${prefix}delete-vc\` or join our [support server](https://discord.gg/jsQ9UP7kCA)\n\nFinished recording audio\nType \`${prefix}play-vc\` to play your voice**`)
		.setColor(color.main)
		const writer = receiver.pipe(fs.createWriteStream(`./recorded-voices/recorded-${message.author.tag}.pcm`))
		writer.on('finish', () => {
			message.member.voice.channel.leave();
			message.channel.send(embed)
		});

	}
}
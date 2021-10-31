const randomPuppy = require('random-puppy');
const Discord = require('discord.js');
const colors = require('../colors.json')
module.exports = {
    name: "meme",
    description: "Gives you a meme",
    async run (client, message, args){
        const subReddits = ["dankmeme", "meme", "memes"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random);

        const embed = new Discord.MessageEmbed()
        .setColor(colors.main)
        .setImage(img)
        .setTitle(`This meme from r/${random}`)
        .setURL(`https://reddit.com/r/${random}`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

        message.channel.send(embed).then(m => {
			m.react('😂');
			m.react('😐');
		})
    }
}
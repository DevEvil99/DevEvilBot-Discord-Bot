const color = require('../colors.json')
const Discord = require('discord.js');
const questions = require('../messages/wyr/would-you-rather.json');

module.exports = {
    name: "wyr",
	description: 'The Would you Rather game',

    async run (client, message, args) {

		var messagetext =  questions[Math.floor(Math.random() * questions.length)]
    var question = messagetext.split("Would you rather ")[1]
    var Option1 = question.split(" or ")[0]
    var Option2 = question.split(" or ")[1]

    reply = {
        embed: {
            color: color.main,
            "title": "Would You Rather \n",
            "description": `🅰️ **${Option1}** \n **or** \n :regional_indicator_b: **${Option2}**`,
			"footer": (`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
           
        },
    }
    wyrmessage = await message.channel.send(reply);
    wyrmessage.react('🅰️')
    wyrmessage.react('🇧')



    }
}


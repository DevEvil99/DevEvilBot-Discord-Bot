const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",

    async run (client, message, args) {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024})


        const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar URL`)
        .setURL(avatar)
        .setImage(avatar)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor(colors.main)

        message.channel.send(embed);
    }
}
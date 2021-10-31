const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "savatar",
    description: "Brodcast server avatar",

    async run (client, message, args) {


        let avatar = message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 })


        const embed = new Discord.MessageEmbed()
        .setTitle(`${message.guild.name} Avatar`)
        .setImage(avatar)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setColor(colors.main)

        message.channel.send(embed);
    }
}
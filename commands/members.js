const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "members",

    async run (client, message, args) {
      let embed = new Discord.MessageEmbed()
      .setTitle(`**${message.guild.name}\' Member Count**`)
      .setDescription(
      `
  **Total Members : ${message.guild.memberCount}**
  **Humans : ${message.guild.members.cache.filter(m => !m.user.bot).size}**
  **Bots : ${message.guild.members.cache.filter(m => m.user.bot).size}**`)
      .setColor(color.main)
      .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      
      message.channel.send(embed)

	}
}
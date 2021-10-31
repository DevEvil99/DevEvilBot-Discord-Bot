const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');

module.exports = {
  name: "howgay",
  description: "Show How Gay Member Is!",
  usage: "Howgay <Mention Member>",
  run: async (client, message, args) => {
    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);

    let embed = new Discord.MessageEmbed()
      .setColor(colors.main)
      .setTitle(`Howgay`)
      .setThumbnail(Member.user.displayAvatarURL())
      .setDescription(`**${Member.user.username} Is ${Result}% Gay <a:lgbt_1:873578887018344468><a:lgbt_2:873578864062914592>**`)
	  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

    message.channel.send(embed);

  }
};






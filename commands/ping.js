const Discord = require("discord.js");
const {MessageEmbed} = require('discord.js')
const colors = require('../colors.json')
module.exports = {
  name: "ping",


  description: "Returns latency and API ping",
  timeout: 10000,
  run: async (client, message, args) => {
    message.channel.send("**Pinging...**").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp
      const embed = new MessageEmbed()
        .setTitle('Pong 🏓')
          .setColor(colors.main)
          .setDescription(`**Your Ping : ${ping}**\n\n**Bot Ping : ${Math.round(client.ws.ping)}**`)
          .setFooter(
            `${client.user.username}`,
            client.user.displayAvatarURL({
              format: "png",
              dynamic: true,
              size: 1024,
            })
          );
      message.channel.send(embed)
      m.delete()
    })
  },
};
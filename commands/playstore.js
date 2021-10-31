const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const PlayStore = require("google-play-scraper");
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "playstore",

    async run (client, message, args) {
		if (!args[0])
      return message.channel.send(
        `<a:no:784463793366761532> **Please Give Something To Search**`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `<a:no:784463793366761532> **No Application Found**`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor(color.main)
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(`**${App.summary}**`)
        .addField(`Price`, `**${App.priceText}**`, true)
        .addField(`Developer`, `**${App.developer}**`, true)
        .addField(`Score`, `**${App.scoreText}**`, true)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

      return message.channel.send(Embed);
    });
	}
}
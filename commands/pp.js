const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')

module.exports = {
  name: "ppsize",
  description: "Show Member PP Size",
  run: async (client, message, args) => {
    let sizes = [
      "8D",
      "8=D",
      "8==D",
      "8===D",
      "8====D",
      "8=====D",
      "8======D",
      "8=======D",
      "8========D",
      "8=========D",
      "8==========D",
      "8===========D",
      "8============D",
      "8=============D",
      "8==============D",
      "8===============D",
      "8================D",
      "8==================D"
    ];

    let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = sizes[Math.floor(Math.random() * sizes.length)];

    let embed = new MessageEmbed()
      .setColor(colors.main)
      .setTitle(`Pp Size`)
	  .setThumbnail(Member.user.displayAvatarURL())
      .setDescription(`**${Member.user.username} pp size is :\n${Result}**`)
	  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

    message.channel.send(embed);
  }
};






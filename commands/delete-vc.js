const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "delete-vc",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		let bug = messageArry.join(" ").slice(0);
		let user = message.author.tag;
		let guild = message.guild.name;
		let channel = client.channels.cache.get("885795973522133023")
		const embed = new Discord.MessageEmbed()
		.setTitle("Delete Voice Request")
		.addField("Message", `**${bug}**`)
		.addField("Requested By", `**${user}**`)
        .addField("Requested in", `**${guild}**`)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setColor(colors.main)
		message.channel.send(`<a:yes:784463701305458708> **Your request has been reported in the official server. It will be reviewed so please be patient | Type \`${prefix}server\` for join to our server**`)
		channel.send(embed)
	}
}
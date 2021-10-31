const Discord = require("discord.js");
const client = new Discord.Client();
const colors = require('../colors.json')

module.exports = {
	name: "user",
	
    async run (client, message, args) {
		const member = message.mentions.members.first() || message.member;
		let target = message.mentions.users.first() || message.author
		let inline = true
		let resence = true
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0];   
		const status = {
			online: "**Online**",
			idle: "**Idle**",
			dnd: "**Do Not Disturb**",
			offline: "**Offline/Invisible**"
		}
		let embed = new Discord.MessageEmbed()
		.setThumbnail(target.displayAvatarURL({ format: "png", dynamic: true, size: 1024}))
		.setColor(colors.main)
		.addField(":id: Full Username", `**${member.user.tag}**`)
		.addField(":id: ID", `**${member.user.id}**`)
		.addField(":bust_in_silhouette: Nickname", `${member.nickname !== null ? `**Nickname:** ${member.nickname}` : "**None**"}`)
		.addField(":satellite_orbital: Status", `${status[member.user.presence.status]}`, inline, true)
		.addField(":video_game: Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "**Not playing**"}`)
		.addField(":calendar: Joined Discord At", `**${member.user.createdAt}**`)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		.setTimestamp()
		message.channel.send(embed);

	}
}

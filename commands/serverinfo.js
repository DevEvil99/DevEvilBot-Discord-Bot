const Discord = require("discord.js");
const client = new Discord.Client();
const colors = require('../colors.json')
const dateformat = require('dateformat');

module.exports = {
	name: "serverinfo",
	
    async run (client, message, args) {
		let x = Date.now() - message.guild.createdAt;
		let h = Math.floor(x / 86400000) 
		let created = dateformat(message.guild.createdAt);
	
		let member = message.guild.members; 
		let offline = member.cache.filter(m => m.user.presence.status === "offline").size,
			online = member.cache.filter(m => m.user.presence.status === "online").size,
			idle = member.cache.filter(m => m.user.presence.status === "idle").size,
			dnd = member.cache.filter(m => m.user.presence.status === "dnd").size,
			robot = member.cache.filter(m => m.user.bot).size,
			total = message.guild.memberCount;
	
		let channels = message.guild.channels;
		let text = channels.cache.filter(r => r.type === "text").size,
			vc = channels.cache.filter(r => r.type === "voice").size,
			category = channels.cache.filter(r => r.type === "category").size,
			totalchan = channels.cache.size;
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0];   

			let serverinfoEmbed = new Discord.MessageEmbed()  
			  .setTitle("Server Info")
			  .addField(":id: Server ID", `**${message.guild.id}**`)
			  .addField(":id: Server Name", `**${message.guild.name}**`)
			  .addField(":crown: Server Owner", `${message.guild.owner}`)
			  .addField(":earth_africa: Server Region", `**${message.guild.region}**`)
			  .addField(":lock: Verification Level", `**${message.guild.verificationLevel}**`)
			  .addField(":calendar: Date Created", `**${created}** \n**since** **${h}** **days**`)
			  .addField(":calendar: Date You Joined", `**${message.member.joinedAt}**`)
			  .addField(`:speech_balloon: Channels [${totalchan}]`, `**Text:** **${text}** \n**Voice:** **${vc}** \n**Category:** **${category}**`)
			  .addField(`:busts_in_silhouette: Members [${total}]`, `**Online:** **${online}** \n**Idle:** **${idle}** \n**DND:** **${dnd}** \n**Offline:** **${offline}** \n**Bots:** **${robot}**`)
			  .setColor(colors.main)
			  .setThumbnail(message.guild.iconURL({ format: "png", dynamic: true, size: 1024}))
			  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
			  .addField(':performing_arts: Roles', `${message.guild.roles.cache.map(role => role.toString()).join(' ')}`);
			message.channel.send(serverinfoEmbed)
	}
}
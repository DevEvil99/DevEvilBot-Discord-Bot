const { MessageEmbed } = require("discord.js");
const colors = require('../colors.json')
module.exports = {
    name: "roleinfo",

    async run (client, message, args) {
		if (!args[0]) return message.channel.send("<a:no:784463793366761532> **You need to mention the role**")
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
        if (!role) return message.channel.send("<a:no:784463793366761532> **Please enter a valid role**");

        const status = {
            false: "**No**",
            true: "**Yes**"
        }

        let roleembed = new MessageEmbed()
            .setColor(colors.main)
            .setAuthor("Role Info")
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(":id: ID", `\`${role.id}\``)
            .addField(":id: Name", `**${role.name}**`)
            .addField(":white_circle: Hex", `**${role.hexColor}**`)
            .addField(":busts_in_silhouette: Members", `**${role.members.size}**`)
            .addField(":dividers: Position", `**${role.position}**`)
            .addField(":pushpin: **Mentionable**", `**${status[role.mentionable]}**`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp()

        message.channel.send(roleembed);
	}
}
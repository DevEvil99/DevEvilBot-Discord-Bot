const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const colors = require('../colors.json')

module.exports = {
    name: "crrole",

    async run (client, message, args) {
		try {
			if (!message.member.hasPermission('MANAGE_ROLES')) {
				return message.reply('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_ROLES**')
			}
			if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_ROLES**')

            let prefix = await db.get(`prefix_${message.guild.id}`);
            if(prefix === null) prefix = default_prefix;


            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };

			var i = 0; i < 250;


            const f = new Discord.MessageEmbed()
            .setTitle('Name')
            .setDescription('**Set a name for role**')
            .setColor(colors.main)
            message.channel.send(f);
            let title = await message.channel.awaitMessages(filter, options);

			const w = new Discord.MessageEmbed()
            .setTitle('Color')
            .setDescription('**What color do you want for the role ? Type the color name or hex code**')
            .setColor(colors.main)
            message.channel.send(w);
            let Color = await message.channel.awaitMessages(filter, options);
    
			message.guild.roles.create({
				data: {
					name: `${title.first().content}`,
					position: i++,
					color: `${Color.first().content.toUpperCase() || "2f3136"}`
				}
			})
            message.channel.send(`<a:yes:784463701305458708> **Successfully created the role**`)
        } catch (error) {
            console.error(error);
        }
	}
}
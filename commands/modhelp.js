const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
module.exports = {
    name: "mod",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
		const mod = new Discord.MessageEmbed()
		 .setTitle('Moderation Commands')
		 .setDescription(`**If you want add role to someone with my command \`${prefix}addrole\` you need to put my role higher than that role , For \`${prefix}rrole\` you have to do the same**`)
		 .addField('Ban ', `\`${prefix}ban <user> <reason>\``, true)
		 .addField('Unban ', `\`${prefix}unban <user ID>\``, true)
		 .addField('IDBan', `\`${prefix}idban <user ID>\``, true)
		 .addField('Kick', `\`${prefix}kick <user> <reason>\``, true)
		 .addField('Voice Kick', `\`${prefix}voicekick <user>\``, true)
		 .addField('Mute', `\`${prefix}mute <user> <reason>\``, true)
		 .addField('Tempmute', `\`${prefix}tempmute <user> <duration>\``, true)
		 .addField('Unmute', `\`${prefix}unmute <user>\``, true)
		 .addField('Warn', `\`${prefix}warn <user> <reason>\``, true)
		 .addField('Warnings', `\`${prefix}warnings [user]\``, true)
		 .addField('Reset Warns', `\`${prefix}resetwarns <user>\``, true)
		 .addField('Add Role', `\`${prefix}addrole <user> <role>\``, true)
		 .addField('Remove Role', `\`${prefix}rrole <user> <role>\``, true)
		 .addField('Role All', `\`${prefix}roleall <role>\``, true)
		 .addField('Create Role', `\`${prefix}crrole\``, true)
		 .addField('Set Nickname', `\`${prefix}setnickname <user> <nickname>\``, true)
		 .addField('Create Category', `\`${prefix}category <category name>\``, true)
		 .addField('Create Text Channel', `\`${prefix}text-channel <channel name>\``, true)
		 .addField('Create Voice Channel', `\`${prefix}voice-channel <channel name>\``, true)
		 .addField('Slowmode', `\`${prefix}slowmode <duration>\``, true)
		 .addField('Lock Channel', `\`${prefix}lock\``, true)
		 .addField('Unlock Channel', `\`${prefix}unlock\``, true)
		 .addField('Clear', `\`${prefix}clear <amount of message>\``, true)
		 .addField('Say', `\`${prefix}say <text>\``, true)
		 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		 .setColor(colors.main)
		message.channel.send(mod)
	}
} 
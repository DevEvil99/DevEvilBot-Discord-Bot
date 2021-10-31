const db = require("quick.db")

module.exports = {
    name: "setmodlog",

    async run (client, message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**')
		if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
		if (!args[0]) {
		  let b = await db.fetch(`modlog_${message.guild.id}`);
		  let channelName = message.guild.channels.cache.get(b);
		  if (message.guild.channels.cache.has(b)) {
			return message.channel.send(
			  `**Modlog Channel Set In This Server Is \`${channelName.name}\`**`
			);
		  } else
			return message.channel.send(
			  "**<a:no:784463793366761532> Please Enter A Channel Name or ID To Set**"
			);
		}
			let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
	
			if (!channel || channel.type !== 'text') return message.channel.send("**<a:no:784463793366761532> Please Enter A Valid Text Channel**");
	
			try {
				let a = await db.fetch(`modlog_${message.guild.id}`)
	
				if (channel.id === a) {
					return message.channel.send("**<a:no:784463793366761532> This Channel is Already Set As Modlog Channel**")
				} else {
					client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("<a:yes:784463701305458708> **Modlog Channel Set**")
					db.set(`modlog_${message.guild.id}`, channel.id)
	
					message.channel.send(`<a:yes:784463701305458708> **Modlog Channel Has Been Set Successfully in \`${channel.name}\`**`)
				}
			} catch {
				return message.channel.send("<a:no:784463793366761532> **Error - `Missing Permissions Or Channel Is Not A Text Channel`**");
			}	
	}
}

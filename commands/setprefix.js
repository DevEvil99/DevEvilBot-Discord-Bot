const db = require('quick.db');

module.exports = {
    name: "prefix",
    description: "Set a server's prefix",

    async run (client, message, args) {
		if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: ADMINISTRATOR**');
        if(!message.guild.me.hasPermission("MANAGE_GUILD")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_GUILD / MANAGE_SERVER**')
        
        if(!args[0]) return message.channel.send('**Please provide a new prefix**');

        if(args[1]) return message.channel.send('<a:no:784463793366761532> **The prefix can\'t have two spaces**');

        db.set(`prefix_${message.guild.id}`, args[0])

        message.channel.send(`<a:yes:784463701305458708> **Successfully set new prefix to** **${args[0]}**`)
    }
}
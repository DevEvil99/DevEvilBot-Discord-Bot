const config = require('../config.json')
const ms = require('ms');

module.exports = {
    name: "end-ga",
    description: "Ends a giveaway",

    async run(client, message, args) {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_MESSAGES**');
		}
		
		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_MESSAGES**')
	
		if(!args[0]){
			return message.channel.send('<a:no:784463793366761532> **You have to specify a valid message ID**');
		}
	

		let giveaway = 

		client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||

		client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);
	

		if(!giveaway){
			return message.channel.send(`<a:no:784463793366761532> **Unable to find a giveaway for ${args.join(' ')}**`);
		}
	

		client.giveawaysManager.edit(giveaway.messageID, {
			setEndTimestamp: Date.now()
		})

		.then(() => {

			message.channel.send(`<a:yes:784463701305458708> **Giveaway will end in less than ${(client.giveawaysManager.options.updateCountdownEvery/1000)} seconds...**`);
		})
		.catch((e) => {
			if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended`)){
				message.channel.send('<a:no:784463793366761532> **This giveaway is already ended**');
			} else {
				console.error(e);
				message.channel.send('<a:no:784463793366761532> **An error occured**');
			}
		});
	}
}
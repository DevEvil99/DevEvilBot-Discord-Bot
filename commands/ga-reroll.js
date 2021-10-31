const { MessageEmbed } = require('discord.js')
const ms = require('ms');
module.exports = {
  name: "reroll",
    run: async (client, message, args) => {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_MESSAGES**');
		}

    if(!args[0]){
        return message.channel.send('<a:no:784463793366761532> **You have to specify a valid message ID**');
    }

    let giveaway = 

    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||

    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);


    if(!giveaway){
        return message.channel.send(`<a:no:784463793366761532> **Unable to find a giveaway for ${args.join(' ')}**`);
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('<a:yes:784463701305458708> **Giveaway rerolled**');
    })
    .catch((e) => {
        if(e.startsWith(`**Giveaway with message ID ${giveaway.messageID} is not ended**`)){
            message.channel.send('**This giveaway is not ended**');
        } else {
            console.error(e);
            message.channel.send('**An error occured**');
        }
    });

    }
}
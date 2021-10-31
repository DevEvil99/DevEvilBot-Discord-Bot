const color = require('../colors.json')
const Discord = require('discord.js');
const config = require('../config.json')
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const ms = require('ms');

module.exports = {
    name: "giveaway",

    async run (client, message, args) {
		if(!message.member.hasPermission('MANAGE_MESSAGES')) {
			return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_MESSAGES**');
		}

		if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_MESSAGES**')
	

		let giveawayChannel = message.mentions.channels.first();

		if(!giveawayChannel){
			return message.channel.send('<a:no:784463793366761532> **Please provide a channel**');
		}
	

		let giveawayDuration = args[1];

		if(!giveawayDuration || isNaN(ms(giveawayDuration))){
			return message.channel.send('<a:no:784463793366761532> **Pleae provide a valid duration**');
		}
	

		let giveawayNumberWinners = args[2];

		if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
			return message.channel.send('<a:no:784463793366761532> **Please provide a valid number of winners**');
		}
	

		let giveawayPrize = args.slice(3).join(' ');

		if(!giveawayPrize){
			return message.channel.send('<a:no:784463793366761532> **You have to specify a valid prize | Example : nitro**');
		}
	
		client.giveawaysManager.start(giveawayChannel, {

			time: ms(giveawayDuration),

			prize: giveawayPrize,

			winnerCount: parseInt(giveawayNumberWinners),

			hostedBy: config.hostedBy ? message.author : null,

			messages: {
				giveaway: (config.everyoneMention ? "@everyone\n\n" : "") + "**GIVEAWAY**",
                giveawayEned: (config.everyoneMention ? "@everyone\n\n" : "") + "**GIVEAWAY ENDED**",
                timeRemaining: `**Time remaining :** **{duration}**`,
                inviteToParticipate: "**React with 🎉 to enter**",
                winMessage: `**Congrats {winners}, you won** **{prize}**`,
                embedFooter: "**Giveaway time**",
                noWinner: "**Couldn't determine a winner**",
                hostedBy: `**Hosted by {user}**`,
                winners: "winner(s)",
                endedAt: "Ends at",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
			}
		});
	
		message.channel.send(`<a:yes:784463701305458708> **Giveaway starting in ${giveawayChannel}**`);
	}
}
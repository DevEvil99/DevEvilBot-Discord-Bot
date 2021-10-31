const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms")

module.exports = {
    name: "lottery",

    async run (client, message, args) {
		let target = db.get(`userb_${message.author.id}`);

		const ban_error = new Discord.MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(color.main)

		if(target) {
			return message.reply(ban_error)
		}
		
		let pad_zero = num => (num < 10 ? '0' : '') + num;
		let cooldown2 = 2592000000;
		let amount = Math.floor(Math.random() * 5000000);
	
		let lott = await db.fetch(`daily_${message.author.id}`);
		let buck = await db.get(`account.${message.author.id}.balance`);
	
		try {
			
			if (lott !== null && cooldown2 - (Date.now() - lott) > 0) {
				let timeObj2 = ms(cooldown2 - (Date.now() - lott));
	
				let hours = pad_zero(timeObj2.hours).padStart(2, "0"),
					mins = pad_zero(timeObj2.minutes).padStart(2, "0"),
					secs = pad_zero(timeObj2.seconds).padStart(2, "0");
	
				let finalTime = `**${hours}:${mins}:${secs}**`;
				return message.channel.send(`<a:no:784463793366761532> **You can enter in lottery every month**`);
			} else {
				db.add(`money_${message.author.id}`, amount)
	        	db.set(`daily_${message.author.id}`, Date.now())
				return message.channel.send(`<a:yes:784463701305458708> **WOW ${message.author.tag}, You won ${amount}**`);
			}
	
		} catch (error) {
			console.log(error);
			return message.channel.send(`<a:no:784463793366761532> **Oopsie, unknown error I guess: ${error}**`);
		}
	}
}
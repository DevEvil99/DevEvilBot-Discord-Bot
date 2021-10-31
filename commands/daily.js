const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms")

module.exports = {
    name: "daily",

    async run (client, message, args) {
		let target = db.get(`userb_${message.author.id}`);

		const ban_error = new Discord.MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(colors.main)

		if(target) {
			return message.reply(ban_error)
		}

		let pad_zero = num => (num < 10 ? '0' : '') + num;
		let cooldown = 8.64e+7;
		let amount = 500;
	
		let lastDaily = await db.fetch(`daily_${message.author.id}`);
		let buck = await db.get(`account.${message.author.id}.balance`);
	
		try {
			
			if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
				let timeObj = ms(cooldown - (Date.now() - lastDaily));
	
				let hours = pad_zero(timeObj.hours).padStart(2, "0"),
					mins = pad_zero(timeObj.minutes).padStart(2, "0"),
					secs = pad_zero(timeObj.seconds).padStart(2, "0");
	
				let finalTime = `**${hours}:${mins}:${secs}**`;
				return message.channel.send(`<a:no:784463793366761532> **You already collected your daily reward**`);
			} else {
				db.add(`money_${message.author.id}`, amount)
	        	db.set(`daily_${message.author.id}`, Date.now())
				return message.channel.send(`<a:yes:784463701305458708> **Great ${message.author.tag} You've been received 500 DB Coin <:DevEvilBot_Coin:867679208855437333>**`);
			}
	
		} catch (error) {
			console.log(error);
			return message.channel.send(`<a:no:784463793366761532> **Oopsie, unknown error I guess: ${error}**`);
		}
	}
}
const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require("quick.db");
const ms = require("ms");

module.exports = {
    name: "gamble",

    async run (client, message, args) {
		let target = db.get(`userb_${message.author.id}`);

		const ban_error = new Discord.MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(colors.main)

		if(target) {
			return message.reply(ban_error)
		}

		let user = message.author

		const amount = parseInt(args[0]);
		const result = Math.floor(Math.random() * 10);
		const balance = await db.fetch(`money_${user.id}`);
	
		if (!amount) return message.channel.send("**Please insert an amount first**");
		if (isNaN(amount)) return message.channel.send("<a:no:784463793366761532> **The amount was not a number**");
		if (amount > balance || !balance || balance === 0) return message.channel.send("<a:no:784463793366761532> **You don't have enough money**");
		
		// Optional:
		if (amount < 200) return message.channel.send("<a:no:784463793366761532> **You don't have enough money for gambling. The minimum was $200**");
	
		let cooldown = 25000; // 25 Seconds.
		let pad_zero = num => (num < 10 ? '0' : '') + num;
		let lastGamble = await db.get(`lastGamble.${message.author.id}`);
	
		if (lastGamble !== null && cooldown - (Date.now() - lastGamble) > 0) {
			let timeObj = ms(cooldown - (Date.now() - lastGamble));
			let second = pad_zero(timeObj.seconds).padStart(2, "0");
			return message.channel.send(`**That is too fast. You need to wait ${second} second(s) before you can gambling again**`);
		}
	
		// 50:50
		if (result < 5) {
			await db.set(`lastGamble.${message.author.id}`, Date.now());
			await db.subtract(`money_${message.author.id}`, amount);
			return message.channel.send(`**Ahh, no. You lose $${amount}. Good luck next time.**`);
		} else if (result > 5) {
			await db.set(`lastGamble.${message.author.id}`, Date.now());
			await db.add(`money_${message.author.id}`, amount);
			return message.channel.send(`**You won $${amount} Good luck, have fun**`);
		}
	}
}
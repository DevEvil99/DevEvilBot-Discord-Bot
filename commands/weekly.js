const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const ms = require("ms")
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "weekly",

    async run (client, message, args) {
      let target = db.fetch(`userb_${message.author.id}`);

		const ban_error = new Discord.MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(color.main)

		if(target) {
			return message.channel.send(ban_error)
		}
    
		let timeout = 604800000 
    let amount = 1000



    let weekly = await db.fetch(`weekly_${message.author.id}`);

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
        let time = ms(timeout - (Date.now() - weekly));

        message.channel.send(`<a:no:784463793366761532> **You already collected your weekly reward**`)
    } else {
    message.channel.send(`<a:yes:784463701305458708> **Great ${message.author.tag} You've been received 1000 DB Coin <:DevEvilBot_Coin:867679208855437333>**`)
    db.add(`money_${message.author.id}`, amount)
    db.set(`weekly_${message.author.id}`, Date.now())
        
    }
	}
}
const db = require('quick.db')
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const color = require('../colors.json')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "roulette",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		let user = message.author;

        function isOdd(num) {
            if ((num % 2) == 0) return false;
            else if ((num % 2) == 1) return true;
        }

        let colour = args[0];
        let money = parseInt(args[1]);
        let moneydb = await db.fetch(`money_${message.author.id}`)

        let random = Math.floor((Math.random() * 10));

        let moneyhelp = new MessageEmbed()
            .setColor(color.main)
            .setDescription(`<a:no:784463793366761532> **Specify an amount to gamble**`);

        let moneymore = new MessageEmbed()
            .setColor(color.main)
            .setDescription(`<a:no:784463793366761532> **You are betting more than you have**`);

        let colorbad = new MessageEmbed()
            .setColor(color.main)
            .setDescription(`<a:no:784463793366761532> **Specify a color, Red [1.5x], Black [2x], Green [15x]**`);

        if (!colour) return message.channel.send(colorbad);
        colour = colour.toLowerCase()
        if (!money) return message.channel.send(moneyhelp);
        if (money > moneydb) return message.channel.send(moneymore);

        if (colour == "b" || colour.includes("black")) colour = 0;
        else if (colour == "r" || colour.includes("red")) colour = 1;
        else if (colour == "g" || colour.includes("green")) colour = 2;
        else return message.channel.send(colorbad);

        if (random == 1 && colour == 2) { 
            money *= 15
            db.add(`money_${user.id}`, money)
            let moneyEmbed1 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`🟩 **You won ${money} <:DevEvilBot_Coin:867679208855437333>**\n\n**Multiplier : 15x**`);
            message.channel.send(moneyEmbed1)
        } else if (isOdd(random) && colour == 1) {
            money = parseInt(money * 1.5)
            db.add(`money_${user.id}`, money)
            let moneyEmbed2 = new MessageEmbed()
                .setColor("RED")
                .setDescription(`🟥 **You won ${money} <:DevEvilBot_Coin:867679208855437333>**\n\n**Multiplier : 1.5x**`);
            message.channel.send(moneyEmbed2)
        } else if (!isOdd(random) && colour == 0) {
            money = parseInt(money * 2)
            db.add(`money_${user.id}`, money)
            let moneyEmbed3 = new MessageEmbed()
                .setColor("BLACK")
                .setDescription(`⬛ **You won ${money} <:DevEvilBot_Coin:867679208855437333>**\n\n**Multiplier : 2x**`);
            message.channel.send(moneyEmbed3)
        } else { 
            db.subtract(`money_${user.id}`, money)
            let moneyEmbed4 = new MessageEmbed()
                .setColor(color.main)
                .setDescription(`<a:no:784463793366761532> **You lost ${money} <:DevEvilBot_Coin:867679208855437333>**\n\n **Multiplier : 0x**`);
            message.channel.send(moneyEmbed4)
        }
          db.add(`money_${message.author.id}`, 1)
	}
}
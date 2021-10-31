const colors = require('../colors.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms");
const db = require('quick.db')

module.exports = {
    name: "afk",

    async run (client, message, args) {		
        let user = message.author;
        let time = args[0];
        let reason = args.slice(1).join(' ');
    
         
        if(!time) return message.channel.send("<a:no:784463793366761532> **Please specify an time**");

		const embed = new Discord.MessageEmbed()
		.setDescription(`**You are now AFK**`)
		.setColor(colors.main)
		message.channel.send(embed)

        setTimeout(function(){
			const unmute = new Discord.MessageEmbed()
			.setColor(colors.main)
			.setDescription(`**You are no longer AFK**`)
			message.channel.send(user, unmute)

        }, ms(time));
    }
	
	

}
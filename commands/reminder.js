const colors = require('../colors.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const ms = require("ms");
const db = require('quick.db')

module.exports = {
    name: "remindme",

    async run (client, message, args) {		
        let user = message.author;
        let time = args[0];
        let reason = args.slice(1).join(' ');
    
         
        if(!time) return message.channel.send("<a:no:784463793366761532> **Please specify an time**");
        if(!reason) return message.channel.send("<a:no:784463793366761532> **Please specify an name for reminder**")

		const embed = new Discord.MessageEmbed()
		.setDescription(`**I will remind you in \`${time}\`**`)
		.setColor(colors.main)
		message.channel.send(embed)

        setTimeout(function(){
			const unmute = new Discord.MessageEmbed()
			.setColor(colors.main)
			.setDescription(`**Reminder ${user} : ${reason}**`)
			message.channel.send(user, unmute)

        }, ms(time));
    }
	
	

}
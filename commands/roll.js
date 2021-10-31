const color = require('../colors.json')
const Discord = require('discord.js');
const HorsengelRoulette = require('horsengel-roulette');

module.exports = {
    name: "roll",

    async run (client, message, args) {
		seven = ':seven:';
		cherries = ':cherries:';
		crown = ':crown:'; 
		poop = ':poop:';
	   
		//Array with all variables
		var rolls = [seven, cherries, crown, poop];
		var rollpick1 = rolls[Math.floor(Math.random() * rolls.length)];
		var rollpick2 = rolls[Math.floor(Math.random() * rolls.length)];
		var rollpick3 = rolls[Math.floor(Math.random() * rolls.length)];
		const finish = '**This will be changed automatically**';
		//Result of roll command
		if (rollpick1 != 'poop' && rollpick1 == rollpick2 && rollpick2 == rollpick3) {
			const finish = '**We have a winner, You got your cash out**';
		} else {
			const finish = '**Bad luck... Try again**';
		const rollembed1 = new Discord.MessageEmbed() 
		.setColor (color.main)
		.setTitle ('Started Rolling')
		.setDescription ('🟥   🟥   🟥')
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		const rollembed2 = new Discord.MessageEmbed()
		.setColor (color.main)
		.setTitle ('This is the result :')
		.setDescription (rollpick1 + '   ' + rollpick2 + '   ' + rollpick3)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(rollembed1).then((message)=> {
			setTimeout(function(){
				message.edit(rollembed2);
			}, 1500)
			});
		}

	}
}
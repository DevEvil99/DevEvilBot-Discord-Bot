const Discord = require("discord.js");
let giveMeAJoke = require('give-me-a-joke');;

module.exports = {
    name: "joke",

    async run (client, message, args) {
		giveMeAJoke.getRandomDadJoke(function(joke){
			message.channel.send(joke).then(m => {
				m.react('😂');
				m.react('😐');
			})	
		})

	}
}	
const color = require('../colors.json')
const Discord = require('discord.js');
const rps = ['scissors','rock', 'paper'];
const res = ['Scissors :scissors:','Rock <:rock1:835858199021879296>', 'Paper :page_facing_up:'];
module.exports = {
    name: "rps",
	description: 'Play a game of rock–paper–scissors against DevEvil.xyz',

    async run (client, message, args) {
		let userChoice;
    if (args.length) userChoice = args[0].toLowerCase();
    if (!rps.includes(userChoice)) return message.channel.send('**Please enter rock, paper, or scissors**');
    userChoice = rps.indexOf(userChoice);
    const botChoice = Math.floor(Math.random()*3);
    let result;
    if (userChoice === botChoice) result = '**It\'s a draw**';
    else if (botChoice > userChoice || botChoice === 0 && userChoice === 2) result = '**DevEvil.xyz wins <a:CupGif:788458892497125436>**';
    else result = `**${message.member.displayName} wins <a:CupGif:788458892497125436>**`;
    const embed = new Discord.MessageEmbed()
      .setTitle(`${message.member.displayName} vs. DevEvilBot.xyz`)
      .addField('Your Choice:', res[userChoice], true)
      .addField('DevEvilBot.xyz\'s Choice', res[botChoice], true)
      .addField('Result', result, true)
	  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setTimestamp()
      .setColor(color.main);
    message.channel.send(embed);


    }
}


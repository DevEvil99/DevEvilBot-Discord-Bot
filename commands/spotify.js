const colors = require('../colors.json')
const Discord = require('discord.js');

module.exports = {
    name: "spotify",

    async run (client, message, args) {
		let messageArry = message.content.split(" ")
		let cmd = messageArry[0]; 
		let user;
		if (message.mentions.users.first()) {
		  user = message.mentions.users.first(); 
		} else { 
		  user = message.author;
		} 
		
		let convert = require('parse-ms')   
		  
		let status;
		if (user.presence.activities.length === 1) status = user.presence.activities[0];
		else if (user.presence.activities.length > 1) status = user.presence.activities[1];
	
		if (user.presence.activities.length === 0 || status.name !== "Spotify" && status.type !== "LISTENING") {
			return message.channel.send("<a:no:784463793366761532> **This user is not currently listening to Spotify**");
		}
	
		if (status !== null && status.type === "LISTENING" && status.name === "Spotify" && status.assets !== null) {
		  let image = `https://i.scdn.co/image/${status.assets.largeImage.slice(8)}`,
			  url = `https://open.spotify.com/track/${status.syncID}`,
			  name = status.details,
			  artist = status.state,
			  album = status.assets.largeText,  
			  timeStart = status.timestamps.start, 
			  timeEnd = status.timestamps.end,
			  timeConvert = convert(timeEnd - timeStart);
		  
		  let minutes = timeConvert.minutes < 10 ? `0${timeConvert.minutes}` : timeConvert.minutes;
		  let seconds = timeConvert.seconds < 10 ? `0${timeConvert.seconds}` : timeConvert.seconds;
		  
		  let time = `${minutes}:${seconds}`;
		  
		  const embed = new Discord.MessageEmbed()
		  .setAuthor("Spotify Track Information", image)
		  .setColor(colors.main)
		  .setThumbnail(image)
		  .addField("Name", name, true) 
		  .addField("Album", album, true)
		  .addField("Artist", artist, true)
		  .addField("Duration", time, false)
		  .addField("Listen now on Spotify", `[\`${artist} - ${name}\`](${url})`, false)
		  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		  message.channel.send(embed)
		}  
	}
}
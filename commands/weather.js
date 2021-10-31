const weather = require('weather-js');

const Discord = require('discord.js');
const colors = require('../colors.json')
module.exports = {
    name: "weather",
    description: "Checks a weather forecast",

    async run (client, message, args){

    weather.find({search: args.join(" "), degreeType: 'C'}, function (error, result){

        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('<a:no:784463793366761532> **Please insert the city**')

        if(result === undefined || result.length === 0) return message.channel.send('<a:no:784463793366761532> **Unknown city. Please try again**');

        let current = result[0].current;
        let location = result[0].location;

		const embed = new Discord.MessageEmbed()
        .setAuthor(current.observationpoint)
        .setDescription(`${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .setTimestamp()
        .setColor(colors.main)

        embed.addField("Latitude", location.lat, true)
        .addField("Longitude", location.long, true)
        .addField("Feels Like", `${current.feelslike}° Degrees`, true)
        .addField("Degree Type", location.degreetype, true)
        .addField("Winds", current.winddisplay, true)
        .addField("Humidity", `${current.humidity}%`, true)
        .addField("Timezone", `GMT ${location.timezone}`, true)
        .addField("Temperature", `${current.temperature}° Degrees`, true)
        .addField("Observation Time", current.observationtime, true)
        .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(embed)
        })        
    }
}
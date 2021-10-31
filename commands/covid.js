const fetch = require('node-fetch');

const Discord = require('discord.js');
const colors = require('../colors.json')

module.exports = {
    name: "covid",
    description: "Track a country or worldwide COVID-19 cases",

    async run (client, message, args){

        let countries = args.join(" ");



        const noArgs = new Discord.MessageEmbed()
        .setTitle('Missing arguments')
        .setColor(colors.main)
        .setDescription('example: <prefix>covid all || <prefix>covid Iran)')
        .setTimestamp()

        if(!args[0]) return message.channel.send(noArgs);

        if(args[0] === "all"){
            fetch(`https://covid19.mathdro.id/api`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`Worldwide COVID-19 Stats`)
                .setColor(colors.main)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setThumbnail('https://cdn.discordapp.com/attachments/716399605964603463/758016270477033552/1020px-SARS-CoV-2_without_background.png')
                message.channel.send(embed)
            })
        } else {
            fetch(`https://covid19.mathdro.id/api/countries/${countries}`)
            .then(response => response.json())
            .then(data => {
                let confirmed = data.confirmed.value.toLocaleString()
                let recovered = data.recovered.value.toLocaleString()
                let deaths = data.deaths.value.toLocaleString()

                const embed = new Discord.MessageEmbed()
                .setTitle(`COVID-19 Stats **${countries}**`)
                .setColor(colors.main)
                .addField('Confirmed Cases', confirmed)
                .addField('Recovered', recovered)
                .addField('Deaths', deaths)
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setThumbnail('https://cdn.discordapp.com/attachments/716399605964603463/758016270477033552/1020px-SARS-CoV-2_without_background.png')
                message.channel.send(embed)
            }).catch(e => {
                return message.channel.send('The country is invalid')
            })
        }
    }
}
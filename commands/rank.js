const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const cooldown = new Set();

const Canvacord = require('canvacord')
const canvas = require('canvacord')

module.exports = {
    name: "rank",

    async run (client, message, args) {
		let user = message.mentions.users.first() || message.author

        var reqXP = 93750;

		let rankMsg = db.fetch(`messages_${message.guild.id}_${user.id}`)
		let lbMessage = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data)
		
		let levelfetch = db.fetch(`level_${message.guild.id}_${user.id}`)

		let place = lbMessage.findIndex(p => p.ID === `messages_${message.guild.id}_${user.id}`)

        let defualt_bg = 'https://cdn.discordapp.com/attachments/468141324906921984/868804213520601108/Untitled.png'

        let bg = db.get(`rankbg_${user.id}`)
        if(bg == null) bg = defualt_bg
		  
        const rankCard = new canvas.Rank()
        .setAvatar(user.displayAvatarURL({
            format: 'png'
        }))
        .setCurrentXP(rankMsg || 0)
        .setRequiredXP(reqXP)
        .setStatus(user.presence.status)
        .setProgressBar("#5D40F2", "COLOR")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", `${bg}`)
        .setProgressBarTrack("#000")
        .setLevel(levelfetch || 0, 'Level: ', true)
        .setRank(place + 1, 'Rank: ', true)
 
    rankCard.build()
        .then(data => {
            const attachment = new Discord.MessageAttachment(data, "RankCard.png");
            message.channel.send(attachment);
        });
		
	}
}
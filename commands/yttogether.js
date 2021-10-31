const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const axios = require('axios');
const fetch = require('node-fetch')


module.exports = {
    name: "yttogether",

    async run (client, message, args) {
		let channel = message.member.voice.channel;
    if(!channel) return message.channel.send("<a:no:784463793366761532> **You have to be in a voice channel**")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${client.token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("<a:no:784463793366761532> **I cant start a youtube together**")
        const e = new Discord.MessageEmbed()
		.setTitle('Youtube Together Activity')
        .setDescription(`**[Click Here](https://discord.com/invite/${invite.code})**`)
		.setColor(colors.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(e)
	})
}
}
const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const Canvas = require('canvas')


module.exports = {
    name: "love",

    async run (client, message, args) {
		const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext("2d")

    const target = message.mentions.users.first()
    if(!target) return message.channel.send("<a:no:784463793366761532> **Please mention someone**")
    if(target.id == message.author.id) return message.channel.send("<a:no:784463793366761532> **Please mention someone else**")

    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/468141324906921984/868804213520601108/Untitled.png")
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

    const avatar = await Canvas.loadImage(message.author.displayAvatarURL( { format: 'png' } ))
    ctx.drawImage(avatar, 100, 25, 200, 200)

    const TargetAvatar = await Canvas.loadImage(target.displayAvatarURL( { format: "png" } ))
    ctx.drawImage(TargetAvatar, 400, 25, 200, 200)


    const heart = await Canvas.loadImage('https://cdn.discordapp.com/attachments/468141324906921984/868806194062577724/heart.png')
    const broken = await Canvas.loadImage('https://cdn.discordapp.com/attachments/468141324906921984/868806209401135145/unknown.png')
    const random = Math.floor(Math.random() * 99) + 1

    if(random >= 50) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'love.png')
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .attachFiles(attachment)
        .setImage(`attachment://love.png`)
        .setColor(colors.main)
        return message.channel.send(embed)

    } else {
        ctx.drawImage(broken, 275, 60, 150, 150)
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'broken.png')
        const embed = new Discord.MessageEmbed()
        .setDescription(`**${message.author.username} loves ${target.username} this much : ${random}%**`)
        .attachFiles(attachment)
        .setImage(`attachment://broken.png`)
        .setColor(colors.main)
        return message.channel.send(embed)
	}
}
}
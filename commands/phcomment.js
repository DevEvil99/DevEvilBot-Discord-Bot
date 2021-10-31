const color = require('../colors.json') 
const canvacord = require("canvacord");
const Discord = require("discord.js")
const fetch = require("node-fetch");
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');

module.exports = {
    name: "phcomment",

    async run (client, message, args) {
		let user = await message.mentions.members.first()
        let text = args.join(" ");

        if(user){
            text = args.slice(1).join(" ");
        } else {
            user = message.author;
        }

        if(!text){
            return message.channel.send("<a:no:784463793366761532> **Enter a text**");
        }

        try {
            let res = await fetch(encodeURI(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${user.username}&image=${user.displayAvatarURL({ format: "png", size: 512 })}&text=${text}`));
            let json = await res.json();
            let attachment = new Discord.MessageAttachment(json.message, "phcomment.png");
            message.channel.send(attachment);
            message.delete({ timeout: 5000 });
        } catch(e){
            message.edit("**Error, Try Again**");
        }
	}
}
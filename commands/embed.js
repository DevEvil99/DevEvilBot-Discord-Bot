const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
const pagination = require('discord.js-pagination');
const fetch = require("node-fetch")
const malScraper = require('mal-scraper');

module.exports = {
    name: "embed",

    async run (client, message, args) {
		try {
            let prefix = await db.get(`prefix_${message.guild.id}`);
            if(prefix === null) prefix = default_prefix;


            const filter = msg => msg.author.id == message.author.id;
            const options = {
                max: 1
            };

            const embedch = message.mentions.channels.first();
            if(!embedch) {
                const h = new Discord.MessageEmbed()
                .setTitle('Channel')
                .setDescription(`**What channel do you want your embed to be in ?** \n **Usage : \`${prefix}embed <channel>\`**`)
                .setColor(colors.main)
                return message.channel.send(h)
            }
            
            //===============================================================================================
            // Getting Started
            const embed = new Discord.MessageEmbed();

            const r = new Discord.MessageEmbed()
            .setTitle('Getting Started')
            .setDescription('**You can skip the questions by typing ``skip`` and you can cancel the setup by typing ``cancel``**\n **See example and tutorial by [Clicking Here](https://docs.devevilbot.xyz/tutorials/embed)**')
            .setColor(colors.main)
            message.channel.send(r)
            
    
            //===============================================================================================
            // Getting Title
            const f = new Discord.MessageEmbed()
            .setTitle('Title')
            .setDescription('**What title do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(f);
            let title = await message.channel.awaitMessages(filter, options);
            if (title.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled')
            if (title.first().content !== 'skip' && title.first().content !== 'cancel') embed.setTitle(title.first().content);

            //===============================================================================================
            // Getting Author Field
            const v = new Discord.MessageEmbed()
            .setTitle('Author Field')
            .setDescription('**What author field do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(v);
            let Author = await message.channel.awaitMessages(filter, options);
            if (Author.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled')
            if (Author.first().content !== 'skip' && Author.first().content !== 'cancel') embed.setAuthor(Author.first().content);
    
            //===============================================================================================
            // Getting Description
            const d = new Discord.MessageEmbed()
            .setTitle('Description')
            .setDescription('**What description do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(d);
            let Description = await message.channel.awaitMessages(filter, options);
            if (Description.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled')
            if (Description.first().content !== 'skip' && Description.first().content !== 'cancel') embed.setDescription(Description.first().content);
    
            //===============================================================================================
            // Getting URL

            //===============================================================================================
            // Getting Thumbnail
            const s = new Discord.MessageEmbed()
            .setTitle('Thumbnail')
            .setDescription('**What thumbnail do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(s);
            let Thumbnail = await message.channel.awaitMessages(filter, options);
            if (Thumbnail.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled ')
            if (Thumbnail.first().content !== 'skip' && Thumbnail.first().content !== 'cancel') embed.setThumbnail(Thumbnail.first().content); 

            //===============================================================================================
            // Getting Image
            const a = new Discord.MessageEmbed()
            .setTitle('Image')
            .setDescription('**What image do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(a);
            let Image = await message.channel.awaitMessages(filter, options);
            if (Image.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled ')
            if (Image.first().content !== 'skip' && Image.first().content !== 'cancel') embed.setImage(Image.first().content); 
    
            //===============================================================================================
            // Getting Color
            const w = new Discord.MessageEmbed()
            .setTitle('Color')
            .setDescription('**What color do you want for the embed ? Type the color name or hex code**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(w);
            let Color = await message.channel.awaitMessages(filter, options);
            if (Color.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled')
            if (Color.first().content !== 'skip' && Color.first().content !== 'cancel') embed.setColor(Color.first().content.toUpperCase() || "2f3136")

            //===============================================================================================
            // Getting Footer
            const q = new Discord.MessageEmbed()
            .setTitle('Footer')
            .setDescription('**What footer do you want for the embed ?**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(q);
            let Footer = await message.channel.awaitMessages(filter, options);
            if (Footer.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled ')
            if (Footer.first().content !== 'skip' && Footer.first().content !== 'cancel') embed.setFooter(Footer.first().content); 
    
            //===============================================================================================
            // Getting TimeStamp
            const e = new Discord.MessageEmbed()
            .setTitle('TimeStamp')
            .setDescription('**Do you want your embed to have any TimeStamp ? __Reply__ `yes` or `no`**\n **Type ``skip`` to skip this section and type ``cancel`` to cancel the setup**')
            .setColor(colors.main)
            message.channel.send(e);
            let TimeStamp = await message.channel.awaitMessages(filter, options);
            if (TimeStamp.first().content == 'cancel') return message.channel.send('<a:no:784463793366761532> **Embed Cancelled**')
            if (TimeStamp.first().content !== 'yes') embed.setTimestamp();
    
            embedch.send(embed)
        } catch (error) {
            console.error(error);
        }
	}
}
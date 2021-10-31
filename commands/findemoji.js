const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db');
const { token, default_prefix } = require('../config.json');
const pagination = require('discord.js-pagination');
const fetch = require("node-fetch")

module.exports = {
    name: "find-emoji",

    async run (client, message, args) {
		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;

		if (!message.member.hasPermission("MANAGE_EMOJIS")) {
            return message.channel.send(`<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_EMOJIS**`)
        }
        if(!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions**')
let emojis = await fetch("https://emoji.gg/api/").then(res => res.json());
     const q = args.join(" ").toLowerCase().trim().split(" ").join("_");
     let matches = emojis.filter(s => s.title == q || s.title.includes(q));
     
     let noResult = new Discord.MessageEmbed()
        .setDescription(`<a:no:784463793366761532> **No Results found for ${args.join(" ")}**`)
        .setColor(colors.main)
     
     if (!matches.length) return message.channel.send(noResult)
     let page = 0;
     let embed = new Discord.MessageEmbed()
     .setTitle(matches[page].title)
     .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
     .setColor(colors.main)
     .setImage(matches[page].image)
     .setFooter(`Emoji ${page + 1}/${matches.length}`);
     const msg = await message.channel.send(embed);
     emojis = ["◀️", "▶️", "✅", "❌"];
     msg.react(emojis[0]);
     msg.react(emojis[1]);
     msg.react(emojis[2]);
     msg.react(emojis[3]);
     const filter = (r, u) => emojis.includes(r.emoji.name.trim()) && u.id == message.author.id;
     let doing = true;
     while (doing) {
     let reaction;
     try { reaction = await msg.awaitReactions(filter, { max: 1, time: 120000, errors: ["time"] })}
     catch { message.channel.send(message.author.toString() + "**, You took too long**"); msg.reactions.removeAll() ; doing = false; return; };
     reaction = reaction.first();
     const rmsg = reaction.message;
     if (reaction.emoji.name == emojis[0]) {
     page--;
     if (!matches[page]) {
     page++;
     rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
     } else {
     let newembed = new Discord.MessageEmbed()
     .setTitle(matches[page].title)
     .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
     .setColor(colors.main)
     .setImage(matches[page].image)
     .setFooter(`Emoji ${page + 1}/${matches.length}`);
     msg.edit(newembed);
     rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
     }
     } else if (reaction.emoji.name == emojis[1]) {
     page++;
     if (!matches[page]) {
     page--;
     rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
     } else {
     let newembed = new Discord.MessageEmbed()
     .setTitle(matches[page].title)
     .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
     .setColor(colors.main)
     .setImage(matches[page].image)
     .setFooter(`Emoji ${page + 1}/${matches.length}`);
     msg.edit(newembed);
rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
     }
     } else if (reaction.emoji.name == emojis[2]) {
      const res = matches[page];
      let created;
      message.channel.startTyping();
      try { 
        created = await message.guild.emojis.create(res.image, res.title);
        message.channel.stopTyping();
       } catch {
        message.channel.stopTyping();
        message.channel.send(`<a:no:784463793366761532> **Unable to add ${res.title}**`);
        rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
        doing = false;
        break;
       }
       message.channel.send(`<a:yes:784463701305458708> **Successfully added ${created}**`);
      rmsg.reactions.resolve(reaction.emoji.name).users.remove(message.author.id).catch(err => {})
       doing = false;
       break;
 
     } else if (reaction.emoji.name == emojis[3]) {
       message.channel.send("<a:no:784463793366761532> **Cancelled command**");
       msg.reactions.removeAll();
       return;
     }};
	}
}
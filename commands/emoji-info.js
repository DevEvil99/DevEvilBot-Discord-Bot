const { Util, MessageEmbed } = require("discord.js");
const color = require('../colors.json')
module.exports = {
  name: "emoji-info",
  run: async (bot, message, args) => {
    if (!message.guild)
      return message.channel.send("This command only works on servers.");
    if (!args[0]) return message.channel.send("Usage: emoji <emoji>");
    let emoji =
      bot.emojis.cache.get(args[0]) ||
      bot.emojis.cache.find((e) => e.name === args[0]);
    if (!emoji) {
      const e = Util.parseEmoji(args[0]);
      if (!e.id) emoji = bot.emojis.cache.find((a) => a.name === e.name);
      else emoji = bot.emojis.cache.get(e.id);
      if (!emoji) return message.channel.send("Invalid emoji!");
    }
 
    let auth = emoji.author;
	if(!message.guild.me.hasPermission("MANAGE_EMOJIS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_EMOJIS**')
    const embed = new MessageEmbed()
      .setTitle(emoji.name + "Info")
      .setThumbnail(emoji.url)
      .setColor(color.main)
      .addField("ID", `**${emoji.id}**`, true)
      .addField("URL", `**[Click here](${emoji.url})**`, true)
      .addField("Code", "`" + emoji.toString() + "`", true)
      .addField("Animated ?", emoji.animated ? "**Yes**" : "**No**", true)
      .addField("Available", emoji.available ? "**Yes**" : "**No**", true)
	  .addField("Upload at", `**${emoji.createdAt}**`, true)
	  .setFooter(`${bot.user.username}`, bot.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    if (emoji.guild.id === message.guild.id) {
      embed
        .addField(
          "Roles that can use the emoji",
          emoji.roles.cache.first()
            ? emoji.roles.cache.map((e) => `${e}`).join(", ")
            : "@everyone"
        , true);
    }
    await message.channel.send(embed);
  },
};
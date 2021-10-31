const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const moment = require("moment");
const fetch = require("node-fetch")


module.exports = {
    name: "github",

    async run (client, message, args) {
        try {

            if (!args[0]) return message.channel.send(`<a:no:784463793366761532> **Please enter an account name**`)
              
            fetch(`https://api.github.com/users/${args.join('-')}`)
              .then(res => res.json()).then(body => {
                if(body.message) return message.channel.send(`<a:no:784463793366761532> **User not found, Please enter a valid username**`);
              let { login, avatar_url, name, id, html_url, public_repos, followers, following, location, created_at, bio } = body;
          
                      const embed = new Discord.MessageEmbed()
                      .setAuthor(`${login} Information`, avatar_url)
                      .setColor(colors.main)
                      .setThumbnail(`${avatar_url}`)
                      .addField(`Username`, `**${login}**`, true)
                      .addField(`ID`, `**${id}**`, true)
					  .addField(`Public Repositories`, `**${public_repos || "None"}**`, true)
					  .addField(`Followers`, `**${followers}**`, true)
                      .addField(`Following`, `**${following}**`, true)
                      .addField(`Bio`, `**${bio || "No Bio"}**`)
                      .addField(`Location`, `**${location || "No Location"}**`, true)
                      .addField(`Account Created`, `**${moment.utc(created_at).format("dddd, MMMM, Do YYYY")}**`, true)
                      .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
          
                      message.channel.send(embed)
          
              })
          
                  } catch (error) {
                      console.log(`[Commands] [github] Getting Error In github Command :\n`, error);
                      return message.channel.send(`<a:no:784463793366761532> **Something Went Wrong Try Again Later**`)
                  }
            
		
	}
}
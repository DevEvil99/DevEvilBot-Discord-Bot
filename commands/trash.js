const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
 name: "trash",

 run: async (client, message, args) => {
   
let Discord = require("discord.js");
const noodles_api = require('noodles-wrapper')

let user = message.mentions.users.first() || message.author
let result = user.displayAvatarURL()

let Image = await  noodles_api.trash(result)

const attachment = new Discord.MessageAttachment(Image, "trash.png");
message.channel.send(attachment);
 }
};
const math = require('mathjs');
const Discord = require('discord.js');
const colors = require('../colors.json')
module.exports = {
    name: "calc",


    async run (client, message, args){

        if(!args[0]) return message.channel.send('<a:no:784463793366761532> **Please enter a question**');

        let resp;

        try {
            resp = math.evaluate(args.join(" "))
        } catch (e) {
            return message.channel.send('<a:no:784463793366761532> **Please provide a __**valid**__ question**')
        }

        const embed = new Discord.MessageEmbed()
        .setColor(colors.main)
        .setTitle('Calculator')
        .addField('Question', `\`\`\`css\n${args.join(' ')}\`\`\``)
        .addField('Answer', `\`\`\`css\n${resp}\`\`\``)

        message.channel.send(embed);

    }
}
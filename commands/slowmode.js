const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const colors = require('../colors.json')
module.exports = {
    name: 'slowmode',
    run: async (client, message, args) => {

        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<a:no:784463793366761532> **You can not use this command | Permission: MANAGE_CHANNELS**')
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('<a:no:784463793366761532> **I do not have the correct permissions | Permission : MANAGE_CHANNELS**')
        
        if (!args[0]) return message.channel.send('<a:no:784463793366761532> **You did not specify a time**')

        const currentCooldown = message.channel.rateLimitPerUser;

        const reason = args[1] ? args.slice(1).join(' ') : 'no reason';

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        if (args[0] === 'off') {

            if (currentCooldown === 0) return message.channel.send('**Channel cooldown is already off**')

            embed.setTitle('Slowmode Disabled')
                .setColor(0x643DA7)
            return message.channel.setRateLimitPerUser(0, reason)

        }

        const time = ms(args[0]) / 1000;

        if (isNaN(time)) return message.channel.send('<a:no:784463793366761532> **Not a valid time, please try again**')

        if (time >= 21600) return message.channel.send('<a:no:784463793366761532> **That slowmode limit is too high, please enter anything lower than 6 hours**')

        if (currentCooldown === time) return message.channel.send(`**Slowmode is already set to** ${args[0]}`);

        embed.setTitle('Slowmode Enabled')
            .addField('Slowmode: ', args[0])
            .addField('Reason: ', reason)
            .setColor(colors.main);

        message.channel.setRateLimitPerUser(time, reason).then(m => m.send(embed));

    }
}
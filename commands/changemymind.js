const { MessageAttachment } = require('discord.js')

const Canvacord = require('canvacord')

module.exports = {

    name: "changemymind",

    async run (bot, message, args) {

        let text = args.join(' ')

        if(!text) return message.channel.send('<a:no:863733318809812992> **Please provide a text**')

        let img = await Canvacord.Canvas.changemymind(text);

        let attachment = new MessageAttachment(img, 'changemymind.png');

        message.channel.send(attachment)

    }

}
const colors = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const axios = require('axios');


module.exports = {
    name: "decode",

    async run (client, message, args) {
		const url = `http://some-random-api.ml/binary?decode=${args}`;

        let response, data;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.channel.send(`**<a:no:784463793366761532> Please type binary text for me to decoded**`)
        }

        const embed = new MessageEmbed()
            .setTitle('Decode Binary')
            .setColor(colors.main)
            .setDescription(`**${data.text}**`)

        await message.channel.send(embed)
	}
}
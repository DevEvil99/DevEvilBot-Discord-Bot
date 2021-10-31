const color = require('../colors.json')
const Discord = require('discord.js');
const db = require('quick.db')
const { token, default_prefix } = require('../config.json');
const { Wikipedia } = require("ultrax")

module.exports = {
    name: "wiki",

    async run (client, message, args) {
		let query = args.join(" ")
    if(!query) return message.channel.send("<a:no:784463793366761532> **Please include a query**")

    // using ultrax package
    
    const res = new Wikipedia({ 
        message:  message, 
        color:  color.main, 
        query:  query  
    })

    res.fetch()
	}
}
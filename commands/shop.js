const { MessageEmbed } = require('discord.js');
const { default_prefix } = require('../config.json');
const db = require('quick.db');
const colors = require('../colors.json')

module.exports = {
   
        name: "shop",
    run: async (client, message, args) => {
        let target = db.get(`userb_${message.author.id}`);

		const ban_error = new MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(colors.main)

		if(target) {
			return message.channel.send(ban_error)
		}

		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
 

     let embed = new MessageEmbed()
	    .setTitle('Shop')
        .addField('Items', '**Shovel : 25,000 <:DevEvilBot_Coin:867679208855437333>\nFishing Pole : 25,000 <:DevEvilBot_Coin:867679208855437333>\nHeadphone : 50,000 <:DevEvilBot_Coin:867679208855437333>\nCell Phone : 120,000 <:DevEvilBot_Coin:867679208855437333>\nLaptop : 200,000 <:DevEvilBot_Coin:867679208855437333>\nDB Coin : 1,000,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Pets', '**Turtle : 1,700 <:DevEvilBot_Coin:867679208855437333>\nBird : 2,000 <:DevEvilBot_Coin:867679208855437333>\nCat : 5,000 <:DevEvilBot_Coin:867679208855437333>\nDog : 5,500 <:DevEvilBot_Coin:867679208855437333>\nSnake : 10,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Guns', '**Pistol : 350,000 <:DevEvilBot_Coin:867679208855437333>\nRifle : 650,00 <:DevEvilBot_Coin:867679208855437333>\nSniper : 700,000 <:DevEvilBot_Coin:867679208855437333>\nShotgun : 700,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Abilities', '**Ghost : 1,500,000 <:DevEvilBot_Coin:867679208855437333>\nNinja : 2,500,000 <:DevEvilBot_Coin:867679208855437333>\nMind Reading : 5,000,000 <:DevEvilBot_Coin:867679208855437333>\nInvisible : 15,000,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Badges', '**Copper : 200,000 <:DevEvilBot_Coin:867679208855437333>\nBronze : 1,000,000 <:DevEvilBot_Coin:867679208855437333>\nSilver : 2,000,000 <:DevEvilBot_Coin:867679208855437333>\nGold : 3,000,000 <:DevEvilBot_Coin:867679208855437333>\nDiamond : 5,000,000 <:DevEvilBot_Coin:867679208855437333>\nImmortal : 10,000,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Cars', '**Tesla : 3,000,000 <:DevEvilBot_Coin:867679208855437333>\nFerrari : 5,000,000 <:DevEvilBot_Coin:867679208855437333>\nBugatti : 8,000,000 <:DevEvilBot_Coin:867679208855437333>\nLamborghini : 12,000,000 <:DevEvilBot_Coin:867679208855437333>\nMercedes-Benz : 15,000,000 <:DevEvilBot_Coin:867679208855437333>\nRolls-Royce : 20,000,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .addField('Houses', '**Apartment : 10,000,000 <:DevEvilBot_Coin:867679208855437333>\nVilla : 15,000,000 <:DevEvilBot_Coin:867679208855437333>\nOcean View : 20,000,000 <:DevEvilBot_Coin:867679208855437333>\nMansion : 30,000,000 <:DevEvilBot_Coin:867679208855437333>\nCastle : 50,000,000 <:DevEvilBot_Coin:867679208855437333>**', true)
        .setColor(colors.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
        message.channel.send(embed)
    }
}


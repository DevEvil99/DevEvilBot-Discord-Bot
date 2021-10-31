const Discord = require('discord.js');
const colors = require('../colors.json')
const db = require('quick.db')

module.exports = {
    name: "profile",

    async run (client, message, args) {
		let user = message.mentions.users.first() || message.author


		let shovel = db.fetch(`shovel_${user.id}`);
		let fishing_pole = db.fetch(`fp_${user.id}`)
		let headphone = db.fetch(`hp_${user.id}`) 
		let cell_phone = db.fetch(`cp_${user.id}`)
		let laptop = db.fetch(`lp_${user.id}`)
		let pistol = db.fetch(`pt_${user.id}`)
		let rifle = db.fetch(`rf_${user.id}`)
		let sniper = db.fetch(`sp_${user.id}`)
		let shotgun = db.fetch(`sg_${user.id}`)
		let ghost = db.fetch(`gh_${user.id}`)
		let ninja = db.fetch(`nj_${user.id}`)
		let mind = db.fetch(`mr_${user.id}`)
		let invis = db.fetch(`invb_${user.id}`)
		let copper = db.fetch(`cpr_${user.id}`)
		let bronze = db.fetch(`brz_${user.id}`)
		let silver = db.fetch(`silv_${user.id}`)
		let gold = db.fetch(`gold_${user.id}`)
		let diamond = db.fetch(`dd_${user.id}`)
		let immortal = db.fetch(`imt_${user.id}`)
		let turtle = db.fetch(`tt_${user.id}`)
		let bird = db.fetch(`bd_${user.id}`)
		let cat = db.fetch(`ct_${user.id}`)
		let dog = db.fetch(`dg_${user.id}`)
		let snake = db.fetch(`sn_${user.id}`)
		let tesla = db.fetch(`tes_${user.id}`)
		let ferrari = db.fetch(`fr_${user.id}`)
		let bugatti = db.fetch(`bgt_${user.id}`)
		let lambo = db.fetch(`lam_${user.id}`)
		let benz = db.fetch(`bez_${user.id}`)
		let rr = db.fetch(`rrc_${user.id}`)
		let apartment = db.fetch(`apr_${user.id}`)
		let villa = db.fetch(`vill_${user.id}`)
		let oc = db.fetch(`oc_${user.id}`)
		let mansion = db.fetch(`mans_${user.id}`)
		let castle = db.fetch(`cast_${user.id}`)

		let levelfetch = db.fetch(`level_${message.guild.id}_${user.id}`)
		let lbMessage = db.all().filter(data => data.ID.startsWith(`messages_${message.guild.id}`)).sort((a, b) => b.data - a.data)
		let place = lbMessage.findIndex(p => p.ID === `messages_${message.guild.id}_${user.id}`)
		let rankMsg = db.fetch(`messages_${message.guild.id}_${user.id}`)
		let bal = await db.fetch(`money_${user.id}`)

		if (shovel === null) shovel = 0;
		if (fishing_pole === null) fishing_pole = 0;
		if (headphone === null) headphone = 0
		if (cell_phone === null) cell_phone = 0;
		if (laptop === null) laptop = 0;
		if (pistol === null) pistol = 0;
		if (rifle === null) rifle = 0;
		if (sniper === null) sniper = 0
		if (shotgun === null) shotgun = 0;
		if (turtle === null) turtle = 0;
		if (bird === null) bird = 0;
		if (cat === null) cat = 0
		if (dog === null) dog = 0;
		if (snake === null) snake = 0;
		if (tesla === null) tesla = 0;
		if (ferrari === null) ferrari = 0;
		if (bugatti === null) bugatti = 0
		if (lambo === null) lambo = 0;
		if (benz === null) benz = 0;
		if (rr === null) rr = 0;
		if (apartment === null) apartment = 0;
		if (villa === null) villa = 0
		if (oc === null) oc = 0;
		if (mansion === null) mansion = 0;
		if (castle === null) castle = 0;
		if (ghost === null) ghost = `<a:no:784463793366761532>`;
		if (ninja === null) ninja = `<a:no:784463793366761532>`;
		if (mind === null) mind = `<a:no:784463793366761532>`;
		if (invis === null) invis = `<a:no:784463793366761532>`;
		if (copper === null) copper = `<a:no:784463793366761532>`;
		if (bronze === null) bronze = `<a:no:784463793366761532>`;
		if (silver === null) silver = `<a:no:784463793366761532>`;
		if (gold === null) gold = `<a:no:784463793366761532>`;
		if (diamond === null) diamond = `<a:no:784463793366761532>`;
		if (immortal === null) immortal = `<a:no:784463793366761532>`;
		if (bal === null) bal = 0;

		const embed = new Discord.MessageEmbed()
		.setTitle(`${user.username}\'s Profile`)
		.addField('Level', `**${levelfetch || 0}**`, true)
		.addField('Rank', `**${place + 1}**`, true)
		.addField('Current XP', `**${rankMsg}**`, true)
		.addField('Money', `**${(bal).toLocaleString()} <:DevEvilBot_Coin:867679208855437333>**`, true)
		.addField('Items', `**Shovel : ${shovel}\nFishing Pole : ${fishing_pole}\nHeadphone : ${headphone}\nCell Phone : ${cell_phone}\nLaptop : ${laptop}**`, true)
		.addField('Pets', `**Turtle : ${turtle}\nBird : ${bird}\nCat : ${cat}\nDog : ${dog}\nSnake : ${snake}**`, true)
		.addField('Guns', `**Pistol : ${pistol}\nRifle : ${rifle}\nSniper : ${sniper}\nShotgun : ${shotgun}**`, true)
		.addField('Abilities', `**Ghost : ${ghost}\nNinja : ${ninja}\nMind Reading : ${mind}\nInvisible : ${invis}**`, true)
		.addField('Badge', `**Copper : ${copper} <:copper:885194928513253458>\nBronze : ${bronze} <:bronze:885202772352454707>\nSilver : ${silver} <:silver:885194864294252574>\nGold : ${gold} <:gold:885194863354724432>\nDiamond : ${diamond} <:diamond:885194863400857600>\nImmortal : ${immortal} <:immortal:885194863342133259>**`, true)
		.addField('Cars', `**Tesla : ${tesla}\nFerrari : ${ferrari}\nBugatti : ${bugatti}\nLamborghini : ${lambo}\nMercedes-Benz : ${benz}\nRolls-Royce : ${rr}**`, true)
		.addField('Houses', `**Apartment : ${apartment}\nVilla : ${villa}\nOcean View : ${oc}\nMansion : ${mansion}\nCastle : ${castle}**`, true)
		.setThumbnail(`${user.displayAvatarURL()}`)
		.setColor(colors.main)
		.setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
		message.channel.send(embed)

	} 
}
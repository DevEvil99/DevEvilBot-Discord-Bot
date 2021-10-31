const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { default_prefix } = require('../config.json');
const colors = require('../colors.json')

module.exports = {
    
        name: "buy",
    run: async (bot, message, args) => {
        let target = db.get(`userb_${message.author.id}`);

		const ban_error = new MessageEmbed()
		.setDescription('<a:no:863733318809812992> **You are banned from using this section | Reason : Abuse\n[Contact](https://devevilbot.xyz/contact) with the [owner of the bot](https://discord.com/users/468132563714703390) to appeal a permanent ban**')
		.setColor(colors.main)

		if(target) {
			return message.reply(ban_error)
		}

        let user = message.author;

		let prefix = await db.get(`prefix_${message.guild.id}`);
		if(prefix === null) prefix = default_prefix;
      
        let author = db.fetch(`money_${user.id}`)

        let Embed = new MessageEmbed()
            .setColor(colors.main)
            .setDescription(`**You need 25,000 <:DevEvilBot_Coin:867679208855437333> to purchase Shovel**`);


        if (args.join(' ').toLocaleLowerCase() == 'shovel') {
            if (author < 25000) return message.channel.send(Embed)

            await db.fetch(`shovel_${user.id}`);
            db.add(`shovel_${user.id}`, 1)

            let Embed2 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Shovel For 25,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886183063757918258/ae235.jpg');

            db.subtract(`money_${user.id}`, 25000)
            message.channel.send(Embed2)
        } else if (args.join(' ').toLocaleLowerCase() == 'fishing pole') {
            let Embed3 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 25,000 <:DevEvilBot_Coin:867679208855437333> to purchase Fishing Pole**`);

            if (author < 25000) return message.channel.send(Embed3)

            await db.fetch(`fp_${user.id}`)
            db.add(`fp_${user.id}`, 1)

            let Embed4 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Fishing Pole For 25000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886183143353229333/060420-cottage-dock-fishing-fish-sportfishing-adobestock_242597321.jpeg')

            db.subtract(`money_${user.id}`, 25000)
            message.channel.send(Embed4)
        } else if (args.join(' ').toLocaleLowerCase() == 'headphone') {
            let Embed5 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 50,000 <:DevEvilBot_Coin:867679208855437333> to purchase Headphone**`);

            if (author < 50000) return message.channel.send(Embed5)

            await db.fetch(`hp_${user.id}`)
            db.add(`hp_${user.id}`, 1)

            let Embed6 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Headphone For 50,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886183074176581643/razer-nari-category-500x500.jpg')

            db.subtract(`money_${message.guild.id}_${user.id}`, 50000)
            message.channel.send(Embed6)
        } else if (args.join(' ').toLocaleLowerCase() == 'cell phone') {
            let Embed7 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 120,000 <:DevEvilBot_Coin:867679208855437333> to purchase Cell Phone**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886183105927479386/iphone12promax-2-scaled.jpg')

            if (author < 120000) return message.channel.send(Embed7)

            await db.fetch(`cp_${user.id}`)
            db.add(`cp_${user.id}`, 1)

            let Embed8 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Cell Phone For 120,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 120000)
            message.channel.send(Embed8)
			
		} else if (args.join(' ').toLocaleLowerCase() == 'laptop') {
            let Embed9 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 200,000 <:DevEvilBot_Coin:867679208855437333> to purchase laptop**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886183101905129552/Untitled-design-24.jpg')

            if (author < 200000) return message.channel.send(Embed9)

            await db.fetch(`lp_${user.id}`)
            db.set(`lp_${user.id}`, 1)

            let Embed10 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Laptop For 200,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 200000)
            message.channel.send(Embed10)
		} else if (args.join(' ').toLocaleLowerCase() == 'db coin') {
            let Embed11 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 1,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase DB Coin**`);

            if (author < 1000000) return message.channel.send(Embed11)

            await db.fetch(`dc_${user.id}`)

            let Embed12 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased DB Coin For 1,000,000 <:DevEvilBot_Coin:867679208855437333>\nSend amount of coins you need to DevEvil#8745 to be added to your account**`);

            db.subtract(`money_${user.id}`, 1000000)
            message.channel.send(Embed12)
		} else if (args.join(' ').toLocaleLowerCase() == 'pistol') {
            let Embed13 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 350,000 <:DevEvilBot_Coin:867679208855437333> to purchase Pistol**`);

            if (author < 350000) return message.channel.send(Embed13)

            await db.fetch(`pt_${user.id}`)
            db.set(`pt_${user.id}`, 1)

            let Embed14 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Pistol For 350,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180665031262208/Profile-Left-sm-1024x683-1024x683.jpg')

            db.subtract(`money_${user.id}`, 350000)
            message.channel.send(Embed14)
		} else if (args.join(' ').toLocaleLowerCase() == 'rifle') {
            let Embed15 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 650,000 <:DevEvilBot_Coin:867679208855437333> to purchase Rifle**`);

            if (author < 650000) return message.channel.send(Embed15)

            await db.fetch(`rf_${user.id}`)
            db.set(`rf_${user.id}`, 1)

            let Embed16 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Rifle For 650,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180674736902204/d269f9a104efc67c98c2014f323a41af_1.jpg')

            db.subtract(`money_${user.id}`, 650000)
            message.channel.send(Embed16)
		} else if (args.join(' ').toLocaleLowerCase() == 'sniper') {
            let Embed17 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 700,000 <:DevEvilBot_Coin:867679208855437333> to purchase Sniper**`);

            if (author < 700000) return message.channel.send(Embed17)

            await db.fetch(`sp_${user.id}`)
            db.add(`sp_${user.id}`, 1)

            let Embed18 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Sniper For 700,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180672455188480/b0de9445fed5ceca9fb337bddba2d73a.jpg')

            db.subtract(`money_${user.id}`, 700000)
            message.channel.send(Embed18)
        } 
        else if (args.join(' ').toLocaleLowerCase() == 'shotgun') {
            let Embed20 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 700,000 <:DevEvilBot_Coin:867679208855437333> to purchase Shotgun**`);

            if (author < 700000) return message.channel.send(Embed20)

            await db.fetch(`sg_${user.id}`)
            db.add(`sg_${user.id}`, 1)

            let Embed21 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Shotgun For 700,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180670089596958/engraved-shotguns-too-beautiful-to-shoot-20201007-1003-716x1024.jpg')

            db.subtract(`money_${user.id}`, 700000)
            message.channel.send(Embed21)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'ghost') {
            let Embed22 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 1,500,000 <:DevEvilBot_Coin:867679208855437333> to purchase Ghost**`);

            if (author < 1500000) return message.channel.send(Embed22)

            await db.fetch(`gh_${user.id}`)
            db.add(`gh_${user.id}`, 1)

            let Embed23 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Ghost For 1,500,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 1500000)
            message.channel.send(Embed23)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'ninja') {
            let Embed24 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 2,500,000 <:DevEvilBot_Coin:867679208855437333> to purchase Ninja**`);

            if (author < 2500000) return message.channel.send(Embed24)

            await db.fetch(`nj_${user.id}`)
            db.add(`nj_${user.id}`, 1)

            let Embed25 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Ninja For 2,500,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 2500000)
            message.channel.send(Embed25)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'mind reading') {
            let Embed26 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 5,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Mind Reading**`);

            if (author < 5000000) return message.channel.send(Embed26)

            await db.fetch(`mr_${user.id}`)
            db.add(`mr_${user.id}`, 1)

            let Embed27 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Mind Reading For 5,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 5000000)
            message.channel.send(Embed27)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'invisible') {
            let Embed28 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 15,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Invisible**`);

            if (author < 15000000) return message.channel.send(Embed28)

            await db.fetch(`invb_${user.id}`)
            db.add(`invb_${user.id}`, 1)

            let Embed29 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Invisible For 15,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 15000000)
            message.channel.send(Embed29)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'copper') {
            let Embed30 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 200,000 <:DevEvilBot_Coin:867679208855437333> to purchase Copper**`);

            if (author < 200000) return message.channel.send(Embed30)

            await db.fetch(`cpr_${user.id}`)
            db.add(`cpr_${user.id}`, 1)

            let Embed31 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Copper For 200,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 2000000)
            message.channel.send(Embed31)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'bronze') {
            let Embed32 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 1,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Bronze**`);

            if (author < 1000000) return message.channel.send(Embed32)

            await db.fetch(`brz_${user.id}`)
            db.add(`brz_${user.id}`, 1)

            let Embed33 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Bronze For 1,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 1000000)
            message.channel.send(Embed33)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'silver') {
            let Embed34 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 2,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Silver**`);

            if (author < 2000000) return message.channel.send(Embed34)

            await db.fetch(`silv_${user.id}`)
            db.add(`silv_${user.id}`, 1)

            let Embed35 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Silver For 2,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 2000000)
            message.channel.send(Embed35)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'gold') {
            let Embed36 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 3,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Gold**`);

            if (author < 3000000) return message.channel.send(Embed36)

            await db.fetch(`gold_${user.id}`)
            db.add(`gold_${user.id}`, 1)

            let Embed37 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Gold For 3,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 3000000)
            message.channel.send(Embed37)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'diamond') {
            let Embed38 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 5,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Diamond**`);

            if (author < 5000000) return message.channel.send(Embed38)

            await db.fetch(`dd_${user.id}`)
            db.add(`dd_${user.id}`, 1)

            let Embed39 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Diamond For 5,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 5000000)
            message.channel.send(Embed39)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'immortal') {
            let Embed40 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 10,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Immortal**`);

            if (author < 10000000) return message.channel.send(Embed40)

            await db.fetch(`imt_${user.id}`)
            db.add(`imt_${user.id}`, 1)

            let Embed41 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Immortal For 10,000,000 <:DevEvilBot_Coin:867679208855437333>**`);

            db.subtract(`money_${user.id}`, 10000000)
            message.channel.send(Embed41)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'turtle') {
            let Embed43 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 1,700 <:DevEvilBot_Coin:867679208855437333> to purchase Turtle**`);

            if (author < 1700) return message.channel.send(Embed43)

            await db.fetch(`tt_${user.id}`)
            db.add(`tt_${user.id}`, 1)

            let Embed44 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Turtle For 1,700 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886182212674936862/2326.jpg')

            db.subtract(`money_${user.id}`, 1700)
            message.channel.send(Embed44)
        } else if (args.join(' ').toLocaleLowerCase() == 'bird') {
            let Embed45 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 2,000 <:DevEvilBot_Coin:867679208855437333> to purchase Bird**`);

            if (author < 2000) return message.channel.send(Embed45)

            await db.fetch(`bd_${user.id}`)
            db.add(`bd_${user.id}`, 1)

            let Embed46 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Bird For 2,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886185398412402688/download.jpg')

            db.subtract(`money_${user.id}`, 2000)
            message.channel.send(Embed46)
        } else if (args.join(' ').toLocaleLowerCase() == 'cat') {
            let Embed47 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 5,000 <:DevEvilBot_Coin:867679208855437333> to purchase Cat**`);

            if (author < 5000) return message.channel.send(Embed47)

            await db.fetch(`ct_${user.id}`)
            db.add(`ct_${user.id}`, 1)

            let Embed48 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Cat For 5,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886182215724175400/AWQQ-1080x675.jpg')

            db.subtract(`money_${user.id}`, 5000)
            message.channel.send(Embed48)
        } else if (args.join(' ').toLocaleLowerCase() == 'dog') {
            let Embed49 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 5,500 <:DevEvilBot_Coin:867679208855437333> to purchase Dog**`);

            if (author < 5500) return message.channel.send(Embed49)

            await db.fetch(`dg_${user.id}`)
            db.add(`dg_${user.id}`, 1)

            let Embed50 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Dog For 5,500 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886182218794414100/0fe5f8fd54b6a7fdb5c98658ab752329.jpg')

            db.subtract(`money_${user.id}`, 5500)
            message.channel.send(Embed50)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'snake') {
            let Embed51 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 10,000 <:DevEvilBot_Coin:867679208855437333> to purchase Snake**`);

            if (author < 10000) return message.channel.send(Embed51)

            await db.fetch(`sn_${user.id}`)
            db.add(`sn_${user.id}`, 1)

            let Embed52 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Snake For 10,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886182213861908480/Snake-header.jpg')

            db.subtract(`money_${user.id}`, 10000)
            message.channel.send(Embed52)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'tesla') {
            let Embed53 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 3,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Tesla**`);

            if (author < 3000000) return message.channel.send(Embed53)

            await db.fetch(`tes_${user.id}`)
            db.add(`tes_${user.id}`, 1)

            let Embed54 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Tesla For 3,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180564648984626/2017-Tesla-Model-S-P100D-white-sedan-Max-Klamus-1001x565-1_1_0-1024x578.jpg')

            db.subtract(`money_${user.id}`, 3000000)
            message.channel.send(Embed54)
        }else if (args.join(' ').toLocaleLowerCase() == 'ferrari') {
            let Embed55 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 5,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Ferrari**`);

            if (author < 5000000) return message.channel.send(Embed55)

            await db.fetch(`fr_${user.id}`)
            db.add(`fr_${user.id}`, 1)

            let Embed56 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Ferrari For 5,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180636807802950/Novitec_Ferrari_SF90_Stradale.jpg')

            db.subtract(`money_${user.id}`, 5000000)
            message.channel.send(Embed56)
        }else if (args.join(' ').toLocaleLowerCase() == 'bugatti') {
            let Embed57 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 8,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Bugatti**`);

            if (author < 8000000) return message.channel.send(Embed57)

            await db.fetch(`bgt_${user.id}`)
            db.add(`bgt_${user.id}`, 1)

            let Embed58 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Bugatti For 8,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180652725194762/bugatti-la-voiture-noire_100794247.jpg')

            db.subtract(`money_${user.id}`, 8000000)
            message.channel.send(Embed58)
        }else if (args.join(' ').toLocaleLowerCase() == 'lamborghini') {
            let Embed59 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 12,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Lamborghini**`);

            if (author < 12000000) return message.channel.send(Embed59)

            await db.fetch(`lam_${user.id}`)
            db.add(`lam_${user.id}`, 1)

            let Embed60 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Lamborghini For 12,000,00 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180647150944266/carpixel.net-2014-lamborghini-veneno-roadster-97625-hd.jpg')

            db.subtract(`money_${user.id}`, 12000000)
            message.channel.send(Embed60)
        }else if (args.join(' ').toLocaleLowerCase() == 'mercedes-benz') {
            let Embed61 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 15,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Mercedes-Benz**`);

            if (author < 15000000) return message.channel.send(Embed61)

            await db.fetch(`bez_${user.id}`)
            db.add(`bez_${user.id}`, 1)

            let Embed62 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Mercedes-Benz For 15,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180713681018900/db138bea04216cc59bbb3413f29d1c42.jpg')

            db.subtract(`money_${user.id}`, 15000000)
            message.channel.send(Embed62)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'rolls-royce') {
            let Embed63 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 20,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Rolls-Royce**`);

            if (author < 20000000) return message.channel.send(Embed63)

            await db.fetch(`rrc_${user.id}`)
            db.add(`rrc_${user.id}`, 1)

            let Embed64 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Rolls-Royce For 20,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/804288026401964042/886180640825954304/rolls-royce-sweptail-at-villa-deste.jpg')

            db.subtract(`money_${user.id}`, 20000000)
            message.channel.send(Embed64)
        }
        else if (args.join(' ').toLocaleLowerCase() == 'apartment') {
            let Embed65 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 10,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Apartment**`);

            if (author < 10000000) return message.channel.send(Embed65)

            await db.fetch(`apr_${user.id}`)
            db.add(`apr_${user.id}`, 1)

            let Embed66 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Apartment For 10,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886687417912926238/apartment.jpg')

            db.subtract(`money_${user.id}`, 10000000)
            message.channel.send(Embed66)
        }else if (args.join(' ').toLocaleLowerCase() == 'villa') {
            let Embed67 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 15,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Villa**`);

            if (author < 15000000) return message.channel.send(Embed67)

            await db.fetch(`vill_${user.id}`)
            db.add(`vill_${user.id}`, 1)

            let Embed68 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Villa For 15,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886687433566060554/villa.jpg')

            db.subtract(`money_${user.id}`, 15000000)
            message.channel.send(Embed68)
        }else if (args.join(' ').toLocaleLowerCase() == 'ocean view') {
            let Embed69 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 20,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Ocean View**`);

            if (author < 20000000) return message.channel.send(Embed69)

            await db.fetch(`ov_${user.id}`)
            db.add(`ov_${user.id}`, 1)

            let Embed70 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Ocean View House For 20,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886687456039174235/ocean_view.jpg')

            db.subtract(`money_${user.id}`, 20000000)
            message.channel.send(Embed70)
        }else if (args.join(' ').toLocaleLowerCase() == 'mansion') {
            let Embed71 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 30,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Mansion**`);

            if (author < 30000000) return message.channel.send(Embed71)

            await db.fetch(`mans_${user.id}`)
            db.add(`mans_${user.id}`, 1)

            let Embed72 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Mansion For 30,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886687736336113685/mansion.jpg')

            db.subtract(`money_${user.id}`, 30000000)
            message.channel.send(Embed72)
        }else if (args.join(' ').toLocaleLowerCase() == 'castle') {
            let Embed73 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**You need 50,000,000 <:DevEvilBot_Coin:867679208855437333> to purchase Castle**`);

            if (author < 50000000) return message.channel.send(Embed73)

            await db.fetch(`cast_${user.id}`)
            db.add(`cast_${user.id}`, 1)

            let Embed74 = new MessageEmbed()
                .setColor(colors.main)
                .setDescription(`**Purchased Castle For 50,000,000 <:DevEvilBot_Coin:867679208855437333>**`)
                .setImage('https://cdn.discordapp.com/attachments/468141324906921984/886689701950545930/castle.jpg')

            db.subtract(`money_${user.id}`, 50000000)
            message.channel.send(Embed74)
        }
        else {
            if (message.content.toLowerCase() === `${prefix}buy`) {
                let embed19 = new MessageEmbed()
                    .setColor(colors.main)
                    .setDescription(`**Enter an item to buy\nType \`${prefix}shop\` to see list of items**`)
                return message.channel.send(embed19)
            }
        }
    }
}
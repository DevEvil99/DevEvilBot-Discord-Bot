const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Collection, Client } = require("discord.js");
const { token, default_prefix } = require("./config.json");
const config = require("./config.json");
const colors = require("./colors.json");
const { red, green, blue} = require('chalk');
const { readdirSync } = require("fs");
const fs = require("fs");
const { join, format } = require("path");
const db = require("quick.db");
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();
const pagination = require("discord.js-pagination");
const yts = require('yt-search');
const ultrax = require("ultrax");
const { Player } = require("discord-music-player");
const activities = [
  "https://devevilbot.xyz",
  "Default Prefix : de!",
  "Server : https://discord.gg/jsQ9UP7kCA",
  "🐢",
];


const client = new Discord.Client({ disableEveryone: true , fetchAllMembers: true});

process.on('unhandledRejection', console.error);

client.queue = new Map();
client.vote = new Map();

const player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  deafenOnJoin: true,
  timeout: 10,
  volume: 150,
  quality: 'high',
});

client.player = player;

client.on("ready", () => {
  const guild = client.guilds.cache.size.toLocaleString();
  const user = client.users.cache.size.toLocaleString();
  const channel = client.channels.cache.size.toLocaleString();

  let readychannel = client.channels.cache.get("844621375477907526");
  const ready = new Discord.MessageEmbed()
    .setTitle("I'm Online")
    .setThumbnail(
      client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    )
    .setDescription(
      `<a:yes:784463701305458708> **Serving ${user} users in ${guild} servers and ${channel} channels**`
    )
    .setColor(colors.main)
    .setFooter(
      `${client.user.username}`,
      client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    );
  readychannel.send(ready);

  const DevEvil = String.raw`




  _____             ______     _ _ ____        _   
 |  __ \           |  ____|   (_) |  _ \      | |  
 | |  | | _____   _| |____   ___| | |_) | ___ | |_ 
 | |  | |/ _ \ \ / /  __\ \ / / | |  _ < / _ \| __|
 | |__| |  __/\ V /| |___\ V /| | | |_) | (_) | |_ 
 |_____/ \___| \_/ |______\_/ |_|_|____/ \___/ \__|
                                                   
                                                   
      DevEvilBot.xyz is online               
      Developer: DevEvil#8745

`;

console.log(blue(DevEvil));
  setInterval(() => {
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 10000);
});

client.on('error', console.error)
client.on('warn', console.warn)

process.on('unhandledRejection', (error) => {
    console.error(`Uncaught Promise Error: \n${error.stack}`)
})

process.on('uncaughtException', (err) => {
    let errmsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './')
    console.error(errmsg)
})

client.on("guildCreate", (guild) => {
  const channel = guild.channels.cache.find(
    (channel) =>
      channel.type === "text" &&
      channel.permissionsFor(guild.me).has("SEND_MESSAGES")
  );
  const joinembed = new Discord.MessageEmbed()
    .setAuthor("Hello, I'm DevEvilBot.xyz", client.user.displayAvatarURL())
    .setDescription(
      "**Thank you for inviting me to your server :grin: :heart:** \n**Mention me for help or type ``de!help``** \n**Join our server for news of bot updates by typing ``de!server``** \n**Your server prefix: ``de!``** \n**You can support me by your upvotes ``de!upvote``** \n**You can change the bot prefix by typing ``de!prefix``**"
    )
    .setThumbnail(
      client.user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })
    )
    .setColor(colors.main)
    .setFooter("Thank You", client.user.displayAvatarURL())
    .setTimestamp();
  channel.send(joinembed);
});

client.on("guildCreate", (guild) => {
  if (!guild.partial) {
    const channel = client.channels.cache.get("844621417763962940");
    if (channel) {
      const botjoinlogembed = new MessageEmbed()
        .setTitle("Bot Join")
        .setColor(colors.main)
        .addField("Server Name", `**${guild.name}**`, true)
        .addField("Server ID", `**${guild.id}**`, true)
        .addField("Server Owner", `**${guild.owner}**`, true)
        .setDescription(`**This server has ${guild.memberCount} members**`)
        .setTimestamp();
      channel.send(botjoinlogembed);
    }
  }
});

client.on("guildDelete", (guild) => {
  if (!guild.partial) {
    const channel = client.channels.cache.get("844621417763962940");
    if (channel) {
      const botleftlogembed = new MessageEmbed()
        .setTitle("Bot Left")
        .setColor(colors.red)
        .addField("Server Name", `**${guild.name}**`, true)
        .addField("Server ID", `**${guild.id}**`, true)
        .addField("Server Owner", `**${guild.owner}**`, true)
        .setTimestamp();
      channel.send(botleftlogembed);
    }
  }
});

client.commands = new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  let prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
});


const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#5D40F2",
    reaction: "🎉",
  },
});

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
  console.log(
    `Giveaway #${giveaway.messageID} ended! Winners: ${winners
      .map((member) => member.user.username)
      .join(", ")}`
  );
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefix = await db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = default_prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  db.add(`messages_${message.guild.id}_${message.author.id}`, 1);
  let messagefetch = db.fetch(
    `messages_${message.guild.id}_${message.author.id}`
  );

  const levelsXP = [
    25,50,75,100,125,150,175,200,225,250,300,350,400,450,500,550,600,650,700,750,850,950,1050,1150,1250,1350,1450,1550,1650,1750,1950,2150,2350,2550,2750,2950,3150,3350,3550,3750,4250,4750,5250,5750,6250,6750,7250,7750,8250,8750,9750,10750,11750,12750,13750,14750,15750,16750,17750,18750,19850,20950,22050,23150,24250,25350,26450,27550,28650,29750,31250,32750,34250,35750,37250,38750,40250,41750,43250,44750,46750,48750,50750,52750,54750,56750,58750,60750,62750,64750,67750,70750,73750,76750,79750,82750,85750,87750,90750,93750
  ]

  let messages;
  if(levelsXP.includes(messagefetch)) messages = messagefetch

  if (!isNaN(messages)) {
    db.add(`level_${message.guild.id}_${message.author.id}`, 1);
    let levelfetch = db.fetch(`level_${message.guild.id}_${message.author.id}`);

    let levelembed = new Discord.MessageEmbed()
      .setDescription(
        `**Nice ${message.author}, you just advanced to level ${levelfetch}** <a:CupGif:788458892497125436>`
      )
      .setColor(colors.main);
    let rankChannel = db.fetch(`channel_${message.guild.id}`);
    if (!rankChannel) return;
    let rankmsgChannel = message.guild.channels.cache.get(rankChannel);
    if (!rankmsgChannel) return;
    rankmsgChannel.send(message.author, levelembed);
  }
});

client.on("guildMemberAdd", async (member) => {
  let chx = db.get(`welchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_url = `https://cdn.discordapp.com/attachments/468141324906921984/868120864162459649/bg.png`
  
  let default_msg = `**Hello ${member.user}, Welcome to ${member.guild.name}, Server 👋**\n**You are our ${member.guild.memberCount}th Member**`
  
  let m1 = db.get(`msg_${member.guild.id}`)
  const msg = m1.replace("{member}", member.user).replace("{guild}", member.guild).replace("{count}", member.guild.memberCount)

  if(msg === null) msg = default_msg

  let url = db.get(`url_${member.guild.id}`)
  if(url === null) url = default_url
  
   let data = await canva.welcome(member, { link: url})
 
    const attachment = new Discord.MessageAttachment(
      data,
      "DevEvilBot-welcome-image.png"
    );


  client.channels.cache.get(chx).send(msg, attachment)
})

client.on("guildMemberAdd", async (member) => {
  let chx = db.get(`welcemchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_msg = `**Hello ${member.user}, Welcome to ${member.guild.name}, Server 👋**\n**You are our ${member.guild.memberCount}th Member**`
  
  let m1 = db.get(`emmsg_${member.guild.id}`)
  const msg = m1.replace("{member}", member.user).replace("{guild}", member.guild).replace("{count}", member.guild.memberCount)

  if(msg === null) msg = default_msg

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  .setDescription(`${msg}`)
  .setColor(colors.main)
  .setTimestamp()
  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))


  client.channels.cache.get(chx).send(embed)
})

client.on("guildMemberAdd", async (member) => {
  let chx = db.get(`wlctextch_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_msg = `**Hello ${member.user}, Welcome to ${member.guild.name}, Server 👋**\n**You are our ${member.guild.memberCount}th Member**`
  
  let m1 = db.get(`wlctextmsg_${member.guild.id}`)
  const msg = m1.replace("{member}", member.user).replace("{guild}", member.guild).replace("{count}", member.guild.memberCount)

  if(msg === null) msg = default_msg

  client.channels.cache.get(chx).send(msg)
})

client.on("guildMemberRemove", async (member) => {
  let chx = db.get(`leftchannel_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_msg = `**${member.user}, Left the server**`
  
  let m1 = db.get(`leftmsg_${member.guild.id}`)
  const msg = m1.replace("{member}", member.user).replace("{guild}", member.guild).replace("{count}", member.guild.memberCount)

  if(msg === null) msg = default_msg

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  .setDescription(`${msg}`)
  .setColor(colors.main)
  .setTimestamp()
  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))


  client.channels.cache.get(chx).send(embed)
})

client.on("guildMemberRemove", async (member) => {
  let chx = db.get(`lefttextch_${member.guild.id}`);
  
  if(chx === null) {
    return;
  }
  
  let default_msg = `**Hello ${member.user}, Welcome to ${member.guild.name}, Server 👋**\n**You are our ${member.guild.memberCount}th Member**`
  
  let m1 = db.get(`lefttextmsg_${member.guild.id}`)
  const msg = m1.replace("{member}", member.user).replace("{guild}", member.guild).replace("{count}", member.guild.memberCount)

  if(msg === null) msg = default_msg

  client.channels.cache.get(chx).send(msg)
})

client.on('messageReactionAdd', async (reaction, user) => {
  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();
  if(user.bot) return;
   let emote = await db.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!emote) return;
  let messageid = await db.get(`message_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!messageid) return;
  let role = await db.get(`role_${reaction.message.guild.id}_${reaction.emoji.id}`)
  if(!role) return;

  if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
  reaction.message.guild.members.fetch(user).then(member => {
    let embed = new Discord.MessageEmbed()
    .setAuthor(user.username , user.displayAvatarURL())
    .setDescription(`<a:no:784463793366761532> **It's Looks You Already Have ${reaction.message.guild.roles.cache.get(role).name}** `)
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor(colors.main)
    if(member.roles.cache.has(role)) return user.send(embed)
    let sucsses = new Discord.MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL())
    .setDescription(`<a:yes:784463701305458708> **${reaction.message.guild.roles.cache.get(role).name}** Has Been added to you on ${reaction.message.guild.name}`)
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor(colors.main)

    member.roles.add(role) 
    return user.send(sucsses)
  })
  }
})

client.on('messageReactionAdd', async (reaction, user) => {
if(user.partial) await user.fetch();
if(reaction.partial) await reaction.fetch();
if(reaction.message.partial) await reaction.message.fetch();
if(user.bot) return;
 let emote = await db.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!emote) return;
let messageid = await db.get(`message_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!messageid) return;
let role = await db.get(`role_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!role) return;

if(reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
reaction.message.guild.members.fetch(user).then(member => {
  let embed = new Discord.MessageEmbed()
  .setAuthor(user.username , user.displayAvatarURL())
  .setDescription(`<a:no:784463793366761532> **It's Looks You Already Have ${reaction.message.guild.roles.cache.get(role).name}** `)
  .setFooter(reaction.message.guild.name , reaction.message.guild.iconURL())
  .setTimestamp()
  if(member.roles.cache.has(role)) return user.send(embed)
  let sucsses = new Discord.MessageEmbed()
  .setAuthor(user.username, user.displayAvatarURL())
  .setDescription(`<a:yes:784463701305458708> **${reaction.message.guild.roles.cache.get(role).name}** Has Been added to you on ${reaction.message.guild.name}`)
  .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  .setColor(colors.main)

  member.roles.add(role) 
  return user.send(sucsses)
})
}
})


client.on('messageReactionRemove', async (reaction, user) => {
console.log(user.username)
if(user.partial) await user.fetch();
if(reaction.partial) await reaction.fetch();
if(reaction.message.partial) await reaction.message.fetch();
if(user.bot) return;
let emote = await db.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.id}`)
if(!emote) return;
let messageid = await db.get(`message_${reaction.message.guild.id}_${reaction.emoji.id}`)
if(!messageid) return;
let role = await db.get(`role_${reaction.message.guild.id}_${reaction.emoji.id}`)
if(!role) return;
 if(reaction.message.id == messageid && reaction.emoji.id == `${emote}`) {
  reaction.message.guild.members.fetch(user).then(member => {

 let embed = new Discord.MessageEmbed()
 .setAuthor(user.username , user.displayAvatarURL())
 .setDescription(`<a:yes:784463701305458708> **${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You`)
 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
 .setColor(colors.main)
 user.send(embed)
 member.roles.remove(role)
  
})
}
})

client.on('messageReactionRemove', async (reaction, user) => {
console.log(user.username)
if(user.partial) await user.fetch();
if(reaction.partial) await reaction.fetch();
if(reaction.message.partial) await reaction.message.fetch();
if(user.bot) return;
let emote = await db.get(`emoteid_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!emote) return;
let messageid = await db.get(`message_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!messageid) return;
let role = await db.get(`role_${reaction.message.guild.id}_${reaction.emoji.name}`)
if(!role) return;
 if(reaction.message.id == messageid && reaction.emoji.name == `${emote}`) {
  reaction.message.guild.members.fetch(user).then(member => {
  
 let embed = new Discord.MessageEmbed()
 .setAuthor(user.username , user.displayAvatarURL())
 .setDescription(`<a:yes:784463701305458708> **${reaction.message.guild.roles.cache.get(role).name}** Role Removed From You`)
 .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
 .setColor(colors.main)
 user.send(embed)
 member.roles.remove(role)
  
})
}
})

client.login(token);

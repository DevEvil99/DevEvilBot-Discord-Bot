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

  let messages;
  if (messagefetch == 25) messages = 25;
  else if (messagefetch == 50) messages = 50;
  else if (messagefetch == 75) messages = 75;
  else if (messagefetch == 100) messages = 100;
  else if (messagefetch == 125) messages = 125;
  else if (messagefetch == 150) messages = 150;
  else if (messagefetch == 175) messages = 175;
  else if (messagefetch == 200) messages = 200;
  else if (messagefetch == 225) messages = 225;
  else if (messagefetch == 250) messages = 250;
  else if (messagefetch == 300) messages = 300;
  else if (messagefetch == 350) messages = 350;
  else if (messagefetch == 400) messages = 400;
  else if (messagefetch == 450) messages = 450;
  else if (messagefetch == 500) messages = 500;
  else if (messagefetch == 550) messages = 550;
  else if (messagefetch == 600) messages = 600;
  else if (messagefetch == 650) messages = 650;
  else if (messagefetch == 700) messages = 700;
  else if (messagefetch == 750) messages = 750;
  else if (messagefetch == 850) messages = 850;
  else if (messagefetch == 950) messages = 950;
  else if (messagefetch == 1050) messages = 1050;
  else if (messagefetch == 1150) messages = 1150;
  else if (messagefetch == 1250) messages = 1250;
  else if (messagefetch == 1350) messages = 1350;
  else if (messagefetch == 1450) messages = 1450;
  else if (messagefetch == 1550) messages = 1550;
  else if (messagefetch == 1650) messages = 1650;
  else if (messagefetch == 1750) messages = 1750;
  else if (messagefetch == 1950) messages = 1950;
  else if (messagefetch == 2150) messages = 2150;
  else if (messagefetch == 2350) messages = 2350;
  else if (messagefetch == 2550) messages = 2550;
  else if (messagefetch == 2750) messages = 2750;
  else if (messagefetch == 2950) messages = 2950;
  else if (messagefetch == 3150) messages = 3150;
  else if (messagefetch == 3350) messages = 3350;
  else if (messagefetch == 3550) messages = 3550;
  else if (messagefetch == 3750) messages = 3750;
  else if (messagefetch == 4250) messages = 4250;
  else if (messagefetch == 4750) messages = 4750;
  else if (messagefetch == 5250) messages = 5250;
  else if (messagefetch == 5750) messages = 5750;
  else if (messagefetch == 6250) messages = 6250;
  else if (messagefetch == 6750) messages = 6750;
  else if (messagefetch == 7250) messages = 7250;
  else if (messagefetch == 7750) messages = 7750;
  else if (messagefetch == 8250) messages = 8250;
  else if (messagefetch == 8750) messages = 8750;
  else if (messagefetch == 9750) messages = 9750;
  else if (messagefetch == 10750) messages = 10750;
  else if (messagefetch == 11750) messages = 11750;
  else if (messagefetch == 12750) messages = 12750;
  else if (messagefetch == 13750) messages = 13750;
  else if (messagefetch == 14750) messages = 14750;
  else if (messagefetch == 15750) messages = 15750;
  else if (messagefetch == 16750) messages = 16750;
  else if (messagefetch == 17750) messages = 17750;
  else if (messagefetch == 18750) messages = 18750;
  else if (messagefetch == 19850) messages = 19850;
  else if (messagefetch == 20950) messages = 20950;
  else if (messagefetch == 22050) messages = 22050;
  else if (messagefetch == 23150) messages = 23150;
  else if (messagefetch == 24250) messages = 24250;
  else if (messagefetch == 25350) messages = 25350;
  else if (messagefetch == 26450) messages = 26450;
  else if (messagefetch == 27550) messages = 27550;
  else if (messagefetch == 28650) messages = 28650;
  else if (messagefetch == 29750) messages = 29750;
  else if (messagefetch == 31250) messages = 31250;
  else if (messagefetch == 32750) messages = 32750;
  else if (messagefetch == 34250) messages = 34250;
  else if (messagefetch == 35750) messages = 35750;
  else if (messagefetch == 37250) messages = 37250;
  else if (messagefetch == 38750) messages = 38750;
  else if (messagefetch == 40250) messages = 40250;
  else if (messagefetch == 41750) messages = 41750;
  else if (messagefetch == 43250) messages = 43250;
  else if (messagefetch == 44750) messages = 44750;
  else if (messagefetch == 46750) messages = 46750;
  else if (messagefetch == 48750) messages = 48750;
  else if (messagefetch == 50750) messages = 50750;
  else if (messagefetch == 52750) messages = 52750;
  else if (messagefetch == 54750) messages = 54750;
  else if (messagefetch == 56750) messages = 56750;
  else if (messagefetch == 58750) messages = 58750;
  else if (messagefetch == 60750) messages = 60750;
  else if (messagefetch == 62750) messages = 62750;
  else if (messagefetch == 64750) messages = 64750;
  else if (messagefetch == 67750) messages = 67750;
  else if (messagefetch == 70750) messages = 70750;
  else if (messagefetch == 73750) messages = 73750;
  else if (messagefetch == 76750) messages = 76750;
  else if (messagefetch == 79750) messages = 79750;
  else if (messagefetch == 82750) messages = 82750;
  else if (messagefetch == 85750) messages = 85750;
  else if (messagefetch == 87750) messages = 87750;
  else if (messagefetch == 90750) messages = 90750;
  else if (messagefetch == 93750) messages = 93750;

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

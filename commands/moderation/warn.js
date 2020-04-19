const Discord = require('discord.js');
const fs = require("fs");

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You need to have permission: `MANAGE_MESSAGES`!");
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.reply('you must mention someone to warn them.');
  if (reason.length < 1) return message.reply('you must have a reason for the warning.');

  let dmsEmbed = new Discord.RichEmbed()
  .setTitle("Warn")
  .setColor("0xff0000")
  .setDescription(`You have been warned on \`${message.guild.name}\``)
  .addField("Warned by", message.author.tag)
  .addField("Reason", reason);

  user.send(dmsEmbed);
  
  message.channel.send(`${user.tag} has been warned!`)

}

exports.help = {
  name: 'warn'
};
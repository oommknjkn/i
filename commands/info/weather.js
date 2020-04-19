const Discord = module.require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {

    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        if(result.length === 1) {
            message.channel.send("**Please enter a valid location!**")
            return;
        }

        //Variables
        var current = result[0].current
        var location = result[0].location

        //Sends weather log in embed
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`)
           .setAuthor(`Weather for ${current.observationpoint}`)
           .setThumbnail(current.imageUrl)
           .setColor(0xff0000) //Sets the color of the embed
           .addField("Timezone", `UTC${location.timezone}`, true)
           .addField("Degree Type", location.degreetype, true)
           .addField("Temperature", `${current.temperature}`, true)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay, true)
           .addField("Humidity", ` ${current.humidity}%`, true)
           .addField("Day", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
           
           message.channel.sendEmbed(embed)

    });

    
    }
module.exports.help = {
    name: "weather"
}

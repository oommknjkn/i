const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const fs = require("fs")

exports.run = (client, message, args) => {
    if (!message.channel.nsfw) return message.channel.send("Please enable NSFW channel to use this command!")

    var subreddits = [
        'MilitaryGoneWild',
        'sexyuniforms'
    ]
    var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];

    randomPuppy(sub)
        .then(url => {
            request.get(url).then(r => {
                fs.writeFile(`uniform.jpg`, r.body)
                message.channel.sendFile(r.body)
                fs.unlink(`./uniform.jpg`)
            })
        })
}
const search = require('yt-search');

module.exports.run = async (bot, message, args, ops) => {

    search(args.join(' '), function (err, res) {

        if (err) return message.channel.send("Please enter what u want to search!");

        var videos = res.videos.slice(0, 10);

        var response = '';

        for (var i in videos) {

            response += `**[${parseInt(i) + 1}]:** ${videos[i].title} \r\n`;

        }

        response += `**Please choose between 1-${videos.length}!**`;

        message.channel.send(response);

        const filter = music => !isNaN(music.content) && music.content < videos.length + 1 && music.content > 0;

        const collection = message.channel.createMessageCollector(filter);

        collection.videos = videos;

        collection.once('collect', function (music) {

            var commandFile = require('./play.js');

            commandFile.run(bot, message, [this.videos[parseInt(music.content) - 1].url], ops);

        });

    });

}

module.exports.help = {
    name: "search",
    description: "Search"
}

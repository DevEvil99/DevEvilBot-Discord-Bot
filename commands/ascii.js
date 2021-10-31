  
const figlet = require('figlet');

module.exports = {
    name: "ascii",
    description: "Converts text to ascii",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('<a:no:784463793366761532> **Please provide some text**');

        msg = args.join(" ");

        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('<a:no:784463793366761532> **Please provide text shorter than 2000 characters**')

            message.channel.send('```' + data + '```')
        })
    }
}
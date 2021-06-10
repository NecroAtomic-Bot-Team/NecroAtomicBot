const discord = require('discord.js')
const { MessageButton } = require('discord-buttons')
const fetch = require('node-fetch')
require("dotenv").config();
const token = process.env.token;

module.exports = {
    name: 'yt',
    description:'Youtube Interface',
    async execute(message, args,client){

    let channel = message.member.voice.channel;
    if(!channel) return message.channel.send("You have to be in a vc")

    fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
            max_age: 86400,
            max_uses: 0,
            target_application_id: "755600276941176913",
            target_type: 2,
            temporary: false,
            validate: null
        }),
        headers: {
            "Authorization": `Bot ${token}`,
            "Content-Type": "application/json"
        }
    })
    
    .then(res => res.json())
    .then(invite => {
        if(!invite.code) return message.channel.send("Sadly i cant start a yt together")
        const e = new discord.MessageEmbed()
.setTitle('Welcome to YouTube!')
.setColor('RED')
.setThumbnail('https://media.discordapp.net/attachments/796358841038143488/851878274179399751/youtube.png')
        .setDescription(`\nTo watch youtube [Click me](https://discord.com/invite/${invite.code})`)
.setTimestamp()

let button = new MessageButton()
            .setStyle('url')
            .setLabel('Open YouTube!')
            .setURL(`https://discord.com/invite/${invite.code}`)

        message.channel.send({
            component: button,
            embed: e
        });
    })
}
}
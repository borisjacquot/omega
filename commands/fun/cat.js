const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
	name: "cat",
	aliases: ["chat", "meow", "miaou"],
	category: "fun",
	description: "Envoie une photo de chat",
	run: async (client, message, args) => {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
        const embed = new MessageEmbed()
            .setImage(file)
            .setColor('#ff7979')
            .setFooter('Il est beau ce chat...');
        message.channel.send(embed);
        message.react('✅');
	}
}
const { MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str); // éviter erreur si texte trop long

module.exports = {
	name: "urban",
	category: "fun",
	description: "Recherche un mot de d'jeun's",
	run: async (client, message, args) => {
        if (!args.length) {
            return message.channel.send("Mauvaise utilisation, pour plus d'info, `$help urban`")
        }

        const query = querystring.stringify({ term: args.join(' ') });
        const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        if (!list.length) {
            return message.channel.send(`Aucun résultat pour **${args.join(' ')}**.`);
        }

        const [answer] = list;

        const embed = new MessageEmbed()
            .setColor('#e67e22')
            .setTitle(answer.word)
            .setURL(answer.permalink)
            .addFields(
                { name: 'Définition', value: trim(answer.definition, 1024) },
                { name: 'Exemple', value: trim(answer.example, 1024) },
                { name: 'Note', value: `${answer.thumbs_up} 👍 ${answer.thumbs_down} 👎` }
            );
        
        message.channel.send(embed);
        message.react('✅');
	}
}
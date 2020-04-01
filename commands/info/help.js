const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Retourne toutes les commandes, ou les infos d'une commande particulière",
    usage: "[commande | alias]",
    run: async (client, message, args) => {
        message.react('✅');
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setColor("RANDOM")
    
    // Mapping des commandes
    const commands = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => `- \`${cmd.name}\``)
            .join("\n");
    }

    // Mapping des catégories
    const info = client.categories
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    // cherche la commande ou alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `Commande inexistante: **${input.toLowerCase()}**`;

    // si pas trouvé, renvoie embed vide
    if (!cmd) {
        return message.channel.send(embed.setColor("RED").setDescription(info));
    }

    // ajoute les infos de la commande
    if (cmd.name) info = `**Nom de la commande**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Alias**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Utilisation**: ${cmd.usage}`;
        embed.setFooter(`Syntaxe: <> = requis, [] = optionnel, | = ou`);
    }

    return message.channel.send(embed.setColor("GREEN").setDescription(info));
}
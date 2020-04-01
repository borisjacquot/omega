const { getMember, formatDate } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["who", "user", "info"],
    description: "Retourne les infos d'un utilisateur",
    usage: "[nom | id | mention]",
    run: async (client, message, args) => {
    	message.react('✅');
        const member = getMember(message, args.join(" "));

        const joined = formatDate(member.joinedAt);
        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(r => r).join(", ") || 'none';

        const created = formatDate(member.user.createdAt);

        const embed = new MessageEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())
            .setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

            .addField('Informations du membre:', stripIndents`**> Nom affiché:** ${member.displayName}
            **> Rejoint le:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField("Information de l'utilisateur:", stripIndents`**> ID:** ${member.user.id}
            **> Nom**: ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Créé le:** ${created}`, true)
            
            .setTimestamp()

        if (member.user.presence.game) 
            embed.addField('Currently playing', stripIndents`**> Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}
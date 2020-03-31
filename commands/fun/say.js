module.exports = {
	name: "say",
	category: "fun",
	description: "Réécrit le message",
	aliases: ["dit", "bc", "broadcast"],
	usage: "<message>",
	run: async (client, message, args) => {
		if (message.deletable) message.delete();

		if (args.length < 1) return message.reply("🤔 j'aimerais bien, mais je n'ai rien à dire...");

		const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

		const embed = new MessageEmbed()
			.setColor(roleColor)
			.setDescription(args.join(" "));

		message.channel.send(embed);
	}
}
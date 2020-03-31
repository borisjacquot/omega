module.exports = {
	name: "ping",
	category: "info",
	description: "Teste la latence",
	run: async (client, message, args) => {
		const msg = await message.channel.send(`🏓 Ping...`);

		msg.edit(`🏓 PONG !\nLatence : ${Math.floor(msg.createdAt - message.createdAt)}ms`);
	}
}
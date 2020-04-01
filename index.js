const { Client, Collection, MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");

const client = new Client({
    disableEveryone: true
})

// db
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://admin:8HD9iYsGjOYdD4fT@omega-dqr3s.mongodb.net/test?retryWrites=true&w=majority')

// Collections
client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

// Récupération commandes
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);

    client.user.setPresence({
        status: "online",
        activity: {
            name: "me getting developed",
            type: "WATCHING"
        }
    }); 
})

client.on("message", async message => {
    const prefix = "$";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // On va chercher les commandes
    let command = client.commands.get(cmd);
    // Si commande inconnue -> recherche alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // si une commande est trouvée, la lancer
    if (command) 
        command.run(client, message, args);
});

client.login(process.env.TOKEN); // secret token

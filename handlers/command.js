const { readdirSync } = require("fs");

const ascii = require("ascii-table");

// Table ascii
let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    // lecture de tous les dossiers de commandes
    readdirSync("./commands/").forEach(dir => {
        // on garde que les .js
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, '❌');
                continue;
            }
    
            // si il y a des aliases, on les lit
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    // afficher tableau dans console
    console.log(table.toString());
}
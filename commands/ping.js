const { MessageActionRow, MessageSelectMenu, EmbedBuilder } = require("discord.js"); // By Swenzy 💝
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Botun gecikme süresini gösterir"),

    run: async (client, interaction) => {
        const embed = new EmbedBuilder()
            .setTitle("Ping")
            .setDescription(`Merhaba, ben ${client.user.username} şuanda gecikme sürem : ${client.ws.ping}`)
        interaction.reply({embeds: [embed]});
    },
};

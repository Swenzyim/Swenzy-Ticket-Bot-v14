const { Client, SlashCommandBuilder, EmbedBuilder,PermissionFlagsBits, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder, ApplicationCommandOptionType, ChannelType } = require('discord.js'); // By Swenzy 💝

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-sistemi')
        .setDescription('Ticket sistemini kurarsın')
        .addChannelOption(option =>
            option.setName('kanal')
                .setDescription('Ticket mesajı hangi kanalda olsun?')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('kategori')
                .setDescription('Ticketler hangi kategoride açılsın?')
                .setRequired(true)
    ),

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return interaction.reply({ content: "Bu komutu kullanmak için 'Kanalları Yönet' yetkisine sahip olmalısınız.", ephemeral: true });
        }

        const data = interaction.options.getChannel("kanal");
        const data2 = interaction.options.getChannel("kategori")

        const kanal = interaction.guild.channels.cache.get(`${data.id}`);
        const kategori = interaction.guild.channels.cache.get(`${data2.id}`)

        if (!kanal.viewable) {
            return interaction.reply({
                content: "Belirledigin kanalı göremiyorum !",
                ephemeral: true
            })
        }

        if (kategori.type !== ChannelType.GuildCategory) {
            return interaction.reply({
                content: "Seçtiğiniz kategori geçersiz !",
                ephemeral: true
            })
        }

        if (!kategori.viewable) {
            return interaction.reply({
                content: "Belirledigin kategoriyi göremiyorum !",
                ephemeral: true
            })
        }

        if (!kategori.permissionsFor(client.user.id).has("ManageChannels")) {
            return interaction.reply({
                content: "Ticket kanalı oluşturmak için kanalları yönetme yetkisine sahip değilim.",
                ephemeral: true
            })
        }

        
        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId(`ticket-setup-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Ticket Oluştur')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`fiyat-bilgisi-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Fiyat Bilgisi')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`diger-bilgiler-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Diğer Bilgiler')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId(`reklam-destek-${interaction.guild.id}-${kategori.id}`)
                .setLabel('Reklam Desteği Ekle')
                .setEmoji('1214221715203424267')
                .setStyle(ButtonStyle.Secondary)
        );
        const embed = new EmbedBuilder()
            .setColor(0x2B2D31)
            .setImage('https://media.discordapp.net/attachments/1425203656508178532/1429073426714464426/ezgif-675a9d2f451a17_1.gif?ex=68f4cfd7&is=68f37e57&hm=4e21da10d77af35f7eebb290f4ae6a40bd02ecf56d0f73c27bd0b02724e718d6&=&width=413&height=53')
            .setDescription(`<:excode_member:1429071705187287081> **Merhaba,**

            <:Excode:1425893200253554919> **Size daha iyi hizmet verebilmek adına lütfen aşağıdaki formu doldurarak bize talebinizi iletebilirsiniz. Mümkün olduğunca çabuk size geri dönüş yapacağız.**
            
            <:info_excode:1415604829455257620> **Konu: (Ticket'in konusu - Örneğin: Ürün Sorunu, Fatura Talebi, vs.)
            Açıklama: (Sorunuz veya talebiniz hakkında detaylı bir açıklama)
            Mümkünse ekstra bilgiler veya ekran görüntüleri ekleyerek sorununuzu daha iyi anlatın. Size en kısa sürede yanıt vermek için elimizden geleni yapacağız.**
            
            <a:excodekalp:1415404411307429929> **Teşekkürler!**
            
            
            <a:excode_dev:1429071040205684847> \`Development By\` : <@1195760072068972577>`);

        await interaction.reply({
            content: `Ticket sistemi başarıyla ${kanal} kanalına kuruldu.`,
            ephemeral: true
        })

        kanal.send({
            components: [button],
            embeds: [embed]
        })
    }
}
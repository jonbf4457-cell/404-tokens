JavaScript
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

// VARIABLES DE CONFIGURACIÓN
const TOKEN = process.env.TOKEN;
const CANAL_ID = process.env.CANAL_ID || '1540565310997008424';

client.once('ready', async () => {
    console.log(`Bot conectado como ${client.user.tag}`);
    try {
        const canal = await client.channels.fetch(CANAL_ID);
        if (canal) await enviarPanelTokens(canal);
    } catch (error) {
        console.error('Error al enviar el mensaje:', error);
    }
});

async function enviarPanelTokens(canal) {
    const embed = new EmbedBuilder()
        .setColor(0xE6B800)
        .setTitle('🔎 BÚSQUEDA DE TOKENS — SPAIN TOKENS')
        .setDescription(
            '🇪🇸 **¿Buscas un token?** Publica tu búsqueda y le llegará por **MD** a todos los jugadores online.\n\n' +
            '✨ **Buscar token** — indica la cantidad y el modo (1v1, 2v2, 3v3 o 4v4). *Solo en modo Online.*\n' +
            '🟢 **Online** — recibirás por MD las búsquedas de otros jugadores y podrás buscar.\n' +
            '🔴 **Offline** — ni recibes búsquedas ni puedes buscar hasta volver a Online.\n\n' +
            '✔️ Cuando dos jugadores se aceptan, habláis por **privado** para pasaros vuestras **IDs de Fortnite**.\n' +
            '⚠️ Ten los **MDs abiertos** o el bot no podrá avisarte. Búsquedas: caducan a los **15 min**, máximo **1 cada 3 min**.\n\n' +
            '🟢 **Jugadores online ahora mismo:** 0'
        )
        .setFooter({ text: 'ES Spain Tokens • Sistema de Tickets' });

    const botones = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId('btn_buscar').setLabel('Buscar token').setStyle(ButtonStyle.Primary).setEmoji('🪙'),
        new ButtonBuilder().setCustomId('btn_online').setLabel('Online').setStyle(ButtonStyle.Success).setEmoji('✔️'),
        new ButtonBuilder().setCustomId('btn_offline').setLabel('Offline').setStyle(ButtonStyle.Danger).setEmoji('🛑')
    );

    await canal.send({ embeds: [embed], components: [botones] });
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'btn_buscar') {
        await interaction.reply({ content: 'Has iniciado la búsqueda de token.', ephemeral: true });
    } else if (interaction.customId === 'btn_online') {
        await interaction.reply({ content: 'Ahora estás **Online**.', ephemeral: true });
    } else if (interaction.customId === 'btn_offline') {
        await interaction.reply({ content: 'Ahora estás **Offline**.', ephemeral: true });
    }
});

client.login(TOKEN);

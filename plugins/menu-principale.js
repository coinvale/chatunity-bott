import { performance } from 'perf_hooks';

const handler = async (message, { conn, usedPrefix }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity-Bot 💬';

    const menuText = generateMenuText(usedPrefix, botName, userCount);
    
    const profilePictureUrl = await fetchProfilePictureUrl(conn, message.sender);

    const messageOptions = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363259442839354@newsletter',
                serverMessageId: '',
                newsletterName: `${botName}`
            },
            externalAdReply: {
                title: 'Menu Principale',
                body: 'Versione: beta',
                mediaType: 1,
                renderLargerThumbnail: false,
                previewType: 'thumbnail',
                thumbnail: await fetchThumbnail(profilePictureUrl),
                
            }
        }
    };

    await conn.sendMessage(message.chat, { text: menuText, ...messageOptions }, { quoted: message });
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
    『💬』 ══ •⊰✰⊱• ══ 『💬』
          𝐔𝐬𝐚 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭
        
     ${prefix}𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢
     ${prefix}𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐚
     ${prefix}𝐩𝐫𝐨𝐩𝐫𝐢𝐞𝐭𝐚𝐫𝐢𝐨
     ${prefix}𝐀𝐝𝐦𝐢𝐧
     ${prefix}𝐆𝐫𝐮𝐩𝐩𝐨
     ${prefix}𝐒𝐜𝐫𝐢𝐩𝐭
    『💬』 ══ •⊰✰⊱• ══ 『💬』
        𝐔𝐭𝐞𝐧𝐭𝐢: ${userCount}
        𝐀𝐮𝐭𝐨𝐫𝐞: 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
    `;
}

async function fetchProfilePictureUrl(conn, sender) {
    try {
        return await conn.profilePictureUrl(sender, 'image');
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        return 'https://example.com/default-thumbnail.png'; // Fallback URL
    }
}

async function fetchThumbnail(url) {
    const response = await fetch(url);
    const buffer = await response.buffer();
    return buffer;
}

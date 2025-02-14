import os from 'os';
import util from 'util';
import humanReadable from 'human-readable';
import baileys from '@whiskeysockets/baileys';
import fs from 'fs';
import { performance } from 'perf_hooks';

const handler = async (message, { conn, usedPrefix }) => {
    const processUptime = process.uptime();
    const formattedUptime = clockString(processUptime);
    const userCount = Object.keys(global.db.data.users).length;

    const chatEntries = Object.entries(conn.chats).filter(([jid, chat]) => jid && chat.isChats);
    const groupChats = chatEntries.filter(([jid]) => jid.endsWith('@g.us'));
    const privateChats = chatEntries.filter(([jid]) => jid.endsWith('@s.whatsapp.net'));

    const memoryUsage = process.memoryUsage();
    const { restrict } = global.db.data.settings[conn.user.jid] || {};
    const { autoread } = global.opts;
    const defaultImage = './no.png';

    const startTime = performance.now();
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    const profilePicture = await conn.profilePictureUrl(message.sender, 'image').catch(() => defaultImage);
    const botName = global.db.data.nomedelbot || 'ChatUnity-Bot 💬';
    const menuText = generateMenuText(usedPrefix, botName, userCount);

    await conn.sendMessage(message.chat, {
        text: menuText,
        contextInfo: {
            mentionedJid: conn.parseMention(menuText),
            forwardingScore: 1,
            isForwarded: true,
            externalAdReply: {
                title: `${responseTime} ms`,
                body: `Versione Bot: 1.0.1`,
                mediaType: 1,
                renderLargerThumbnail: false,
                previewType: 'PHOTO',
                thumbnail: Buffer.from(profilePicture, 'base64'), // Ensure the thumbnail is properly encoded
                sourceUrl: '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲'
            }
        }
    });

    // Forward message from the specified channel
    const channelJid = '120363259442839354@newsletter';
    const forwardedMessage = await conn.loadMessage(channelJid, message.id);
    if (forwardedMessage && forwardedMessage.message) {
        await conn.relayMessage(message.chat, forwardedMessage.message, {
            messageId: forwardedMessage.key.id,
            contextInfo: {
                externalAdReply: {
                    title: 'Forwarded Message',
                    body: `From: ${botName}`,
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    previewType: 'PHOTO',
                    thumbnail: Buffer.from(profilePicture, 'base64'), // Ensure the thumbnail is properly encoded
                    sourceUrl: '𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲'
                }
            }
        });
    } else {
        console.error('Failed to load forwarded message');
    }
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menu|comandi)$/i;

export default handler;

function clockString(ms) {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

function generateMenuText(prefix, botName, userCount) {
    return `
    ༻══════════༺
          𝐔𝐬𝐚 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲-𝐁𝐨𝐭
        
     ${prefix}𝐅𝐮𝐧𝐳𝐢𝐨𝐧𝐢
     ${prefix}𝐈𝐧𝐬𝐭𝐚𝐥𝐥𝐚
     ${prefix}𝐩𝐫𝐨𝐩𝐫𝐢𝐞𝐭𝐚𝐫𝐢𝐨
     ${prefix}𝐀𝐝𝐦𝐢𝐧
     ${prefix}𝐆𝐫𝐮𝐩𝐩𝐨
     ${prefix}𝐒𝐜𝐫𝐢𝐩𝐭
    ༻══════════༺
        𝐔𝐭𝐞𝐧𝐭𝐢: ${userCount}
        𝐀𝐮𝐭𝐨𝐫𝐞: 𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲
    `;
}
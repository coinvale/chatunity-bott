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
    const menuText = generateMenuText(usedPrefix, botName);

    conn.sendMessage(message.chat, {
        text: menuText,
        contextInfo: {
            mentionedJid: conn.parseMention(menuText),
            forwardingScore: 1,
            isForwarded: true,
            externalAdReply: {
                title: `${responseTime} ms`,
                body: `Versione Bot: ${vs}`,
                mediaType: 1,
                renderLargerThumbnail: false,
                previewType: 'PHOTO',
                thumbnail: profilePicture,
                sourceUrl: 'ok'
            }
        }
    });
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

function generateMenuText(prefix, botName) {
    return `
        ──────────────
        - ${prefix}menu
        - ${prefix}comandi
        ──────────────
        Funzioni:
        - ${prefix}funzioni
        - ${prefix}install
        ──────────────
        Proprietario:
        - ${prefix}proprietario
        ──────────────
        Admin:
        - ${prefix}admin
        ──────────────
        Gruppo:
        - ${prefix}gruppo
        ──────────────
        Script:
        - ${prefix}script
        ──────────────
        Uptime: ${clockString(process.uptime())}
        Utenti: ${Object.keys(global.db.data.users).length}
        Bot: ${botName}
    `;
}
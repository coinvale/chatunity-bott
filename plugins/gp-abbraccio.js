const { makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth_info");
    const sock = makeWASocket({ auth: state });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];

        if (!msg.message || !msg.key.remoteJid) return;

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

        if (text) {
            const sender = msg.key.remoteJid;
            
            if (text.startsWith(".abbraccio") || text.startsWith("abbraccia")) {
                const mentionedUser = msg.message.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

                if (mentionedUser) {
                    await sock.sendMessage(sender, { text: Stai abbracciando @${mentionedUser.split("@")[0]} 🫂 }, { quoted: msg });
                } else {
                    await sock.sendMessage(sender, { text: "Tagga qualcuno per abbracciarlo! 👀" }, { quoted: msg });
                }
            }
        }
    });

    console.log("🤖 Bot WhatsApp avviato!");
}

startBot();
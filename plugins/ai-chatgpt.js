import fetch from 'node-fetch';
import axios from 'axios';
import translate from '@vitalets/google-translate-api';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  organization: global.openai_org_id,
  apiKey: global.openai_key,
});
const openaiii = new OpenAIApi(configuration);

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!text) throw `*${lenguajeGB['smsAvisoMG']()}𝙄𝙉𝙂𝙍𝙀𝙎𝙀 𝙐𝙉𝘼 𝙋𝙀𝙏𝙄𝘾𝙄𝙊𝙉 𝙊 𝙐𝙉𝘼 𝙊𝙍𝘿𝙀𝙉 𝙋𝘼𝙍𝘼 𝙐𝙎𝘼𝙍 𝙇𝘼 𝙁𝙐𝙉𝘾𝙄𝙊𝙉 𝘿𝙀𝙇 𝘾𝙃𝘼𝙏𝙂𝙋𝙏\n\n❏ 𝙀𝙅𝙀𝙈𝙋𝙇𝙊 𝘿𝙀 𝙋𝙀𝙏𝙄𝘾𝙄𝙊𝙉𝙀𝙎 𝙔 𝙊𝙍𝘿𝙀𝙉𝙀𝙎\n❏ ${usedPrefix + command} Recomienda un top 10 de películas de acción\n❏ ${usedPrefix + command} Codigo en JS para un juego de cartas`;

  if (command == 'ia' || command == 'chatgpt') {
    try {
      await conn.sendPresenceUpdate('composing', m.chat);

      async function luminsesi(q, username, logic) {
        try {
          const response = await axios.post("https://luminai.my.id/chat", {
            content: q,
            user: username,
            prompt: logic,
            webSearchMode: true // true = resultado con url
          });
          return response.data.result;
        } catch (error) {
          console.error('Error al obtener:', error);
          throw new Error('Error al obtener respuesta de LuminAI');
        }
      }

      let query = m.text;
      let username = `${m.pushName}`;
      let syms1 = `Actuaras como un Bot de WhatsApp el cual fue creado por GataNina-Li, tu seras GataBot-MD 🐈`;

      let result = await luminsesi(query, username, syms1);
      await m.reply(result);
    } catch (error) {
      console.error(error);
      try {
        let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`);
        if (!gpt.ok) throw new Error(`HTTP Error: ${gpt.status}`);
        let res = await gpt.json();
        await m.reply(res.gpt);
        gpt = await fetch(`https://deliriusapi-official.vercel.app/ia/chatgpt?q=${text}`);
        if (!gpt.ok) throw new Error(`HTTP Error: ${gpt.status}`);
        res = await gpt.json();
        await m.reply(res.data);
      } catch (error) {
        console.error(error);
        await m.reply('Error al obtener respuesta del servidor.');
      }
    }
  }

  if (command == 'openai' || command == 'ia2' || command == 'chatgpt2') {
    try {
      conn.sendPresenceUpdate('composing', m.chat);
      let gpt = await fetch(`${apis}/ia/gptweb?text=${text}`);
      if (!gpt.ok) throw new Error(`HTTP Error: ${gpt.status}`);
      let res = await gpt.json();
      await m.reply(res.gpt);
    } catch (error) {
      console.error(error);
      await m.reply('Error al obtener respuesta del servidor.');
    }
  }
};

handler.command = /^(openai|chatgpt|ia|ai|openai2|chatgpt2|ia2)$/i;
export default handler;
const handler = async (m, { command, text }) => {
  const responses = [
    ``,
  ];

  const uniqueResponses = [...new Set(responses)];
  const randomResponse = uniqueResponses[Math.floor(Math.random() * uniqueResponses.length)];

  m.reply(randomResponse.trim(), null, m.mentionedJid ? { mentions: m.mentionedJid } : {});
};

handler.customPrefix = /come/i;
handler.command = new RegExp;

export default handler;
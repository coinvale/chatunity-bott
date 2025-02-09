const handler = async (m, { command, text }) => {
  const responses = [
    ``,
  ];

  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  m.reply(randomResponse.trim(), null, m.mentionedJid ? { mentions: m.mentionedJid } : {});
};

handler.customPrefix = /secondo|cosa|parere|opinione|pareri|devo/i;
handler.command = new RegExp;

export default handler;
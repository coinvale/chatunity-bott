let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) return;
    
    if (command == 'negro' || command == 'nero') {
      conn.reply(m.chat, `
      ${text.toUpperCase()} è ⚫ ${(Math.floor(Math.random() * 100) + 1)}% ${command.toUpperCase()}
      `.trim(), m, m.mentionedJid ? {
        mentions: m.mentionedJid
      } : {});
    }
  }
  
  handler.help = ['negro', 'nero'].map(v => v + ' @tag | nombre')
  handler.tags = ['calculator']
  handler.command = /^nero|negro$/i
  
  export default handler
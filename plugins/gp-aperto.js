let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Get bot name from database or use default
    let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
  
    let setting = {
      '': 'not_announcement'
    }[args[0] || '']
    
    if (setting === undefined) return
    
    await conn.groupSettingUpdate(m.chat, setting)
    
    // Send message with newsletter forwarding
    await conn.sendMessage(m.chat, {
      text: '𝐂𝐡𝐚𝐭 𝐚𝐩𝐞𝐫𝐭𝐚 𝐩𝐞𝐫 𝐭𝐮𝐭𝐭𝐢',
      contextInfo: {
        forwardingScore: 99,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363259442839354@newsletter',
          serverMessageId: '',
          newsletterName: `${nomeDelBot}`
        }
      }
    }, { quoted: m })
  }
  
  handler.help = ['group open / close', 'gruppo aperto / chiuso']
  handler.tags = ['group']
  handler.command = /^(aperto)$/i
  handler.admin = true
  handler.botAdmin = true
  
  export default handler
let handler = async (m, { conn, groupMetadata }) => {
    try {
      if (!m.isGroup) throw 'Questo comando funziona solo nei gruppi'
      
      let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
      let gruppi = global.db.data.chats[m.chat]
      if (gruppi.spacobot === false) throw 'Funzione disabilitata in questo gruppo'
      
      let toM = a => '@' + a.split('@')[0]
      let ps = groupMetadata.participants.map(v => v.id)
      let a = ps.getRandom()
      let b
      do b = ps.getRandom()
      while (b === a)
  
      const messageOptions = {
        text: `${toM(a)} ${pickRandom([
          'vorrebbe leccare i capezzoli di',
          'adora annussare le scoreggie di',
          'vorrebbe disperatamente ballare nudx con',
          'sta notte ha sognato di fare sesso con',
          'fa sesso di nascosto con il cane di',
          'è follemente innamorato della nonna di',
          'ha messo incinta la madre di',
          'passa la notte ad osservare dormire',
          'durante le lezioni scolastiche ha fantasie sessuali su',
          'è la crush di',
          'è la puttana personale di',
          'succhia di nascosto il cazzo di',
          'lecca di notte le orecchie di',
          'piace masturbarsi sulle foto di',
          'ha scopato 9 mesi prima che nascesse con la madre di'
        ])} ${toM(b)}`,
        contextInfo: {
          mentionedJid: [a, b],
          forwardingScore: 999,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363259442839354@newsletter',
            serverMessageId: '',
            newsletterName: `${nomeDelBot}`
          }
        }
      }
  
      await conn.sendMessage(m.chat, messageOptions)
    } catch (error) {
      console.error('Error in zizzania:', error)
      m.reply('Si è verificato un errore durante l\'esecuzione del comando')
    }
  }
  
  handler.customPrefix = /zizzania|litigio|lite|litigare/i
  handler.command = new RegExp
  handler.group = true
  
  function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
  }
  
  export default handler
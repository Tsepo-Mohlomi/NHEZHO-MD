const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME1rR2dUZTl0SlFSWE1Kc1hxRUpiZHFNOVBEWTRET3hWbVBLV3lmUnVsUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0NkSHpla1JmZUdKMDlRa21JSUgrZzNac3lzUGU0bVg3QTNVeFdQZjJpaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLSitQSUVzdFIwNitxSXBEbEVxMmZJOVJNU213c0s0YnB1QkVDeUp3cVYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqOVhHUTBxNXRCV1VqN3ZYQTV0Ly94V0xMSnpBZGVuRElYVTJxTFlOYVFZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1MQmJiamEya1E4UnFESW5QNXByQzZiZzlJUC8yU0ZrNU16bngvb1piRjA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im56MHhxZTU3S1hsNkhMRTUzRmNTZUUrelNNQ29RbXFLaWNTSzdiZzRPM2c9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUJ1TGs2ZnNEWFFqWDVXMzBFek9KNzVsQXpCanY0cENZay9lWll5endXaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVREMjRKa2FzSWRvbGcvQm1GNlIzb1lmNmcvUWN3aEl2SE5kMmp6TGdnOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5PK2RlNU5qS3RvYi94SW5Yczl4aHBMRkVQb1JsT0pPd2NiNlNqVU5xVTcwSEVBN2xzRjNNVXBaSmRCMTJnT2JEOHcxVGMyaHBDR1dCN1orckEwNGp3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTAsImFkdlNlY3JldEtleSI6InBhdGVzS3ZNQkcvbWFIK0o4eWlYS2htbnFnNmpCK3F6V0Qzb28xNFgzcWc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJ0d0c0bC03VGFXaWJQeHBoVzdfWnciLCJwaG9uZUlkIjoiMzEyODE5ODItNjIzNS00MWI3LTg5NzMtOWNjNmYzZGZlYzg4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJjcERqKzNUbnRtektHNUh4K1o2WmlBMEdYUT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1NU1GV20yQXBBaGQrZ09wYSs0SW4wVk15Szg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiUVZLRkxFQ1ciLCJtZSI6eyJpZCI6IjI3NzM2MjY3NzY4OjUzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOcTFxOWtGRUs2YTlMMEdHQkVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJEMlY2cHRDRlFIZ0tFSHVQWU1tYndQSGRRNFNPaEx6eWZtVFVvTlY3U2xNPSIsImFjY291bnRTaWduYXR1cmUiOiJSQm52Tmc4RkNFYjRHT0YyaHI3Mk54YldwQmlBbmNOTGQ3a2dERlNYYnc4bitwMUllY09CV0RpNU5Bcmt3MUoyc3pVT0tWMzdobkova2hMOUp0QnJBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiME1TM1FiYjV2bldpeEV4RnhWMEZiZlI5Tjl6TWFvMHJGdWdjNWJpWnlUUWhrM1BLZHRDNVpQeXRMZEFoVW9VYUFpY2FtL0sxeGZTNVUrT1lvSS9uanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzczNjI2Nzc2ODo1M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJROWxlcWJRaFVCNENoQjdqMkRKbThEeDNVT0Vqb1M4OG41azFLRFZlMHBUIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNDQyOTQwfQ==',
    PREFIXE: process.env.PREFIX || "null",
    OWNER_NAME: process.env.OWNER_NAME || "Tsepo Mohlomi ⚜️",
    CAPTION : process.env.CAPTION || "Tsepo is Goated",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27736267768",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    ANTICALL: process.env.ANTICALL || 'no',
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VakUEfb4o7qVdkwPk83E",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Cyber_Paladin,
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    URL: process.env.URL || "https://files.catbox.moe/yedfbr.jpg",
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

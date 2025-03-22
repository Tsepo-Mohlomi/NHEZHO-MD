const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieURRZ1l2YXQ3MzduQWRLNzBiVmRrWjgvZ1AwQThNSS9IOUZNRVFBQUwwQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEdOZFlRc01uWlVwM3VFRGkxLzY4alR4b0NHazY4anVyOXNDMU5Bb0NtST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvR0o0T25HbmF5M0VJYXZ3Qk9CSzdIYlJJNkFzTmtiSG5sTzFjdCtYbVhrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQYk9tbGtSVzdRNFNtSmQreTFVOXdWMUhBQXlXS1paVnA4dnFvSXN6VndRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJNYVdjTUdITjdieHlwMjBUbS9sekFWRFE2amp0Umt4QVh1cTdBNCtqMVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklLbndJQktOZ2xvVUxpNnc0cUNYeGpaN2p4VTRtMGRQYTBDSDhHL1pPaHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0t5Q1dESkV0M3hlRHdmeGRsR1k1YnJMU2ltalprc3J3NHl4YnJ4R2IxYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibkRHMWs2OWxNOEZITVhlQjBvS1dlUDlPWTVQODlNY0EwS20rcTE2c0dsTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR4M2ZKSG1UenYzcnZhNjZmYjBlZFRBYjBEdnNWbUczb0p4dlBkQ1lyMmVUQ09JTytFeWkzdlJFK1JqRTVwNDBsbkpidlRZZ0RNMUZtcDI2MzlQb2lBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiJvVGxLbkpwL0Q4L0NINEUxSkZBQVF3MzRBdnJLRDduSXM2bHcyZnBXN2tRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ2b3pXMWZxbVFkeTZXQmFjakIzV2FRIiwicGhvbmVJZCI6IjVmMDQyNDFiLWRlMDEtNGM2ZS04ZjhjLTgzZWRhZjllODE4YyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrMURwZkZZbEkzQitKcHo5UWhiSmVSa0dIT3M9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidVNrRGh1QnJSelhCNkxvblRZUVBwQjJFYXFJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkROUkRaRDNIIiwibWUiOnsiaWQiOiIyNzczNjI2Nzc2ODo1N0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSnIrd3JzRkVLQysvTDRHR0FRZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTk45d2RSNFA1MFcrNmpuM3pnVHlOWUtsRHhhQnh2M2VPMllxNVNRc2ZSUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWkNaaUYvWW1MMGRBeEh6aGdKc1V6ZHVxa0UzaEJyWUVxV2ROUFRqSjBLbm9wNUdyb3RKbzFGbHZaL09ZUXFPcDFVOFF2VWUwR01ERTlTNFJBby85RFE9PSIsImRldmljZVNpZ25hdHVyZSI6IklZOSttZGp3S2tnbTdCNXlVelhuVkNjUEk0MHpNYkNUdk01NlgzVUp2eWFxeWxtSCtxRGx0VHJUQjNYSWtMdjhKOTNHWGpRSldldnFZd2xiVG4zRmdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3MzYyNjc3Njg6NTdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVFRmY0hVZUQrZEZ2dW81OTg0RThqV0NwUThXZ2NiOTNqdG1LdVVrTEgwVSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MjY3NTc1OX0=',
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

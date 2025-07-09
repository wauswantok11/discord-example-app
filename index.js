import { Client, GatewayIntentBits } from 'discord.js';
import ApiOneID from './service/one-id.js';

import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const accMatch = message.content.match(/^acc-(.+)$/);
    const tokenMatch = message.content.match(/^token-(.+)$/);
    const emailMatch = message.content.match(/^email-(.+)$/);
    const mobileMatch = message.content.match(/^mobile-(.+)$/);
    const getUsernameMatch = message.content.match(/^get-username-(.+)$/);
    if (accMatch) {
        const account = accMatch[1];
        try {
            const response = await ApiOneID.searchAccountByUsername(account);
            const user = response.data;
            const userInfo = [
                `id: ${user.id}`,
                `first_name_th: ${user.first_name_th}`,
                `middle_name_th: ${user.middle_name_th}`,
                `last_name_th: ${user.last_name_th}`,
                `first_name_eng: ${user.first_name_eng}`,
                `middle_name_eng: ${user.middle_name_eng}`,
                `last_name_eng: ${user.last_name_eng}`,
                `special_title_name_th: ${user.special_title_name_th}`,
                `special_title_name_eng: ${user.special_title_name_eng}`,
                `account_title_th: ${user.account_title_th}`,
                `account_title_eng: ${user.account_title_eng}`,
                `id_card_type: ${user.id_card_type}`,
                `id_card_num: ${user.id_card_num}`,
                `hash_id_card_num: ${user.hash_id_card_num}`,
                `account_category: ${user.account_category}`,
                `account_sub_category: ${user.account_sub_category}`,
                `thai_email: ${user.thai_email}`,
                `thai_email2: ${user.thai_email2}`,
                `thai_email3: ${user.thai_email3}`,
                `status_cd: ${user.status_cd}`,
                `birth_date: ${user.birth_date}`,
                `status_dt: ${user.status_dt}`,
                `register_dt: ${user.register_dt}`,
                `address_id: ${user.address_id}`,
                `created_at: ${user.created_at}`,
                `created_by: ${user.created_by}`,
                `updated_at: ${user.updated_at}`,
                `updated_by: ${user.updated_by}`,
                `reason: ${user.reason}`,
                `tel_no: ${user.tel_no}`,
                `name_on_document_th: ${user.name_on_document_th}`,
                `name_on_document_eng: ${user.name_on_document_eng}`,
                `blockchain_flg: ${user.blockchain_flg}`,
                `nickname_th: ${user.nickname_th}`,
                `nickname_eng: ${user.nickname_eng}`,
                `full_id_card_num: ${user.full_id_card_num}`
            ].join('\n');
            message.reply(userInfo);
        } catch (err) {
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (tokenMatch) {
        const token = tokenMatch[1];
        try {
            const response = await ApiOneID.GetTokenOneID(token);
            message.reply(`จะดึงข้อมูล token สำหรับ: ${token}`);
            message.reply(`access token : \n ${JSON.stringify(response.data.access_token)}`);
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }

    } else if (emailMatch) {
        const email = emailMatch[1];
        try {
            const response = await ApiOneID.searchAccountByEmail(email);
            const user = response.data;
            const userInfo = [
                `id: ${user.id}`,
                `first_name_th: ${user.first_name_th}`,
                `middle_name_th: ${user.middle_name_th}`,
                `last_name_th: ${user.last_name_th}`,
                `first_name_eng: ${user.first_name_eng}`,
                `middle_name_eng: ${user.middle_name_eng}`,
                `last_name_eng: ${user.last_name_eng}`,
                `special_title_name_th: ${user.special_title_name_th}`,
                `special_title_name_eng: ${user.special_title_name_eng}`,
                `account_title_th: ${user.account_title_th}`,
                `account_title_eng: ${user.account_title_eng}`,
                `id_card_type: ${user.id_card_type}`,
                `id_card_num: ${user.id_card_num}`,
                `hash_id_card_num: ${user.hash_id_card_num}`,
                `account_category: ${user.account_category}`,
                `account_sub_category: ${user.account_sub_category}`,
                `thai_email: ${user.thai_email}`,
                `thai_email2: ${user.thai_email2}`,
                `thai_email3: ${user.thai_email3}`,
                `status_cd: ${user.status_cd}`,
                `birth_date: ${user.birth_date}`,
                `status_dt: ${user.status_dt}`,
                `register_dt: ${user.register_dt}`,
                `address_id: ${user.address_id}`,
                `created_at: ${user.created_at}`,
                `created_by: ${user.created_by}`,
                `updated_at: ${user.updated_at}`,
                `updated_by: ${user.updated_by}`,
                `reason: ${user.reason}`,
                `tel_no: ${user.tel_no}`,
                `name_on_document_th: ${user.name_on_document_th}`,
                `name_on_document_eng: ${user.name_on_document_eng}`,
                `blockchain_flg: ${user.blockchain_flg}`,
                `nickname_th: ${user.nickname_th}`,
                `nickname_eng: ${user.nickname_eng}`,
                `full_id_card_num: ${user.full_id_card_num}`
            ].join('\n');

            message.reply(userInfo);
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (mobileMatch) {
        const accountID = mobileMatch[1];
        try {
            const response = await ApiOneID.searchAccountByMobileNo(accountID);
            for (let index = 0; index < response.data.list_accounts.length; index++) {
                const account_id = list_accounts[index].account_id;
                const mobile_login_flg = list_accounts[index].mobile_login_flg;
                message.reply(`account id : \n ${account_id}`);
                message.reply(`mobile login flg: \n ${mobile_login_flg}`);
            }

        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (getUsernameMatch) {
        const accountID = getUsernameMatch[1];
        try {
            const response = await ApiOneID.getUsernameMatch(accountID);
            const username = response.data.username
            message.reply(`Account ID : \n ${accountID}`);
            message.reply(`Username: \n ${username}`);
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
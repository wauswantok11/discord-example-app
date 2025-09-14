import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';
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
let Zone = 'uat';

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    // สร้าง Embed ต้อนรับ
    const helpEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle('✅ บอทออนไลน์แล้ว!')
        .setDescription("หากต้องการคู่มือการใช้งาน พิมพ์คำสั่ง `/help` หรือดูรายละเอียดด้านล่างนี้")
        .addFields(
            { name: '𝟭 เปลี่ยนโซน', value: '/uat — เปลี่ยนเป็นโซน UAT\n/prd — เปลี่ยนเป็นโซน Production' },
            { name: '𝟮 ค้นหาด้วยชื่อผู้ใช้', value: '`acc-<username>`\nตัวอย่าง: `acc-johndoe`' },
            { name: '𝟯 ค้นหาด้วยโทเคน', value: '`token-<account_id>`\nตัวอย่าง: `token-2708297814456371`' },
            { name: '𝟰 ค้นหาด้วยอีเมล', value: '`email-<email>`\nตัวอย่าง: `email-john@example.com`' },
            { name: '𝟱 ค้นหาด้วยเบอร์มือถือ', value: '`mobile-<mobile_number>`\nตัวอย่าง: `mobile-0812345678`' },
            { name: '𝟲 ค้นหา Username ด้วย Account ID', value: '`get-username-<account_id>`\nตัวอย่าง: `get-username-2708297814456371`' }
        )
        .setFooter({ text: 'Discord Bot Help' });
    // ส่ง Embed ไปยัง channel แรกที่เจอ
    const guilds = client.guilds.cache;
    for (const [guildId, guild] of guilds) {
        const channels = await guild.channels.fetch();
        const textChannel = channels.find(c => c.isTextBased && c.isTextBased());
        if (textChannel) {
            textChannel.send({ embeds: [helpEmbed] });
            break;
        }
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }
    if (interaction.commandName === 'uat') {
        await interaction.reply('get data by zone uat !');
        Zone = "uat";
    }
    if (interaction.commandName === 'prd') {
        await interaction.reply('get data by zone prd !');
        Zone = "prd";
    } 
    if (interaction.commandName === 'check-zone') {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x2ecc40)
            .setTitle('🌐 ตรวจสอบโซนปัจจุบัน')
            .setDescription(`ขณะนี้บอทกำลังเชื่อมต่อกับโซน: **${Zone.toUpperCase()}**`)
            .setFooter({ text: 'เปลี่ยนโซนได้ด้วย /uat หรือ /prd' });
        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
        Zone = "prd";
    }
    if (interaction.commandName === 'help') {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('📝 วิธีใช้งานบอท Discord')
            .setDescription('☞ หมายเหตุ: ส่งคำสั่งเป็นข้อความในห้อง Discord ที่บอทอยู่ บอทจะตอบกลับข้อมูลหรือแจ้งข้อผิดพลาดหากเกิดปัญหา')
            .addFields(
                { name: '𝟭 เปลี่ยนโซน', value: '/uat — เปลี่ยนเป็นโซน UAT\n/prd — เปลี่ยนเป็นโซน Production' },
                { name: '𝟮 ค้นหาด้วยชื่อผู้ใช้', value: '`acc-<username>`\nตัวอย่าง: `acc-johndoe`' },
                { name: '𝟯 ค้นหาด้วยโทเคน', value: '`token-<account_id>`\nตัวอย่าง: `token-2708297814456371`' },
                { name: '𝟰 ค้นหาด้วยอีเมล', value: '`email-<email>`\nตัวอย่าง: `email-john@example.com`' },
                { name: '𝟱 ค้นหาด้วยเบอร์มือถือ', value: '`mobile-<mobile_number>`\nตัวอย่าง: `mobile-0812345678`' },
                { name: '𝟲 ค้นหา Username ด้วย Account ID', value: '`get-username-<account_id>`\nตัวอย่าง: `get-username-2708297814456371`' }
            )
            .setFooter({ text: 'Discord Bot Help' });

        await interaction.reply({ embeds: [helpEmbed], ephemeral: true });
    }
});

function createUserInfoString(user) {
    const fields = [
        'id', 'first_name_th', 'middle_name_th', 'last_name_th', 'first_name_eng', 'middle_name_eng', 'last_name_eng',
        'special_title_name_th', 'special_title_name_eng', 'account_title_th', 'account_title_eng', 'id_card_type',
        'id_card_num', 'hash_id_card_num', 'account_category', 'account_sub_category', 'thai_email', 'thai_email2',
        'thai_email3', 'status_cd', 'birth_date', 'status_dt', 'register_dt', 'address_id', 'created_at', 'created_by',
        'updated_at', 'updated_by', 'reason', 'tel_no', 'name_on_document_th', 'name_on_document_eng', 'blockchain_flg',
        'nickname_th', 'nickname_eng', 'full_id_card_num'
    ];

    return fields.map(field => `${field}: ${user[field]}`).join('\n');
}

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    const accMatch = message.content.match(/^acc-(.+)$/);
    const tokenMatch = message.content.match(/^token-(.+)$/);
    const emailMatch = message.content.match(/^email-(.+)$/);
    const mobileMatch = message.content.match(/^mobile-(.+)$/);
    const getUsernameMatch = message.content.match(/^get-username-(.+)$/);
    const IalUser = message.content.match(/^ial-(.+)$/);

    if (accMatch) {
        const account = accMatch[1];
        try {
            const response = await ApiOneID.searchAccountByUsername(Zone, account);
            message.reply(createUserInfoString(response.data));
        } catch (err) {
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (tokenMatch) {
        const token = tokenMatch[1];
        try {
            const response = await ApiOneID.GetTokenOneID(Zone, token);
            message.reply(`จะดึงข้อมูล token สำหรับ: ${token}`);
            message.reply(`access token : \n ${JSON.stringify(response.access_token)}`);
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }

    } else if (emailMatch) {
        const email = emailMatch[1];
        try {
            const response = await ApiOneID.searchAccountByEmail(Zone, email);
            message.reply("กรุณารอสักครู่ กำลังดึงข้อมูล...");
            message.reply(createUserInfoString(response.data));
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (mobileMatch) {
        const accountID = mobileMatch[1];
        try {
            const response = await ApiOneID.searchAccountByMobileNo(Zone, accountID);
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
            const response = await ApiOneID.GetAccountIdByUsername(Zone, accountID);
            const username = response.data.username
            message.reply(`Account ID : \n ${accountID}`);
            message.reply(`Username: \n ${username}`);
        } catch (err) {
            console.log('err', err)
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    } else if (IalUser) {
        const accountID = IalUser[1]
        try {
            const response = await ApiOneID.getIalUser(Zone, accountID);
            const data = response.data;
            const ialProfile = [
                `IAL Level: ${data.ial_level}`,
                `LOA Level: ${data.loa_level}`,
                `Email: ${data.email}`,
                `Email Confirmed: ${data.email_confirm_dt}`,
                `Mobile: ${data.mobile_no}`,
                `Mobile Confirmed: ${data.mobile_confirm_dt}`,
                `ID Card: ${data.id_card_num}`,
                `Meeting Date: ${data.MeetingDate}`,
                `Meeting Status: ${data.MeetingStat}`,
                `eKYC: ${data.ekyc} (${data.ekyc_status}, Expire: ${data.ekyc_expire_dt})`,
                `Dipchip: ${data.dipchip}`,
                `CA: ${data.ca} (${data.ca_status}, Expire: ${data.ca_expire_dt})`,
                `Cert No: ${data.cert_no}`
            ].join('\n');
            message.reply(ialProfile);
        } catch (err) {
            message.reply(`เกิดข้อผิดพลาด: ${err.message}`);
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
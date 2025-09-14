import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  new SlashCommandBuilder()
    .setName('uat')
    .setDescription('Switch to UAT environment'),
  new SlashCommandBuilder()
    .setName('prd')
    .setDescription('Switch to Production environment'),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('คำแนะนำการใช้งานบอท'),
  new SlashCommandBuilder()
    .setName('check-zone')
    .setDescription('Check to Zone environment'),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (slash) commands.');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log('Successfully reloaded application (slash) commands.');
  } catch (error) {
    console.error(error);
  }
})();

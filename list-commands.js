import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    const commands = await rest.get(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID)
    );
    console.log('Current Guild Commands:', commands);
  } catch (error) {
    console.error(error);
  }
})();
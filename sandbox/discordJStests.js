const {SlashCommandBuilder} = require("discord.js");
const data = new SlashCommandBuilder().setName('request_quests').setDescription('Shows quests that an adventurer can accept.');

console.log(data);
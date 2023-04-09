/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')
const AWS = require('aws-sdk');
const {SlashCommandBuilder} = require("discord.js");
const options = ['quest_id', 'skill_check_value'];

exports.data = new SlashCommandBuilder().setName('request_guild_training')
    .setDescription("Check this week's guild training.")
    .addIntegerOption(option =>
        option.setName(options[0])
            .setDescription('The quest ID you want to accept.')
            .setRequired(true)
    )

const action = async (body) => {
    // May do something here with body
    // Body contains Discord command details
    let response = {
        "content": "Hello! How may I help you?"
    }
    return response
}

exports.handler = (event) => {
    globalHandler(event, action)
}

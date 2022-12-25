/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')
const AWS = require('aws-sdk');
const {SlashCommandBuilder} = require("discord.js");
const ResponseContentBuilder = require("../../utils/responseContentBuilder");
const options = ['quest_id', 'skill_check_value'];

exports.data = new SlashCommandBuilder().setName('accept_quest')
    .setDescription('Accept a quest.')
    .addIntegerOption(option =>
        option.setName(options[0])
            .setDescription('The quest ID you want to accept.')
            .setRequired(true)
    ).addIntegerOption(option =>
        option.setName(options[1])
            .setDescription('The rolled skill check.')
            .setRequired(true)
    );

const action = async (body) => {
    AWS.config.update({region: 'eu-west-1'});
    const questId = body.data.options.find((option) => {
        return option.name === options[0];
    }).value;

    const skillCheckValue = body.data.options.find((option) => {
        return option.name === options[1];
    }).value;

    //FIXME WE SHOULD CHECK FOR THE USER'S RANK
    var params = {
        TableName: 'RANK_C_QUESTS',
        Key: {
            'QUEST_ID': questId
        },
        ProjectionExpression: 'gs_check, gs_text, gs_reward, s_check, s_text, s_reward, f_text, f_reward'
    };

    var data;
    try {
        data = await getQuest(params);
        console.log("Query succeeded:", data);
    }
    catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }

    return { 'content': ResponseContentBuilder.getAcceptQuestResponse(data.Item, skillCheckValue)};
}

function getQuest(params) {
    var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    return new Promise((resolve, reject) => {
        ddb.get(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

exports.handler = (event) => {
    globalHandler(event, action)
}
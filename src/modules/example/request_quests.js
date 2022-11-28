/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')
const AWS = require('aws-sdk');
const RETURNED_QUESTS = 3;
const N_QUESTS = 25;

exports.data = {
    name: 'request_quests',
    type: 1,
    description: 'Shows quests that an adventurer can accept.'
}

const action = async (body) => {
    AWS.config.update({region: 'eu-west-1'});
    const randomQuestIds = [];
    for(let i = 0; i < 3; i++) {
        randomQuestIds.push(Math.random() * N_QUESTS);
    }

    var params = {
        TableName: 'Quests',
        Key: {
            'quest_id': '1'
        },
        ProjectionExpression: 'title'
    };

    var data;
    try {
        data = await getQuest(params);
        console.log("Query succeeded.");
    }
    catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }

    return { 'content': data.Item.title };
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

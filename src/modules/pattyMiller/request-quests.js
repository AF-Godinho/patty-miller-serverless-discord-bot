/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')
const AWS = require('aws-sdk');
const ResponseContentBuilder = require('../../utils/responseContentBuilder.js')
const RETURNED_QUESTS = 3;
const N_QUESTS = 25; //FIXME we should check for the number of quests.

exports.data = {
    name: 'request_quests',
    type: 1,
    description: 'Shows quests that an adventurer can accept.'
}

const action = async (body) => {
    AWS.config.update({region: 'eu-west-1'});
    const allQuestIds = Array.from(Array(N_QUESTS).keys())
    shuffle(allQuestIds);
    const questsToGet = allQuestIds.slice(0, RETURNED_QUESTS);
    console.log(questsToGet);

    const keysObjects = [];
    for (let questId of questsToGet) {
        keysObjects.push({QUEST_ID: questId + 1})
    }

    //FIXME WE SHOULD CHECK FOR THE USER'S RANK
    var params = {
        RequestItems: {
            'RANK_C_QUESTS': {
                Keys: keysObjects,
                ProjectionExpression: 'QUEST_ID, id, title, description, mission_reward, skill_check'
            }
        },
    };

    var data;
    try {
        data = await getQuest(params);
        console.log("Query succeeded:", data);
    }
    catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }

    return { 'content': ResponseContentBuilder.getRequestQuestResponse(data)};
}

function getQuest(params) {
    var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
    return new Promise((resolve, reject) => {
        ddb.batchGet(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function shuffle(array) {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

exports.handler = (event) => {
    globalHandler(event, action)
}

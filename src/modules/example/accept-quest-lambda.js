/**
 * A Lambda function that replies to interaction with static string
 */

const { globalHandler } = require('../handler.js')
const AWS = require('aws-sdk');

exports.data = {
    name: 'accept_quest',
    type: 1,
    description: 'Shows quests that an adventurer can accept.'
}

const action = async (body) => {
    // Create DynamoDB service object.
    const ddb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

    const params = {
        ExpressionAttributeValues: {
            ':s': {N: '2'},
            ':e' : {N: '09'},
            ':topic' : {S: 'PHRASE'}
        },
        KeyConditionExpression: 'Season = :s and Episode > :e',
        ProjectionExpression: 'Episode, Title, Subtitle',
        FilterExpression: 'contains (Subtitle, :topic)',
        TableName: 'Quests'
    };

    let response = {
        "content": "No quests"
    }
    ddb.scan(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
            response = {
                "content": data.Title.S + ' - ' + data.Description.S
            }
        }
    });

    return response
}

exports.handler = (event) => {
    globalHandler(event, action)
}
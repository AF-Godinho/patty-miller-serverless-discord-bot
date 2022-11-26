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
    AWS.config.update({region: 'eu-west-1'});

    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: 'Quests',
        Key: {
            'quest_id': {S: '1'}
        },
        ProjectionExpression: 'title'
    };

    let response = {
        "content": "No quests available"
    };
    // Call DynamoDB to read the item from the table
     ddb.getItem(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.Item);
            response = {
                "content": data.Item.title.S
            }
        }
    });

    return response;
}

exports.handler = (event) => {
    globalHandler(event, action)
}
const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-1'});

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
    TableName: 'RANK_C_QUESTS',
    Key: {
        'QUEST_ID': 1
    },
    ProjectionExpression: 'title'
};

function getQuest(params) {
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

async function syncGetQuest() {
    var data;
    try {
        data = await getQuest(params);
        console.log("Query succeeded.");
    }
    catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }

    console.log(data);
    return data;
}

syncGetQuest();
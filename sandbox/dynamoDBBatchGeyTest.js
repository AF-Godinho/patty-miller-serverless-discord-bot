const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-1'});

var params = {
    RequestItems: {
        'Quests': {
            Keys: [
                {
                    quest_id: '1'
                },
                {
                    quest_id: '2'
                }
            ],
            ProjectionExpression: 'title'
        }
    },
};


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

async function syncGetQuest() {
    var data;
    try {
        data = await getQuest(params);
        console.log("Query succeeded.");
    }
    catch (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    }

    console.log(data.Responses.Quests);
    return data;
}

syncGetQuest();
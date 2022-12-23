const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-1'});

AWS.config.update({region: 'eu-west-1'});
const allQuestIds = Array.from(Array(25).keys())
shuffle(allQuestIds);
console.log(allQuestIds);
const questsToGet = allQuestIds.slice(0, 3);
console.log(questsToGet);

const keysObjects = [];
for (let questId of questsToGet) {
    keysObjects.push({QUEST_ID: questId + 1})
}
console.log(keysObjects);

var params = {
    RequestItems: {
        'RANK_C_QUESTS': {
            Keys: keysObjects,
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

    console.log(data.Responses);
    return data;
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

syncGetQuest();
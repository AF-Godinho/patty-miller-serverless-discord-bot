const AWS = require("aws-sdk");
AWS.config.update({region: 'eu-west-1'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    TableName: 'Quests',
    Key: {
        'quest_id': {S: '1'}
    },
    ProjectionExpression: 'title'
};

// Call DynamoDB to read the item from the table
ddb.getItem(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Item.title.S);
    }
});
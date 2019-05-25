const uuid = require('uuid');
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (yelpData, businessName) => {
    console.log('TableName: ', process.env.DYNAMODB_TABLE);
    const date = new Date();
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            businessName: businessName,
            reviewCount: yelpData.reviewCount,
            rating: yelpData.rating,
            polishedAt: JSON.stringify(date)
        }
    }

    // console.log(params.Item);

    dynamoDb.put(params, err => {
        if(err) { 
            console.error(`Error saving data to DynamoDB: ${JSON.stringify(err)}`);
            return Promise.reject(`Error saving data to DynamoDB: ${JSON.stringify(err)}`);
        } else {
            return Promise.resolve(params.Item);
        }
    })
};
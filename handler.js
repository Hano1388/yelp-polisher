"use strict";
const { getPage, parsePage, saveRatingsToDB } = require("./utils");

module.exports.polish = (event, context, callback) => {
  // 1. fetch yelp page
  getPage(event)
  // 2. parse the page
  .then(page => parsePage(page))
  // 3. save ratings data to our db
  .then(yelpData => saveRatingsToDB(yelpData, event));

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "Go Serverless v1.0! Your function executed successfully!",
      input: event
    })
  };
};

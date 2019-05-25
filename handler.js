"use strict";
const { getPage, parsePage, saveRatingsToDB } = require("./utils");

module.exports.polish = (event, context, callback) => {
  // 1. fetch yelp page
  getPage(event)
  // 2. parse the page
  .then(page => parsePage(page))
  // 3. save ratings data to our db
  .then(yelpData => saveRatingsToDB(yelpData, event))
  .then(() => callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: `Polished ${event}`
    })
  }))
  .catch(err => 
    callback(new Error(`Error polishing ${event}: ${JSON.stringify(err)}`))
  );
};

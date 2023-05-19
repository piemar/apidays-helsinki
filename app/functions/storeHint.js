// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    // Querying a mongodb service:
    return await context.services.get("mongodb-atlas").db("lordofthering").collection("hints").insertOne(
      {
        "timestamp": new Date(Date.now()),
        "email": query.email,
        "location": {
          "type": "Point",
          "coordinates": [
            parseFloat(query.long),
            parseFloat(query.lat)
          ]
        }
      });
  
};

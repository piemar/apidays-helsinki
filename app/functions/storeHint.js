// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    // Querying a mongodb service:
    const hint=await context.services.get("mongodb-atlas").db("lordofthering").collection("hints").insertOne(
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
      return numberOfHintsWithinLocation=await context.services.get("mongodb-atlas").db("lordofthering").collection("hints").aggregate(
        [
          {
            '$match': {
              'location': {
                '$geoWithin': {
                  '$centerSphere': [
                    [
                      173.84765625, -41.2912218071826
                    ], 0.14827455866907469
                  ]
                }
              },
              'email': query.email
            }
          }, {
            '$count': 'numberOfHintsWithinLocation'
          }
        ]);
};

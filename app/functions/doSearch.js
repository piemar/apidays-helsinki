// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {

    if(!query){
      return({"error" : "No search query present"})
    }
    // Querying a mongodb service:
    return context.services.get("mongodb-atlas").db("lordofthering").collection("characters").aggregate(
      [
        {
        $search: {
            "index": "lotr",
            "autocomplete": {
              "path": "name",
              "query": query.search,
              "fuzzy": {
                "maxEdits": 2,
                "prefixLength": 2
              }
            }
          }
        }
      ]);
};
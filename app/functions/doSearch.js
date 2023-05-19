// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {

    if(!query){
      return({"error" : "No search query present"})
    }
    // Querying a mongodb service:
    return context.services.get("mongodb-atlas").db("pokemon").collection("pokemons").aggregate(
        [
            {
              '$search': {
              'index' : "autocomplete",
                'autocomplete': {
                    'query': query.search,
                    'path': "name"
                }
              }
            }
        ]);
};

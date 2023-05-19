# Lord of the Rings MongoDB Atlas Demo

## Prerequistes

* A running Atlas cluster
* An Project API Key that has role Project Owner, for more information see: 
https://www.mongodb.com/docs/atlas/configure-api-access/#create-an-api-key-for-a-project
* Access to the ProjectId which your Atlas Cluster is running

## Install Realm CLI
```
npm install -g mongodb-realm-cli
```
## Create an New App in Atlas App Services
You will need to create an App in Atlas services, here is how you do it using the Realm CLI. You can also do it using the UI.

```
realm-cli apps create -y -n lotr --project="<ATLAS PROJECTID>" --cluster="<YOUR ATLAS CLUSTERNAME>"
```

Example:
```
realm-cli apps create -y -n lord --project="5f49dca27a4f7e35487f7e0c" --cluster="demo-cluster"
```

Once you have created the app you will need to get the app_client_id from the console output from the above command. Update the env.var file with your API keys and Client App Id. Also update the app_id in the app/realm_config.json.

```
ATLAS_PUBLIC_API_KEY=wancyeds
ATLAS_PRIVATE_API_KEY=db235axa-xdyd-3543-b534-19fe60e755ef
ATLAS_PROJECT_ID=5f49dca27a4f7e35487f7e0c
REALM_CLIENT_APP_ID=lotr-clugi
```

#### Get the client_app_id

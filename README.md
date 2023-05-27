# Lord of the Rings MongoDB Atlas Demo
The setup commands and all are tested on MacOS

# Credits
Thanks to Joel Lord @joellord for helping out building out the react application as myself am a total newbie. Thanks to Angelo Reale @angeloreale for the idea of the Ring of power game, to demonstrate MongoDB Atlas capabilities. 



## Prerequistes

* A running Atlas cluster
* An Project API Key that has role Project Owner, for more information see: 
https://www.mongodb.com/docs/atlas/configure-api-access/#create-an-api-key-for-a-project
* Access to the ProjectId which your Atlas Cluster is running
## Create database and load with with data


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

#### Update realm_config.json 
Update app_id field in the app/realm_config.json with the id you got when you created the app.

Update in App.js file and the below field with your app_id. 

```
const atlasAppId='lotr-alugj';
```

### Deploy application to App Services

Run below command in root of repo, it will build the application and deploy it to App Services
```
source env.var
./deploy.sh
```

### Access the application 
You can now access the application from the endpoint described, in hosting/config.json   

Example below:
```
"app_default_domain": "lotr-alugj.mongodbstitch.com"
```


## Clean up anonymous users
When prompted for appId use the atlasAppId you have.
```
realm-cli users delete
```

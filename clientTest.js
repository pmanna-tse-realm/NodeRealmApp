const Realm = require("realm");
const bson = require("bson");

const appId = "testbed-eobcc";
const app = new Realm.App({ id: appId });
const credentials = Realm.Credentials.anonymous();

Realm.App.Sync.setLogLevel(app, "info");

async function run() {
  let user;
  
  try {
    user = await app.logIn(credentials);

    console.log(`Logged in with the user: ${user.id}`);

    const mongoClient = user.mongoClient("mongodb-atlas");
    const mongoCollection = mongoClient.db("testbed").collection("testdata");

    let clientObjects  = await mongoCollection.find({_partition: "Global"});

    if (clientObjects.length > 0) {
        let object = {_id: new bson.ObjectId(), _partition: "Global", longInt: { $numberLong: "999999999"}, mediumInt: { $numberInt: "999999999"}, doubleValue: { $numberDouble: "999999999"}};

        await mongoCollection.insertOne(object);

        console.dir(object);
    } else {
        console.log(`No objects found`);
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Done");
  }
}

run().catch(console.dir);

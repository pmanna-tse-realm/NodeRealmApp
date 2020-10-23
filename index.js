const Realm = require("realm");
const ObjectId = require("bson").ObjectId;
const schema = require("./schema");

const appId = "video-kvyxb";
const app = new Realm.App({ id: appId });
const credentials = Realm.Credentials.anonymous();

Realm.App.Sync.setLogLevel(app, "error");

async function run() {
  let user;
  let realm;
  try {
    user = await app.logIn(credentials);

    console.log(`Logged in with the user: ${user.id}`);

    // Tries to find all objects in the partition, via Realm SDK
    const config = {
      schema: [ schema.MovieDetail_awardsSchema, schema.MovieDetail_imdbSchema,
        schema.MovieDetail_tomatoSchema,schema.MovieDetailSchema ],
      sync: {
        user: user,
        partitionValue: "Global"
      }
    };

    if (process.env.CLEAN_REALM) {
      Realm.deleteFile(config);
    }
    
    realm = await Realm.open(config);

    let allMovies = realm.objects("MovieDetail");

    console.log(`All movies: ${allMovies.length}`);

    // Do exactly the same, but through the RemoteMongoDB functionality
    const mongoClient = user.mongoClient("mongodb-atlas");
    const mongoCollection = mongoClient.db("video").collection("movieDetails");

    let clientMovies  = await mongoCollection.find({_partition: "Global"});

    console.log(`All movies (client): ${clientMovies.length}`);
  } catch (error) {
    console.error(error);
  } finally {
    if (user) {
      user.logOut();
    }
    console.log("Done");
  }
}

run().catch(console.dir);

const Realm = require("realm");
const ObjectId = require("bson").ObjectId;
const schema = require("./schema");

Realm.Sync.setLogLevel("error");

const appId = "video-kvyxb";
const app = new Realm.App({ id: appId });
const credentials = Realm.Credentials.anonymous();

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

    realm = await Realm.open(config);

    let allMovies = realm.objects("MovieDetail");

    console.log(`All movies: ${allMovies.length}`);

    // Do exactly the same, but through the RemoteMongoDB functionality
    const mongoClient = user.remoteMongoClient("mongodb-atlas");
    const mongoCollection = mongoClient.db("video").collection("movieDetails");

    let clientMovies  = await mongoCollection.find({_partition: "Global"});

    console.log(`All movies (client): ${clientMovies.length}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Done");
  }
}

run().catch(console.dir);
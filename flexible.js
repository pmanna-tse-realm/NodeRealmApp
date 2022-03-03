const Realm = require("realm");
const { ObjectId } = require("bson");
const schema = require("./schema");

const appId = "video-kvyxb";
const app = new Realm.App({ id: appId });

function logWithDate(message) {
  let date = new Date();

  console.log(`[${date.toISOString()}] - ${message}`)
}

Realm.App.Sync.setLogLevel(app, "debug");
Realm.App.Sync.setLogger(app, (level, message) => logWithDate(`(${level}) ${message}`));

async function run() {
  let user  = app.currentUser;
  let realm;

  try {
    if (!user) {
      user = await app.logIn(Realm.Credentials.anonymous());
    }

    logWithDate(`Logged in with the user: ${user.id}`);

    // Tries to find all objects in the partition, via Realm SDK
    const config = {
      schema: [ schema.AwardsSchema, schema.IMDBRatingSchema,
        schema.TomatoRatingSchema,schema.MovieDetailSchema ],
      sync: {
        user: user,
        flexible: true
      }
    };

    if (process.env.CLEAN_REALM) {
      Realm.deleteFile(config);
    }
    
    realm = await Realm.open(config);
    let allMovies = realm.objects("MovieDetail");
    
    await realm.subscriptions.update((mutableSubs) => {
      mutableSubs.add(allMovies.filtered('year <= 2000'), {name: 'Oldies'});
      // mutableSubs.add(allMovies.filtered('director >= "Peter"'), {name: 'Directors'});
    });

    await realm.subscriptions.waitForSynchronization();

    logWithDate(`All movies: ${allMovies.length}`);
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      if (realm) {
        realm.close();
      }

      logWithDate("Done");

      process.exit(0);
    }, 2000);
  }
}

run().catch(reason => console.error(reason));

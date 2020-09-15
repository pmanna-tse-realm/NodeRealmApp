// Proper way under MongoDB 4.x
db.movieDetails.renameCollection("oldMovieDetails");

ratingConversionStage = {
    $addFields: {
        "tomato.doubleUserRating": { $convert: { input: "$tomato.userRating", to: "double", onError: undefined, onNull: null } },
        "tomato.doubleRating": { $convert: { input: "$tomato.rating", to: "double", onError: undefined, onNull: null } },
        "imdb.doubleRating": { $convert: { input: "$imdb.rating", to: "double", onError: undefined, onNull: null } }
    }
 };
 
 
 db.oldMovieDetails.aggregate( [
    ratingConversionStage, {$out:"movieDetails"}
 ]);

db.movieDetails.updateMany({"tomato.userRating": {$exists: false}},{"$unset": { "tomato": 1}});
db.movieDetails.updateMany({},{"$unset": { "tomato.rating": 1, "tomato.userRating": 1, "imdb.rating": 1}});
db.movieDetails.updateMany({},{"$rename": { "tomato.doubleRating":"tomato.rating", "tomato.doubleUserRating":"tomato.userRating", "imdb.doubleRating": "imdb.rating"}});

db.oldMovieDetails.drop();

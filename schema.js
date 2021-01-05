const TomatoRatingSchema = {
  name: 'TomatoRating',
  embedded: true,
  properties: {
    consensus: 'string?',
    fresh: 'int?',
    image: 'string?',
    meter: 'int?',
    rating: 'double?',
    reviews: 'int?',
    userMeter: 'int?',
    userRating: 'double?',
    userReviews: 'int?',
  },
};

const IMDBRatingSchema = {
  name: 'IMDBRating',
  embedded: true,
  properties: {
    id: 'string?',
    rating: 'double?',
    votes: 'int?',
  },
};

const AwardsSchema = {
  name: 'Awards',
  embedded: true,
  properties: {
    nominations: 'int?',
    text: 'string?',
    wins: 'int?',
  },
};

const MovieDetailSchema = {
  name: 'MovieDetail',
  properties: {
    _id: 'objectId?',
    _partition: 'string?',
    actors: 'string[]',
    awards: 'Awards',
    countries: 'string[]',
    director: 'string?',
    genres: 'string[]',
    imdb: 'IMDBRating',
    metacritic: 'int?',
    plot: 'string?',
    poster: 'string?',
    rated: 'string?',
    runtime: 'int?',
    title: 'string?',
    tomato: 'TomatoRating',
    type: 'string?',
    writers: 'string[]',
    year: 'int?',
  },
  primaryKey: '_id',
};

exports.TomatoRatingSchema = TomatoRatingSchema;
exports.IMDBRatingSchema = IMDBRatingSchema;
exports.AwardsSchema = AwardsSchema;
exports.MovieDetailSchema = MovieDetailSchema;

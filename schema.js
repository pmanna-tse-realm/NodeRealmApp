const MovieDetail_tomatoSchema = {
  name: 'MovieDetail_tomato',
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

const MovieDetail_imdbSchema = {
  name: 'MovieDetail_imdb',
  embedded: true,
  properties: {
    id: 'string?',
    rating: 'double?',
    votes: 'int?',
  },
};

const MovieDetail_awardsSchema = {
  name: 'MovieDetail_awards',
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
    awards: 'MovieDetail_awards',
    countries: 'string[]',
    director: 'string?',
    genres: 'string[]',
    imdb: 'MovieDetail_imdb',
    metacritic: 'int?',
    plot: 'string?',
    poster: 'string?',
    rated: 'string?',
    runtime: 'int?',
    title: 'string?',
    tomato: 'MovieDetail_tomato',
    type: 'string?',
    writers: 'string[]',
    year: 'int?',
  },
  primaryKey: '_id',
};

exports.MovieDetail_tomatoSchema = MovieDetail_tomatoSchema;
exports.MovieDetail_imdbSchema = MovieDetail_imdbSchema;
exports.MovieDetail_awardsSchema = MovieDetail_awardsSchema;
exports.MovieDetailSchema = MovieDetailSchema;

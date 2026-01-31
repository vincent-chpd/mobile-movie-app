export const TMDB_CONFIG ={
  BASE_URL:"https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers:{
    accept: "application.json",
    authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
}

export const fetchMovies = async({ query }: { query:string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/discover/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}discover/movie?sort_by=popularity.desc`

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers
  })

  if(!response) {
    //@ts-ignore
    throw new Error('Failed to fetch movies', response.statusText)
  }

  const data = await response.json()

  return data.results
}






// const url = 'https://api.themoviedb.org/3/keyword/test/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWJlMGE1ZDQ1NzgxYTU4YTVmZjc5Y2ExMDM5NjE1ZiIsIm5iZiI6MTY4ODQxMzM5Ni4xNTUsInN1YiI6IjY0YTMyNGQ0ZDQwMGYzMDBjYWFjMmJhOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8aO0jeNenEJOTASZ-BKudpdWhgOV-I1elBiycdAdyKQ'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));

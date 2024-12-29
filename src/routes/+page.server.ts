import secrets from '$lib/secrets.json';

export const load = async () => {
  const games = await fetch("https://api.igdb.com/v4/games",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
    },
    body: "fields *;"
  });
  const data = await games.json();

  const genres = await fetch("https://api.igdb.com/v4/genres",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
    },
    body: "fields *; limit 50;"
  });
  const genresdata = await genres.json();

  return {games: data, genres: genresdata};


}
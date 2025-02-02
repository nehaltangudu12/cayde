import secrets from '../../secrets.json'

export const load = async () => {

  const popularGames = await fetch("https://api.igdb.com/v4/popularity_primitives",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: "fields game_id; sort value desc; limit 20; where popularity_type = 1;"
  });
  const popData = await popularGames.json();
  let ids = popData.map((game: any) => game.game_id);

  const games = await fetch("https://api.igdb.com/v4/games",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: "fields *; sort rating desc; where id = (" + ids.join(",") + ") & category = (0,8,9);"
  });
  const data = await games.json();

  const genres = await fetch("https://api.igdb.com/v4/genres",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: "fields *; limit 50;"
  });
  const genresdata = await genres.json();
  
  let coversneeded = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].cover) {
      coversneeded.push(data[i].cover);
    }
  }
  const covers = await fetch("https://api.igdb.com/v4/covers",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: "fields *; limit 50; where id = (" + coversneeded.join(",") + ");"
  });

  const coversdata = await covers.json();

  return {games: data, genres: genresdata, covers: coversdata};


}
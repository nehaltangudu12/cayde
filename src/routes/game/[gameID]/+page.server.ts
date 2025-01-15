import type { PageServerLoad } from './$types';
import secrets from '$lib/secrets.json';
import { createClient } from '@supabase/supabase-js';


export const load = (async ({ params }) => {

  const supabase = createClient(secrets.supabaseUrl, secrets.supabaseKey);
  const { data: guide, error } = await supabase
    .from('Guides')
    .select()
    .eq('game', params.gameID)
  if (error) {
    console.log(error);
  }
  // console.log(params.gameID);
  // console.log(guide);
  const { gameID } = params;
  const games = await fetch("https://api.igdb.com/v4/games",
  {
      method: "POST",
      headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
      },
      body: `fields *; where id = ${gameID};`
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

  const platforms = await fetch("https://api.igdb.com/v4/platforms",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: "fields *; limit 500;"
  });
  const platformdata = await platforms.json();

  const cover = await fetch("https://api.igdb.com/v4/covers",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: `fields *; where game = ${gameID};`
  });
  
  const coverdata = await cover.json();

  const website = await fetch("https://api.igdb.com/v4/websites",
  {
    method: "POST",
    headers: {
      "Client-ID": secrets.clientID,
      "Authorization": `Bearer ${secrets.access_token}`,
      "cache-control": "max-age=86400"
    },
    body: `fields *; where game = ${gameID};`
  });
  const websitedata = await website.json();
  return {game: data[0], genres: genresdata, platforms: platformdata, cover: coverdata[0], guides: guide, websites: websitedata};

}) satisfies PageServerLoad;
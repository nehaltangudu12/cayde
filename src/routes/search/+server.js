import { json } from '@sveltejs/kit';
import secrets from '../../../secrets.json';

export async function GET({ url }) {
  const params = url.searchParams;
	
  const searchTerm = params.get('searchTerm');
  const searchedGame = await fetch(`https://api.igdb.com/v4/games`, {
      method: 'POST',
      headers: {
        'Client-ID': secrets.clientID,
        'Authorization': `Bearer ${secrets.access_token}`,
      },
      body: "fields name,id,genres,cover; limit 50; search \"" + searchTerm + "\";"
    });
  
  const data = await searchedGame.json();
  
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
    
	return json({data : data, covers: await covers.json()});
}

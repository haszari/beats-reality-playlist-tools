import { readFile, writeFile } from 'node:fs/promises';
import { XMLParser } from 'fast-xml-parser';
import YAML from 'yaml'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

//--------------------------------------------------------------------------------------------------
// Handle command line arguments.
if (process.argv.length < 3) {
  console.error('Usage: npm run import -- <traktor-nml-history-file>');
  process.exit(1);
}
const traktorNmlFilePath = process.argv[2];

//--------------------------------------------------------------------------------------------------
// Library / utility code (to be moved to module later).

async function getSpotifyAuthToken() {
  let token = null;

  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;


  if (!client_id || !client_secret) {
    return null;
  }

  const params = new URLSearchParams({
    // Client credentials means we can only call "read only" / non user data APIs.
    grant_type: 'client_credentials'
  });
  try {
    const auth = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        }
      }
    )
    token = auth.data.access_token;
  }
  catch(error) {
    console.log( 'Error getting Spotify API token: ' + error );
  }

  return token;
}

async function searchSpotifyMetadata({ artists, title, spotifyToken }) {
  let query = `track:${ title }`;
  artists.forEach(artist => {
    query += ` artist:${ artist }`;
  });

  const results = await axios.get(
    'https://api.spotify.com/v1/search',
    {
      params: {
        q: query,
        type: 'track',
      },
      headers: {
        'Authorization': 'Bearer ' + spotifyToken
      }
    }

  );

  const trackDetails = results?.data?.tracks?.items[0];

  const coverArtUrl = trackDetails?.album?.images[0]?.url;

  return { trackDetails, coverArtUrl };
}

//--------------------------------------------------------------------------------------------------
// Main script - import an nml Traktor history file and convert it to a structured yaml.

const [spotifyToken, fileData]  = await Promise.all([
  getSpotifyAuthToken(),
  readFile(traktorNmlFilePath),
]);

const parserOptions = {
  ignoreAttributes: false,
  attributeNamePrefix: '@.',
};
const parser = new XMLParser(parserOptions);
let nmlData = parser.parse(fileData);

const showDate = new Date().toDateString();
const ymlData = {
  'date': showDate,
  genres: [],
  'tracks': []
};

// Extract the relevant song metadata for each track from nml.
nmlData?.NML?.COLLECTION?.ENTRY.forEach(element => {
  const tune = {
    title: element['@.TITLE'],
    artists: element['@.ARTIST'].split(/,\s*/),
    duration: element['@.ARTIST'],
  };

  tune.cat_no = element?.INFO['@.CATALOG_NO'];
  tune.genres = element?.INFO['@.GENRE'];
  tune.mix_version = element?.INFO['@.MIX'];
  tune.label = element?.INFO['@.LABEL'];

  ymlData.genres.push(tune.genres);

  tune.remixer = element?.INFO['@.REMIXER'];
  if (tune.remixer) {
    tune.artists.push(tune.remixer);
  }

  tune.tempo_raw = element?.TEMPO['@.BPM'];
  tune.tempo = Math.round(tune.tempo_raw);

  const seconds = element?.INFO['@.PLAYTIME_FLOAT'];
  if (seconds) {
    const formatter = new Date(0);
    formatter.setSeconds(seconds);
    const secondsString = formatter.getUTCSeconds().toString().padStart(2, '0')
    tune.duration = `${formatter.getUTCMinutes()}:${secondsString}`;
  }

  ymlData.tracks.push(tune);
});

// Async lookup of each track, adding file metadata from Spotify.
if (spotifyToken) {
  for await (const tune of ymlData.tracks) {
    const spotifyDataPromise = searchSpotifyMetadata({
      spotifyToken,
      artists: tune.artists,
      title: tune.title,
    });

    const { trackDetails, coverArtUrl } = await spotifyDataPromise;

    tune.spotify = {
      trackDetails,
      coverArtUrl,
    };
  }
}

// Uniquify genres.
ymlData.genres = ymlData.genres.filter((value, index, array) => array.indexOf(value) === index);

// Write output.
const ymlString = YAML.stringify(ymlData);

const outputFile = `Beats Reality ${showDate}.yml`;
await writeFile(outputFile, ymlString);

console.log(`Wrote ${ymlData.tracks.length} tracks to '${outputFile}'`);
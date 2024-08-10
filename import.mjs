import { readFile, writeFile } from 'node:fs/promises';
import { XMLParser } from 'fast-xml-parser';
import YAML from 'yaml'

if (process.argv.length < 3) {
  console.error('Usage: npm run import -- <traktor-nml-history-file>');
  process.exit(1);
}

const filePath = process.argv[2];

const fileData = await readFile(filePath);

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

// Uniquify genres.
ymlData.genres = ymlData.genres.filter((value, index, array) => array.indexOf(value) === index);

// Write output.
const ymlString = YAML.stringify(ymlData);

const outputFile = `Beats Reality ${showDate}.yml`;
await writeFile(outputFile, ymlString);

console.log(`Wrote ${ymlData.tracks.length} tracks to '${outputFile}'`);
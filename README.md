Deprecated – this script has moved to https://github.com/haszari/cbr-coverart-netlify

# beats-reality-playlist-tools
Tools for automating playlists, radio show metadata and content.

## Convert a Traktor Pro history nml (xml) file to a yml playlist file

Example: `npm run import -- ./testdata/history_2024y08m08d_20h26m54s.nml`

Generates a file with date, e.g. `Beats Reality Sat Aug 10 2024.yml`. The idea is to use this file to generate html/rich text tracklists, and cover art images.

```yml
date: Sat Aug 10 2024
genres:
  - Deep House
  - Melodic House & Techno
  - Minimal / Deep Tech
  - Amapiano
tracks:
  - title: I Love You So
    artists:
      - Sugar Hill
    duration: 5:10
    cat_no: TRANSA613
    genres: Deep House
    mix_version: (Extended mix)
    label: TRANSA RECORDS
    tempo_raw: "124.000206"
    tempo: 124
  - title: Happier (feat. Clementine Douglas)
    artists:
      - The Blessed Madonna
      - Clementine Douglas
    duration: 4:50
    cat_no: "5054197941146"
    genres: Deep House
    mix_version: Extended
    label: Warner Records
    tempo_raw: "126.000053"
    tempo: 126
  - title: Get Together
    artists:
      - Dilby
    duration: 7:46
    cat_no: DPLM178
    genres: Deep House
    mix_version: Extended Mix
    label: Deepalma
    tempo_raw: "124.999611"
    tempo: 125
  - title: That's Right
    artists:
      - Dam Swindle
    duration: 7:04
    cat_no: HEIST077D
    genres: Deep House
    mix_version: Original Mix
    label: Heist Recordings
    tempo_raw: "120.000053"
    tempo: 120
  - title: Inside My Mind
    artists:
      - Deeplomatik
      - Dilby
    duration: 6:18
    cat_no: SLM040
    genres: Deep House
    mix_version: Dilby Remix
    label: Sublease Music
    remixer: Dilby
    tempo_raw: "123.999817"
    tempo: 124
  - title: My Love
    artists:
      - Route 94
      - Jess Glynne
    duration: 4:19
    cat_no: "800071006402"
    genres: Deep House
    mix_version: Original Mix
    label: Rinse
    tempo_raw: "119.999451"
    tempo: 120
  - title: Location
    artists:
      - Crew Deep
      - T.Markakis
    duration: 6:50
    cat_no: IRECEPIREC1200D1TRSPDBP
    genres: Deep House
    mix_version: T.Markakis Remix Extended
    label: I Records
    remixer: T.Markakis
    tempo_raw: "121.998962"
    tempo: 122
  - title: Desire
    artists:
      - Chris Stussy
    duration: 6:14
    cat_no: CSS-001B
    genres: Deep House
    mix_version: Extended
    label: CSS
    tempo_raw: "133.999893"
    tempo: 134
  - title: No Eyes Feat. Jaw
    artists:
      - Claptone
    duration: 6:58
    cat_no: EXPDIGITAL28
    genres: Deep House
    mix_version: Original Mix
    label: Exploited
    tempo_raw: "119.997185"
    tempo: 120
  - title: Native Riddim
    artists:
      - Coeo
    duration: 6:26
    cat_no: TOYT165
    genres: Deep House
    mix_version: Original Mix
    label: Toy Tonics
    tempo_raw: "120.000046"
    tempo: 120
  - title: Pushing On
    artists:
      - Oliver Dollar
      - Jimi Jules
    duration: 6:57
    cat_no: DFTD429D1
    genres: Deep House
    mix_version: Original Mix
    label: Defected
    tempo_raw: "122.000130"
    tempo: 122
  - title: Forces
    artists:
      - Mihai Popoviciu
    duration: 7:45
    cat_no: BONDEXTRA018
    genres: Deep House
    mix_version: Original Mix
    label: Bondage Music
    tempo_raw: "125.999855"
    tempo: 126
  - title: Astra
    artists:
      - Sasha
      - Super Flu
    duration: 7:45
    cat_no: LNOE155
    genres: Melodic House & Techno
    mix_version: Sasha's Daydream Mix
    label: Last Night On Earth
    tempo_raw: "123.999924"
    tempo: 124
  - title: Moonlight
    artists:
      - Mandragora
      - Beltran (BR)
    duration: 5:37
    cat_no: RNY039
    genres: Minimal / Deep Tech
    mix_version: Original Mix
    label: Revival New York
    tempo_raw: "127.000031"
    tempo: 127
  - title: Transverb
    artists:
      - Lovebirds
    duration: 7:58
    cat_no: KDR022
    genres: Deep House
    mix_version: Original Mix
    label: Knee Deep Recordings
    tempo_raw: "124.999977"
    tempo: 125
  - title: African Technology
    artists:
      - Hagan
      - Mxshi Mo
    duration: 5:42
    cat_no: MTRLP004
    genres: Amapiano
    mix_version: Original Mix
    label: More Time Records
    tempo_raw: "125.999763"
    tempo: 126
```

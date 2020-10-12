<h1 align="center">Welcome to npm.js ðŸ‘‹</h1>
<p align="center">
  <img src="https://img.shields.io/npm/v/@freezegold/anime.js?orange=blue" />
  <a href="https://www.npmjs.com/package/@freezegold/anime.js">
    <img alt="downloads" src="https://img.shields.io/npm/dm/@freezegold/anime.js.svg?color=blue" target="_blank" />
  </a>
  <a href="https://github.com/freezegr/insta.js/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-yellow.svg" target="_blank" />
  </a>
  <a href="https://github.com/freezegr/gitmoji-changelog">
    <img src="https://img.shields.io/badge/changelog-gitmoji-brightgreen.svg" alt="gitmoji-changelog">
  </a>
</p>

## Instaletion 

`npm i @freezegole/instagram.js --save`

## example

```js
const anime = require('@freezegold/anime.js');

anime.searchAnime('attack on titan').then(res => {
	console.log(res);
})

anime.searchManga('attack on titan').then(res => {
	console.log(res);
})
```

## Docs

#### anime.searchAnime(anime, page)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| anime     | string        |          | *none*  | The anime you want to search
| page    | number        |    X     | 0       | page for pagination

#### anime.searchManga(manga, page)
| Parameter | Type          | Optional | Default | Description |
|-----------|:-------------:|:--------:|:-------:|-------------|
| manga     | string        |          | *none*  | The manga you want to search
| page    | number        |    X     | 0       | page for pagination
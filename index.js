const fetch = require('node-fetch');
const { Anime } = require('./src/animeSearchClass.js');
const { version } = require('./package.json');
const { Manga } = require('./src/manga.js');
const { honorifics } = require('./src/db.js');
const { honoFunction, meme } = require('./src/util.js');
const puppy = require('random-puppy');
const userAgentTxt = `kitsu.js, a npm module for the kitsu.io API. v${version} (https://github.com/freezegr/anime.js)`

const head = {
	userAgent : userAgentTxt,
	options : {
	  headers: {
		  'User-Agent': userAgentTxt,
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }
}

exports.searchAnime = function(search, page = 0) {
  return new Promise((resolve, reject) => {
    const searchTerm = encodeURIComponent(search);
    return fetch(`https://kitsu.io/api/edge/anime?filter[text]="${searchTerm}"&page[offset]=${page}`, head)
    .then(res => res.json())
    .then(json => resolve(json.data.map(info => new Anime(info))))
    .catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
  })
};

exports.searchManga = function(search, page = 0) {
		return new Promise((resolve, reject) => {
			const searchTerm = encodeURIComponent(search);
			return fetch(`https://kitsu.io/api/edge/manga?filter[text]="${searchTerm}"&page[offset]=${page}`, head)
				.then(res => res.json())
				.then(json => resolve(json.data.map(info => new Manga(info))))
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
  });
};

exports.nameHonorific = function(name, hono = "san"){
  return honoFunction(hono).then(res => {
    return `${name}-${res.hono}`
  })
}

exports.meme = meme;
exports.searchHonorifics = honoFunction; 
exports.honorifics = honorifics;
const fetch = require('node-fetch');
const { Anime } = require('./src/animeSearchClass.js');
const { version } = require('./package.json');
const { Manga } = require('./src/manga.js');
const { honorifics } = require('./src/db.js');
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

exports.searchHonorifics = function(honori){
	function first(txt){
		return honorifics.filter(x=>x.hono == txt)
	}
  function second(txt){
    const alies = honorifics.map(x=>x.aliases)
    const to = alies.map(word => word.includes(txt))
    return to.includes(true)
  }
  function tpt(resolve, reject){
    if(first(honori).length == 0){
      if(second(honori) == true){
        var al = honorifics.map(x=>x.aliases)
        for(let i = 0; i < al.length; i++){
          if(true == al[i].includes(honori)){
            resolve(honorifics.filter(x=>x.aliases == al[i])[0])
          } 
        }
      } else {
        reject('Not found')
      }
    }else {
      resolve(honorifics.filter(x=>x.hono == honori)[0])
    }
  } 
	return new Promise(tpt)
}
/*
if(first(honori).length == 0){
        if(second(honori) == true){
          resolve('yep')
        } else {
          resolve('nop')
        }
      }else {
        resolve(honorifics.filter(x=>x.hono == honori))
      }
*/
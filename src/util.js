const fetch = require('node-fetch');
const { Anime } = require('../src/animeSearchClass.js');
const { version } = require('../package.json');
const { Manga } = require('../src/manga.js');
const { honorifics } = require('../src/db.js');
const puppy = require('random-puppy');
const { nsfw, sfw, nsfwAZ, sfwAZ} = require('./snfw.js');
const nekoURL = 'https://nekos.life/api/v2';
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

module.exports.searchAnime = function(search, maxResult = "max") {
  return new Promise((resolve, reject) => {
  	let page = 0;
    const searchTerm = encodeURIComponent(search);
    return fetch(`https://kitsu.io/api/edge/anime?filter[text]="${searchTerm}"&page[offset]=${page}`, head)
    .then(res => res.json())
    .then(json => {
    	console.log()
      function NotIwannis(data){
			  if(maxResult > json.data.length) maxResult = json.data.length;
			  if(maxResult == "max") maxResult = json.data.length;
			  let roflis = []
			    function paoulo(info){
			  	 return new Anime(info) 
			    }
			  for(let i = 0; i < maxResult; i++){
			   roflis.push(paoulo(json.data[i]))
			  }
			  return roflis
			}
     resolve(NotIwannis())
    })
    .catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
  })
};

module.exports.searchManga = function(search, maxResult = "max") {
		return new Promise((resolve, reject) => {
			const searchTerm = encodeURIComponent(search);
			let page = 0;
			return fetch(`https://kitsu.io/api/edge/manga?filter[text]="${searchTerm}"&page[offset]=${page}`, head)
				.then(res => res.json())
			  .then(json => {
			  	//console.log(json.data.length)
			  	function lel(data){
			  	  if(maxResult > json.data.length) maxResult = json.data.length;
			  	  if(maxResult == "max") maxResult = json.data.length;
			  	  let flipblouk = []
			  	  function gourgourizeiToKefaliMou(info){
			  	   return new Manga(info) 
			  	  }
			  	  for(let i = 0; i < maxResult; i++){
			  	  	flipblouk.push(gourgourizeiToKefaliMou(json.data[i]))
			  	  }
			  	  return flipblouk
			  	}
			  	resolve(lel())
			  })
				.catch(err => reject(new Error(`Couldn't fetch the api: ${err}`)));
  });
};

const honoFunction1 = function(honori){
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

module.exports.nameHonorific = function(name, hono = "san"){
  return honoFunction1(hono).then(res => {
    return `${name}-${res.hono}`
  })
}

module.exports.meme = function(){
  var memesPar = [
    "animemes",
    "MemesOfAnime",
    "animememes",
    "AnimeFunny"
 ]  
  var subreddit = memesPar[Math.floor(Math.random() * memesPar.length)];
  
  function prom(resolve, reject){
    try {
      puppy(subreddit).then(url => {
        resolve(url)
      })
    }catch(err){
      reject(new Error(`Couldn't fetch the api: ${err}`))
    }
  }
  return new Promise(prom)
}


module.exports.nekoNsfw = function(category){
	if(!category) return new Error('No category')
	function exacute(value){
		//console.log(value)
		return fetch(nekoURL+value)
		  .then(result=> result.json())
		  .then(res=> res)
	}
	async function promis(resolve, reject){
    for(let i = 0; i < Object.keys(nsfw[0]).length; i++){
      if(Object.keys(nsfw[0])[i] == category){
      	resolve(await exacute(Object.values(nsfw[0])[i]))
      }else if(i == Object.keys(nsfw[0]).length - 1){
      	reject(`I can't find ${category}`)
      } 
    }
	}
  return new Promise(promis)
}

module.exports.nekoSfw = function(category){
	if(!category) return new Error('No category')
	function exacute(value){
		//console.log(value)
		return fetch(nekoURL+value)
		  .then(result=> result.json())
		  .then(res=> res)
	}
	async function promis(resolve, reject){
    for(let i = 0; i < Object.keys(sfw[0]).length; i++){
      if(Object.keys(sfw[0])[i] == category){
      	resolve(await exacute(Object.values(sfw[0])[i]))
      }else if(i == Object.keys(sfw[0]).length - 1){
      	reject(`I can't find ${category}`)
      } 
    }
	}
  return new Promise(promis)
}


module.exports.nekoWallpaper = function(){
	function promis(resolve, reject){
    try{
		  fetch(nekoURL+sfw[0].wallpaper)
		    .then(result=>result.json())
		    .then(res=>resolve(res))
		}catch(err){
			reject(err)
		}
	}
	return new Promise(promis)
}

module.exports.getWatchList = function(name, status = 'all'){
  function exacute(resolve, reject){
    fetch(`http://myanimelist.net/animelist/${name}/load.json`)
      .then(ress => ress.json())
      .then(res => {
        let animeStatus = {
          profileName: name,
          watching: [],
          completed: [],
          dropped: [],
          planToWatch: []
        }
        for(let i = 0; i < res.length; i++){
        	switch(res[i].status) {
        		case 1:
        		  animeStatus.watching.push(res[i].anime_title)
        		break;
        		case 2:
        		  animeStatus.completed.push(res[i].anime_title)
        		break;
        		case 4:
        		  animeStatus.dropped.push(res[i].anime_title)
        		break;
        		case 6:
        		  animeStatus.planToWatch.push(res[i].anime_title)
        		break;
        	}
        }
      switch(status){
      	case 'all':
      	  resolve(animeStatus)
      	break;
      	case 'watching':
      	  resolve({
      	  	profileName: name,
      	  	watching: animeStatus.watching
      	  })
      	break;
      	case 'completed':
      	  resolve({
      	    profileName: name,
      	    completed: animeStatus.completed
      	   })
      	break;
      	case 'dropped':
      	resolve({
      	  	profileName: name,
      	  	dropped: animeStatus.dropped
      	  })
      	break;
      	case 'planToWatch':
      	  resolve({
      	  	profileName: name,
      	  	planTowatch: animeStatus.planToWatch
      	  })
      	break;
      	default:
      	  reject(`[anime.js]: I don't know this status "${status}"`)
      	break;
      } 
    })
	}
	return new Promise(exacute)
}

module.exports.nsfwAll = nsfwAZ;
module.exports.sfwAll = sfwAZ;
module.exports.honorifics = honorifics;
module.exports.honoFunction = honoFunction1;
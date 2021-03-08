const fetch = require('node-fetch');
const cheerio = require('cheerio');
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
const getAnimeList = function(name, status = 'all'){
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

module.exports.getWatchList = getAnimeList

const getMangaList = function (name, status = 'all'){
  function exacute(resolve, reject){
    fetch(`http://myanimelist.net/mangalist/${name}/load.json`)
      .then(ress => ress.json())
      .then(res => {
        let mangaStatus = {
          profileName: name,
          reading: [],
          completed: [],
          dropped: [],
          planToRead: []
        }
        for(let i = 0; i < res.length; i++){
        	switch(res[i].status) {
        		case 1:
        		  mangaStatus.reading.push(res[i].manga_title)
        		break;
        		case 2:
        		  mangaStatus.completed.push(res[i].manga_title)
        		break;
        		case 4:
        		  mangaStatus.dropped.push(res[i].manga_title)
        		break;
        		case 6:
        		  mangaStatus.planToRead.push(res[i].manga_title)
        		break;
        	}
        }
      switch(status){
      	case 'all':
      	  resolve(mangaStatus)
      	break;
      	case 'watching':
      	  resolve({
      	  	profileName: name,
      	  	watching: mangaStatus.watching
      	  })
      	break;
      	case 'completed':
      	  resolve({
      	    profileName: name,
      	    completed: mangaStatus.completed
      	   })
      	break;
      	case 'dropped':
      	resolve({
      	  	profileName: name,
      	  	dropped: mangaStatus.dropped
      	  })
      	break;
      	case 'planToWatch':
      	  resolve({
      	  	profileName: name,
      	  	planToRead: mangaStatus.planToRead
      	  })
      	break;
      	default:
      	  resolve({err: 1})
      	break;
      } 
    })
	}
	return new Promise(exacute)
}

module.exports.getMangaList = getMangaList

module.exports.profile = ((name, callback) => {
	async function getInfo(resolve, reject){
	let animeStatistic = await getAnimeList(name, 'all')
	let mangaStatistic = await getMangaList(name, 'all')
		let profile = {
			name: name,
			gender: null,
			birthday: null,
			last_online: null,
			user_pfp: null,
			friends: [],
			stats: {
			  anime: {
				watching: animeStatistic.watching.length,
	  			completed: animeStatistic.completed.length,
	  			dropped: animeStatistic.dropped.length,
	  			planToWatch: animeStatistic.planToWatch.length,
				episodes: null,
			  },
			  manga: {
			  	reading: mangaStatistic.reading.length,
			  	completed: mangaStatistic.completed.length,
			  	dropped: mangaStatistic.dropped.length,
			  	planToRead: mangaStatistic.planToRead.length
			  }
			},
			anime: {
				watching: animeStatistic.watching,
				completed: animeStatistic.completed,
				dropped: animeStatistic.dropped,
				planToWatch: animeStatistic.planToWatch 
			},
			manga: {
				reading: mangaStatistic.reading,
				completed: mangaStatistic.completed,
				dropped: mangaStatistic.dropped,
				planToRead: mangaStatistic.planToRead
			}
		}
		if(profile.stats.anime.watching == 0 && profile.stats.manga.reading == 0 && profile.stats.manga.reading == 0) return callback(null, `I don\'t know any user with this name "${name}"`)	
		fetch('https://myanimelist.net/profile/'+name)
		  .then(ress => ress.text())
		  .then(res => {
		  	let $ = cheerio.load(res); 
		  	let lolota = $('li[class="clearfix mb12"]')
		  	  .find('span')
		  	  .toArray()
		  	for(let i = 0; i < lolota.length; i++){
		  		switch ($(lolota[i]).html()){
		  			case 'Episodes':
		  		    profile.stats.anime.episodes = $(lolota[i+1]).html()
		  		  break;
		  		}
		  	}
		  	let cs = $('li[class="clearfix"]')
		      .find('span')
		  	  .toArray()
			for(let i = 0; i < cs.length; i++){
			  switch($(cs[i]).html()){
			    case "Gender":
				   profile.gender = $(cs[i+1]).html()
				break;
				case "Birthday":
				  profile.birthday = $(cs[i+1]).html()
				break;
				case "Last Online":
				  profile.last_online = $(cs[i+1]).html()
				break;
			  }
			} 
			let user_pfp = $('div[class="user-image mb8"]').find('img')[0].attribs
			profile.user_pfp = Object.values(user_pfp)[1]
        fetch(`https://myanimelist.net/profile/${name}/friends`)
	        .then(ress => ress.text())
          .then(res => {
		        let friendsList = []
            let _ = cheerio.load(res); 
				    let larose = _('div[class="user-friends pt4 pb12"]')
		          .find('a')
		  	      .toArray()
		        for(let i = 0; i < larose.length; i++){
			        profile.friends.push(_(larose[i]).html())
		        }  
			    callback(profile, null);
		    })
		  })
	}
	getInfo()
	
})

module.exports.nsfwAll = nsfwAZ;
module.exports.sfwAll = sfwAZ;
module.exports.honorifics = honorifics;
module.exports.honoFunction = honoFunction1;


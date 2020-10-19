const { honorifics } = require('./db.js');
const puppy = require('random-puppy');

module.exports.honoFunction = function(honori){
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

module.exports.meme = function(){
  var memesPar = [
    "animemes",
    "MemesOfAnime",
    "animememes",
    "AnimeFunny"
 ]  
  var subreddit = memesPar[Math.floor(Math.random() * memesPar.length)];.log(subreddit)
  
  function prom(resolve, reject){
    try {
      puppy(subreddit).then(url => {
      	console.log(url)
        resolve(url)
      })
    }catch(err){
      reject(new Error(`Couldn't fetch the api: ${err}`))
    }
  }
  return new Promise(prom)
}

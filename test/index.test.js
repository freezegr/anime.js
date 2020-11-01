const animeJs = require('../index.js')
const anime = new animeJs.Client()
console.log(anime)

anime.nsfw('eroFeet').then(res=>{
  console.log(res.url)
})
const animeJs = require('../index.js')
const anime = new animeJs.Client()

anime.searchAnime('aot').then((res)=>{
	console.log(res)
})
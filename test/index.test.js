const animeJs = require('../index.js')
const anime = new animeJs.Client()
anime.getAnimeList('freezegr', 'watching').then(res => {
	console.log(res)
})
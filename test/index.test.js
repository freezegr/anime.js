const animeJs = require('../index.js')
const anime = new animeJs.Client()
anime.getMangaList('freezegr', 'all').then(res => {
	console.log(res)
})
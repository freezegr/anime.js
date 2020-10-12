const anime = require('../index.js')

anime.searchManga('attack on titan').then(res => {
	console.log(res)
})
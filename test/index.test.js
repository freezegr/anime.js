const animeJs = require('../index.js')
const anime = new animeJs.Client()
anime.profile('freezegr').then(res => {
	if(res.error) throw new Error('lel')
	console.log(res)
})
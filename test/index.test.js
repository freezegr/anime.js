const animeJs = require('../index.js')
const anime = new animeJs.Client()
anime.profile('freezegr', (res, err) => {
	if(err) throw new Error(err)
	console.log(res)
});
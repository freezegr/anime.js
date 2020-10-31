const anime = require('../index.js')
const an = new anime.Client()
console.log(an)

an.sfw.woof.then(res=>console.log(res.url))
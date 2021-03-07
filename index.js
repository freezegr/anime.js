const util = require('./src/util.js');

exports.Client = class {
  constructor(){
    this.honorifics = util.honorifics,
    this.nsfwAll = util.nsfwAll,
    this.sfwAll = util.sfwAll,
    this.searchAnime = util.searchAnime,
    this.searchManga = util.searchManga,
    this.getAnimeList = util.getWatchList,
    this.getMangaList = util.getMangaList,
    this.profile = util.profile,
    this.searchHonorific = util.honoFunction,
    this.nameHonorific = util.nameHonorific,
    this.meme = util.meme,
    this.nsfw = util.nekoNsfw,
    this.sfw = util.nekoSfw,
    this.wallpaper = util.nekoWallpaper
  }
}
        
class Disk {
    constructor(title, releaseYear, cover, tracks = [], genres = [], artist = null) {
        this.title = title;
        this.releaseYear = releaseYear;
        this.cover = cover;
        this.tracks = tracks;
        this.genres = genres;
        this.artist = artist;
    }
}
export default Disk;

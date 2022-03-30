export type User = {
    id: number,
    username: string,
    email: string,
    password: string,
    profilePic: string,
    favoriteGenres: number[],
    favoriteSongs: number[],
    favoriteArtists: number[],
    playlists: Playlist[]
}

export type Genre = {
    id: number,
    name: string,
    image: string
}

export type Song = {
    id: number,
    genreId: number,
    title: string,
    artist: string,
    src: string,
    image: string
}

export type Artist = {
    id: number,
    name: string,
    genreId: number,
    image: string
}

export type Playlist = {
    id: number,
    title: string,
    songs: Song[]
}
export type User = {
    id: number,
    username: string,
    email: string,
    password: string,
    profilePic: string,
    favoriteGenres: favoriteGenres[],
    favoriteSongs: favoriteSongs[],
    favoriteArtists: favoriteArtists[],
    playlists: Playlist[],
    comments: comment[]
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
    artistsSongs: any,
    src: string,
    image: string,
    comments: comment[]
}

export type Artist = {
    id: number,
    name: string,
    genreId: number,
    image: string,
    artistsSongs: any
}

export type Playlist = {
    id: number,
    title: string,
    playlistSongs: Song[]
}

export type playlistSongs = {
    id: number,
    playlistId: number,
    songId: number
}

export type favoriteSongs = {
    id: number,
    userId: number,
    songId: number
}

export type favoriteArtists = {
    id: number,
    userId: number,
    artistId: number
}

export type favoriteGenres = {
    id: number,
    userId: number,
    genreId: number
}

export type comment = {
    id: number,
    userId: number,
    songId: number,
    content: string
    user: User
}
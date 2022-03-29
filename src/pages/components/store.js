import create from 'zustand'

export const useStore = create((set) => ({
    users: [],
    user: null,
    search: '',
    genres: [],
    songs: [],
    artists: [],
    artist: null,
    modal: '',
    song: null,
    playlists: [],
    updateUsers: newUsers => set({users: newUsers}),
    updateUser: newUser => set({user: newUser}),
    updateSearch: newSearch => set({search: newSearch}),
    updateGenres: newGenres => set({genres: newGenres}),
    updateSongs: newSongs => set({songs: newSongs}),
    updateArtists: newArtists => set({artists: newArtists}),
    updateArtist: newArtist => set({artist: newArtist}),
    updateModal: newModal => set({modal: newModal}),
    updateSong: newSong => set({song: newSong}),
    updatePlaylists: newPlaylists => set({playlists: newPlaylists})

}))
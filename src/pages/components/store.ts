import create from 'zustand'
import { User, Genre, Song, Artist, Playlist } from '../components/types'

type appState = {
    users: User[]
    user: User | null
    search: string
    genres: Genre[]
    songs: Song[]
    artists: Artist[]
    artist: Artist | null
    modal: string
    song: Song | null
    updateUsers: (newUsers: User[]) => void
    updateUser: (newUser: User | null) => void
    updateSearch: (newSearch: string) => void
    updateGenres: (newGenres: Genre[]) => void
    updateSongs: (newSongs: Song[]) => void
    updateArtists: (newArtists: Artist[]) => void
    updateArtist: (newArtist: Artist) => void
    updateModal: (newModal: string) => void
    updateSong: (newSong: Song) => void
}

export const useStore = create<appState>((set) => ({
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
    updateUsers: newUsers => set({ users: newUsers }),
    updateUser: newUser => set({ user: newUser }),
    updateSearch: newSearch => set({ search: newSearch }),
    updateGenres: newGenres => set({ genres: newGenres }),
    updateSongs: newSongs => set({ songs: newSongs }),
    updateArtists: newArtists => set({ artists: newArtists }),
    updateArtist: newArtist => set({ artist: newArtist }),
    updateModal: newModal => set({ modal: newModal }),
    updateSong: newSong => set({ song: newSong })
}))
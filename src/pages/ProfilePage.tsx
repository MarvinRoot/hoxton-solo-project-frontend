import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"
import { Song, Artist, Playlist } from "./components/types"

export function ProfilePage() {
    const { user } = useStore()
    const [songs, setSongs] = useState([])
    const [artists, setArtists] = useState([])
    const [playlists, setPlaylists] = useState([])


    console.log(user);

    function getSongs(favSongsIds: any) {
        //@ts-ignore
        for (let id of favSongsIds) {
            fetch(`http://localhost:3001/songs/${id}`).then(resp => resp.json())
                .then(song => {
                    setSongs((songs: Song[]): any => [...songs, song])
                })
        }
    }

    function getArtists(favArtistsIds: any) {
        //@ts-ignore
        for (let id of favArtistsIds) {
            fetch(`http://localhost:3001/artists/${id}`).then(resp => resp.json())
                .then(artist => {
                    setArtists((artists: Artist[]): any => [...artists, artist])
                })
        }
    }

    function getPlaylists(playlistIds: any) {
        //@ts-ignore
        for (let id of playlistIds) {
            fetch(`http://localhost:3001/playlists/${id}`).then(resp => resp.json())
                .then(playlist => {
                    setPlaylists((playlists: Playlist[]): any => [...playlists, playlist])
                })
        }
    }

    useEffect(() => {
        let favSongsIds = user?.favoriteSongs.map(object => object.songId)
        let favArtistsIds = user?.favoriteArtists.map(object => object.artistId)
        let playlistIds = user?.playlists.map(object => object.id)

        getSongs(favSongsIds)
        getArtists(favArtistsIds)
        getPlaylists(playlistIds)
    }, [])

    if (songs === null || artists === null) return <p>Loading...</p>

    return (
        <section className="song-details-content">
            <Header />
            <div className="song-content-main-wrapper">
                <Sidebar />
                <div className="song-content-wrapper">
                    <div style={{ display: "grid", gridTemplateColumns: "500px 1fr", alignItems: "center", width: "1400px" }}>
                        <img style={{ borderRadius: "50%", width: "400px" }} src={user?.profilePic} alt="" />
                        <h1 style={{ color: "#191919", fontSize: "35px", fontWeight: "700", textTransform: "uppercase" }}>{user?.username}</h1>
                    </div>

                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Favorite Songs</h1>
                    <div className="artist-card-wrapper" id="favorite-songs">
                        {
                            songs.map((song: Song) => {
                                return (
                                    <Link key={song.id} to={`/song/${song.id}`}>
                                        <div >
                                            <img style={{ width: "300px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h2>
                                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].name}</h3>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Favorite Artists</h1>
                    <div className="artist-card-wrapper" id="favorite-artists">
                        {
                            artists.map((artist: Artist) => {
                                return (
                                    <Link key={artist.id} to={`/artist/${artist.id}`}>
                                        <div style={{ gap: ".4rem" }}>
                                            <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artist.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artist.name}</h2>
                                        </div>
                                    </Link>
                                )
                            }
                            )}
                    </div>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Playlists</h1>
                    <div className="artist-card-wrapper" id="playlists">
                        {
                            playlists.map((playlist: Playlist) => {
                                return (
                                    <Link key={playlist.id} to={`/playlist/${playlist.id}`}>
                                        <div key={playlist.id} style={{ gap: ".4rem" }}>
                                            <div style={{ width: "300px", height: "300px", backgroundColor: "rgb(199, 199, 199)", color: "#f50", display: "grid", placeContent: "center", fontSize: "35px", fontWeight: "bold" }}>{playlist.title}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
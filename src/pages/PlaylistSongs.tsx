import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Playlist, Song } from "./components/types"

export function PlaylistSongs() {
    const params = useParams()
    const [playlist, setPlaylist] = useState<Playlist | null>(null)

    useEffect(() => {
        fetch(`http://localhost:3001/playlists/${params.playlistId}`).then(resp => resp.json())
            .then(playlistFromServer => {
                setPlaylist(playlistFromServer)
                console.log(playlistFromServer);
            })
    }, [params.playlistId])

    return (
        <section className="song-details-content">
            <Header />
            <div className="song-content-main-wrapper">
                <Sidebar />
                <div className="song-content-wrapper">
                    <div id="music" className="music-tracks" style={{ marginTop: "2rem" }}>
                        <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>{playlist?.title}</h1>
                        <div className="music-card-wrapper" >
                            {playlist?.playlistSongs.map((song: Song) => {
                                return (
                                    <Link key={song.id} to={`/song/${song.id}`}>
                                        <div className="music-card" style={{ backgroundColor: "rgb(199, 199, 199)" }} >
                                            <img style={{ width: "300px", paddingBottom: ".5rem", borderRadius: "20px" }} src={song.image} alt="" />
                                            <h1 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{song.title}</h1>
                                            {/* <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{song.artistsSongs[0].name}</h3> */}
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
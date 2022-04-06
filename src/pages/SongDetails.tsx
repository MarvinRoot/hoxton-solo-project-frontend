import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Header } from "./components/Header"
import Modals from "./components/modals/Modals"
import { Sidebar } from "./components/Sidebar"
import { useStore } from "./components/store"
import { Artist, favoriteSongs, Song } from "./components/types"

export function SongDetails() {
    const params = useParams()
    const { artists, user, updateUser, artist, updateArtist, updateModal, songs, song, updateSong } = useStore()

    // function addToFavorites(song: Song) {

    //     let newFavSongs = JSON.parse(JSON.stringify(user?.favoriteSongs))
    //     if (user?.favoriteSongs.find(songg => songg === song.id)) return null
    //     else newFavSongs.push(Number(song.id))

    //     fetch(`http://localhost:3001/users/${user?.id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ favoriteSongs: newFavSongs })
    //     }).then(resp => resp.json()).then(user => updateUser(user))
    // }

    function addToFavorites(userId: number | undefined, songId: number) {
        fetch(`http://localhost:3001/favoriteSongs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, songId })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
            }
        })
    }

    function removeFromFavorites(id: number) {
        let favSongId = findFavSongId(id)
        fetch(`http://localhost:3001/favoriteSongs/${favSongId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            }
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data)
            }
        })
    }

    function addComment(userId: number | undefined, songId: number, content: string) {
        fetch('http://localhost:3001/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, songId, content })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                updateUser(data.userrr)
                updateSong(data.song)
            }
        })
    }

    useEffect(() => {
        fetch(`http://localhost:3001/songs/${params.songId}`).then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    console.log(data)
                    updateSong(data)
                    updateArtist(data.artistsSongs[0])
                }
            })
    }, [])

    function isFavorite(song: Song) {
        let favSongsIds = user?.favoriteSongs.map(song => song.songId)
        if (favSongsIds?.includes(song.id)) {
            return true
        } else return false
    }

    function findFavSongId(id: number) {
        let favSong = user?.favoriteSongs.find(song => song.songId === id)
        //@ts-ignore
        return favSong.id
    }

    // not fetched yet
    if (song === null || artist === null) return <p>Loading...</p>

    // fetched but did not get a result back
    if (song.id === undefined) return <p>Song not found</p>

    return (
        <section className="song-details-content">
            <Header />
            <div className="song-content-main-wrapper">
                <Sidebar />
                <div className="song-content-wrapper">
                    <div style={{ display: "grid", gridTemplateColumns: "900px 1fr", alignItems: "center", gap: "2rem" }}>
                        <iframe width="900px" height="400px" scrolling="no" frameBorder="no" allow="autoplay" src={song.src}></iframe>
                        <Link to={`/artist/${artist.id}`}><img style={{ borderRadius: "50%", width: "300px" }} src={artist.image} alt="" /></Link>
                    </div>
                    <div style={{ display: "grid", gridAutoFlow: "column", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>

                        {isFavorite(song) ? <button onClick={() => removeFromFavorites(song.id)}>Remove from favorites</button> : <button onClick={() => addToFavorites(user?.id, song.id)}>Add to favorites</button>}
                        <button onClick={() => updateModal('add-song')}>Add to playlist</button>
                    </div>
                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Similar Music</h1>
                    <div className="music-card-wrapper" >
                        {songs.filter(songg => song.genreId === songg.genreId && songg.id !== song.id)
                            .map(songg => {
                                return (
                                    <Link key={songg.id} to={`/song/${songg.id}`}>
                                        <div className="music-card" >
                                            <img style={{ width: "300px", paddingBottom: ".5rem", borderRadius: "20px" }} src={songg.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "18px", fontWeight: "200" }}>{songg.title}</h2>
                                            <h3 style={{ color: "#52525D", fontSize: "13px", fontWeight: "200" }}>{artist.name}</h3>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>

                    <h1 style={{ color: "#191919", fontSize: "28px", fontWeight: "700" }}>Similar Artists</h1>
                    <div className="artist-card-wrapper">

                        {artists.filter(artisst => artist.genreId === artisst.genreId && artisst.id !== artist.id)
                            .map(artisst => {
                                return (
                                    <Link key={artisst.id} to={`/artist/${artisst.id}`}>
                                        <div >
                                            <img style={{ width: "200px", paddingBottom: ".5rem", borderRadius: "50%" }} src={artisst.image} alt="" />
                                            <h2 style={{ color: "#191919", fontSize: "20px", fontWeight: "700", textAlign: "center" }}>{artisst.name}</h2>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                    <div className="comments-section">
                        <h1>Comments Section</h1>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            addComment(user?.id, song.id, e.target.comment.value)
                            e.target.reset()
                        }} style={{ display: "grid", gridAutoFlow: "row", gridGap: "1rem" }}>
                            <textarea style={{ width: "500px", padding: "3px" }} rows={3} name="comment" required />
                            <button type="submit">Post comment</button>
                        </form>
                        {song.comments.map(comment => {
                            return (
                                <div>
                                    <img style={{ width: "25px" }} src={comment.user.profilePic} alt="" />
                                    <span>{comment.user.username}</span>
                                    <p>{comment.content}</p>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
            <Modals />
        </section>

    )
}
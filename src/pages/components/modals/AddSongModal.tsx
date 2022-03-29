import { useState } from "react"
import { useStore } from "../store"

export default function AddSongModal() {

    const { updateModal, user, song, updateUser, updatePlaylists } = useStore()

    function handleOnClick(playlist, playlistSongs) {
        playlistSongs.push(song)
        playlist.songs = playlistSongs

        let updatedPlaylists = user.playlists.filter(playlisst => playlisst.id !== playlist.id)
        updatedPlaylists.push(playlist)
        console.log(updatedPlaylists)
        updatePlaylists(updatedPlaylists)

        fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlists: updatedPlaylists })
        }).then(resp => resp.json()).then(user => updateUser(user))
    }

    return (
        <div className="modal-wrapper" onClick={() => updateModal('')}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateModal('')} className="close-modal">
                    X
                </button>
                <h2>Pick a playlist to add the song</h2>
                <div style={{ display: "grid", gap: ".5rem", width: "100%" }}>
                    {user.playlists.map(playlist => {
                        return (
                            <div onClick={() => {
                                handleOnClick(playlist, playlist.songs)
                            }} className="playlist-wrapper" key={playlist.id} >
                                <button style={{ cursor: "pointer", borderRadius: "50px", border: "none", padding: ".5rem 1rem", fontSize: "20px", color: "white", backgroundColor: "#f50" }}> + </button>
                                <h4>{playlist.title}</h4>
                            </div>
                        )
                    })}
                    <button onClick={() => updateModal('new-playlist')} style={{ cursor: "pointer", borderRadius: "50px", border: "none", padding: ".5rem 1rem", fontSize: "15px", color: "white", backgroundColor: "#f50" }}>Create playlist</button>
                </div>
            </div>
        </div>
    )
}
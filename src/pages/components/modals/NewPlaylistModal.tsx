import { useStore } from "../store"

export default function NewPlaylistModal() {

    const { updateModal, user, updateUser } = useStore()

    function addPlaylist(name) {

        let newPlaylists = JSON.parse(JSON.stringify(user.playlists))
        newPlaylists.push({ title: name, songs: [] })

        fetch(`http://localhost:3001/users/${user.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ playlists: newPlaylists })
        }).then(resp => resp.json()).then(user => updateUser(user))
    }

    return (
        <div className="modal-wrapper" onClick={() => updateModal('')}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateModal('')} className="close-modal">
                    X
                </button>
                <h2>New playlist</h2>
                <div style={{ display: "grid", gap: ".5rem", width: "100%" }}>
                    <form className="new-user" onSubmit={(e) => {
                        e.preventDefault()
                        addPlaylist(e.target.Name.value)
                        e.target.reset()
                        updateModal('add-song')
                    }}>
                        <label htmlFor="Name">Playlist name</label>
                        <input name="Name" id="Name" type="text" />
                        <button type="submit" style={{ cursor: "pointer", borderRadius: "50px", border: "none", padding: ".5rem 1rem", fontSize: "15px", color: "white", backgroundColor: "#f50" }}>Create playlist</button>
                    </form>
                    
                </div>
            </div>
        </div>
    )
}
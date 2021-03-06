import { useStore } from "../store"

export default function NewPlaylistModal() {

    const { updateModal, user, updateUser } = useStore()

    function addPlaylist(userId: number | undefined, title: string) {

        // let newPlaylists = JSON.parse(JSON.stringify(user?.playlists))
        // newPlaylists.push({ title: name, songs: [] })

        // fetch(`http://localhost:3001/users/${user.id}`, {
        //     method: 'PATCH',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ playlists: newPlaylists })
        // }).then(resp => resp.json()).then(user => updateUser(user))

        fetch(`http://localhost:3001/playlists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.token
            },
            body: JSON.stringify({ userId, title })
        }).then(resp => resp.json()).then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
                updateUser(data.userrr)
            }
        })
    }

    return (
        <div className="modal-wrapper" onClick={() => updateModal('')}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => updateModal('')} className="close-modal">
                    X
                </button>
                <div className='modal-container'>
                    <h2>New playlist</h2>
                    <div style={{ display: "grid", gap: ".5rem", width: "100%" }}>
                        <form className="new-user" onSubmit={(e) => {
                            e.preventDefault()
                            //@ts-ignore
                            addPlaylist(user?.id, e.target.Name.value)
                            //@ts-ignore
                            e.target.reset()
                            updateModal('add-song')
                        }}>
                            <label htmlFor="Name">Playlist name</label>
                            <input name="Name" id="Name" type="text" />
                            <button id="modal-btn" type="submit" style={{ cursor: "pointer", borderRadius: "50px", border: "none", padding: ".5rem 1rem", fontSize: "15px", color: "white", backgroundColor: "#f50" }}>Create playlist</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
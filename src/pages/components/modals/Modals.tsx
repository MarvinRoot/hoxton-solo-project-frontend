import { useStore } from "../store"
import AddSongModal from "./AddSongModal"
import NewPlaylistModal from "./NewPlaylistModal"
import SettingsModal from "./SettingsModal"

export default function Modals() {
    const { modal } = useStore()
    if (modal === '') {
        return null
    }
    else if (modal === 'add-song') {
        return <div>{< AddSongModal />}</div>
    }
    else if (modal === 'new-playlist') {
        return <div>{< NewPlaylistModal />}</div>
    }
    else if (modal === 'settings') {
        return <div>{<SettingsModal />}</div>
    }
}
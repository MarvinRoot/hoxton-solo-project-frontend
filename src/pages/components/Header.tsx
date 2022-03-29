import { useNavigate } from 'react-router-dom';
import { useStore } from './store';
export function Header() {
    const { user, updateSearch } = useStore()
    const navigate = useNavigate()
    return (
        <section className="header">
            <div className='logo-div' style={{cursor: "pointer"}} onClick={()=>navigate('/main')}>
                <h1 className="logo">HOXTIFY</h1>
                <h2>Your daily music dose</h2>
            </div>
            <div className="search-bar">
                <svg viewBox="0 0 16 16" width="16" height="16" focusable="false" role="img" aria-hidden="true" className="topbar-search-icon"><g><path d="M13 7.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0zm-1.43 5.07a6.5 6.5 0 1 1 .73-.685l2.054 2.054a.5.5 0 0 1-.708.707L11.57 12.57z"></path></g></svg>
                <input onChange={(e) => updateSearch(e.target.value)} name="search" type="search" placeholder="Search" />
            </div>
            <div onClick={()=>navigate('/profile')} className='header-profile'>
                <img src={user.profilePic} alt="profile pic" />
                <span>{user.username}</span>
            </div>
        </section>
    )
}
import { useNavigate } from "react-router-dom"
import { useStore } from "./components/store"

export function SignUp() {
    const navigate = useNavigate()
    const { users, updateUsers, updateUser } = useStore()

    function addUser(usernamee, eemail, passsword) {
        //update state
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernamee, email: eemail, password: passsword, profilePic: `https://avatars.dicebear.com/api/avataaars/${usernamee}.svg`, favoriteGenres: [], favoriteSongs: [], playlists: [], favoriteArtists: [] })
        }).then(resp => resp.json()).then(user => {
            let updatedUsers = JSON.parse(JSON.stringify(users))
            updatedUsers.push(user)
            updateUsers(updatedUsers)
            updateUser(user)
        })
    }
    return (
        <div className="sign-up">
            <h1 className="logo">Hoxtify</h1>
            <h2>Your daily music dose</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                addUser(e.target.usernamee.value, e.target.eemail.value, e.target.passsword.value)
                navigate('/pick-favorites')
            }}>
                <div className="container">
                    <h1>SIGN UP!</h1>

                    <label>
                        <span>Username</span>
                        <input required name="usernamee" type="text" placeholder="Create a username" />
                    </label>

                    <label>
                        <span>Email</span>
                        <input required name="eemail" type="email" placeholder="Enter your email adress" />
                    </label>

                    <label>
                        <span>Password</span>
                        <input required name="passsword" type="password" placeholder="Create a password" />
                    </label>

                    <button type="submit" value="Submit">
                        Sign Up
                    </button>

                    <p onClick={() => navigate('/sign-in')}>Already have an account? Sign in</p>
                </div>
            </form>
        </div>
    )
}
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "./components/store"

export function SignIn() {
    const navigate = useNavigate()
    const {user, users, updateUser} = useStore()

    function signInUser(email, password){
        for(const user of users){
            if(user.email === email && user.password === password){
                updateUser(user)
            }
        }
    }
    useEffect(()=>{
        if(user) navigate('/main')
    }, [user])
    
    return (
        <div className="sign-in">
            <h1 className="logo">Hoxtify</h1>
            <h2>Your daily music dose</h2>
            <form onSubmit={(e)=> {
                        e.preventDefault()
                        signInUser(e.target.email.value, e.target.password.value)
                        
                    }}>
                <div className="container">
                    <h1>Hey there!</h1>

                    <label>
                        <span>Email</span>
                        <input required defaultValue={'marvin@mail.com'} name="email" type="email" placeholder="Enter your email adress" />
                    </label>

                    <label>
                        <span>Password</span>
                        <input required defaultValue={'marvin'} name="password" type="password" placeholder="Enter your password" />
                    </label>

                    <button type="submit" value="Submit">
                        Sign In
                    </button>

                    <p onClick={() => navigate('/sign-up')}>Don't have an account? Create one</p>
                </div>
            </form >
        </div>
    )
}
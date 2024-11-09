import './App.css'
import {UserProvider, useUser} from "./context/user.jsx";
import {Login} from "./pages/Login.jsx";
import {Home} from "./pages/Home.jsx";
import {IdeasProvider} from "./context/ideas.jsx";

function App() {
  const isLoginPage = window.location.pathname === '/login';

  return (
    <UserProvider>
        <IdeasProvider>
            <Navbar />
            <main>{isLoginPage ? <Login /> : <Home />}</main>
        </IdeasProvider>
    </UserProvider>
  )
}

function Navbar() {
    const user = useUser()

    return (
        <nav>
            <a href="/">Idea tracker</a>
            <div>
                {user.current ? (
                    <>
                        <span>{user.current.email}</span>
                        <button type="button" onClick={() => user.logout()}>logout</button>
                    </>
                ) : <a href="/login">Login</a>}
            </div>
        </nav>
    )
}

export default App

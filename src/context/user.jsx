import {ID} from "appwrite";
import {createContext, useContext, useEffect
, useState} from "react";
import {account} from "../lib/appwrite.js";

const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider(props) {
    const [user, setUser] = useState(null);
    async function login(email, password) {
        const loggedIn = await account.createEmailPasswordSession(email, password);
        setUser(loggedIn);
        window.location.replace("/")
    }

    async function logout() {
        await account.deleteSession("current")
    }

    async function register(email, password) {
        const user = await account.create(ID.unique(), email, password)
        await login(email, password);
    }

    async function init(){
        try {
            const loggedIn = await account
                .get()
            setUser(loggedIn);
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }

    useEffect(() => {
        (async () => {
            await init();
        })();
    }, [])

    return <UserContext.Provider value={{current: user, login, logout, register}}>
        {props.children}
    </UserContext.Provider>
}
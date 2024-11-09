import {createContext, useContext, useEffect, useState} from "react";
import {database} from "../lib/appwrite.js";
import {ID, Query} from "appwrite";

export const IDEAS_DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
export const IDEAS_COLLECTION_ID = import.meta.env.VITE_IDEAS_COLLECTION_ID;

const IdeasContext = createContext();

export function useIdeas() {
    return useContext(IdeasContext)
}

export function IdeasProvider(props) {
    const [ideas, setIdeas] = useState([]);


    async function add(idea){
        const response =  await  database.createDocument(IDEAS_DATABASE_ID,
        IDEAS_COLLECTION_ID,
        ID.unique(),
        idea)
        setIdeas((ideas) => [response, ...ideas].slice(0, 19));
    }

    async function remove(id){
        await database.deleteDocument(IDEAS_DATABASE_ID, IDEAS_COLLECTION_ID, id)
        setIdeas((ideas) => ideas.filter((idea) => idea.$id !== id))
        await init()
    }

    async function init(){
        const response = await database.listDocuments(
            IDEAS_DATABASE_ID,
            IDEAS_COLLECTION_ID,
            [Query.orderDesc("$createdAt"), Query.limit(10)]
        )

        setIdeas(response.documents);
    }

    useEffect(() => {
        (async () => {
            await init();
        })();
    }, [])

    return (
        <IdeasContext.Provider value={{current: ideas, add, remove}}>
            {props.children}
        </IdeasContext.Provider>
    )
}


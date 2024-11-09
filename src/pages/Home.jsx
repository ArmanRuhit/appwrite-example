import {useState} from "react";
import {useUser} from "../context/user.jsx";
import {useIdeas} from "../context/ideas.jsx";


export function Home() {
    const user = useUser();
    const ideas = useIdeas();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    return (
        <>
            {user.current ?
                <section>
                    <h2>Submit Idea</h2>
                    <form>
                        <input type="text" placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}/>

                        <textarea placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>

                        <button type="button"
                        onClick={() => ideas.add({userId:user.current.$id, title, description})}>Submit</button>
                    </form>
                </section> :
                <section>
                    <p>Please login to submit idea</p>
                </section>
            }
            <section>
                <h2>Latest Ideas</h2>
                <ul>
                    {ideas.current.map((idea) => {
                        return (<li key={idea.id}>
                            <strong>{idea.title}</strong>
                            <p>{idea.description}</p>
                            {user.current && user.current.id === idea.userId && (<button onClick={() => ideas.remove(idea.id)}>Remove</button>)}
                        </li>)
                    })}
                </ul>
            </section>
        </>
    )
}
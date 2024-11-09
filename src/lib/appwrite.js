import { Client, Databases, Account} from "appwrite";

const client = new Client()

const projectId = import.meta.env.VITE_PROJECT_ID;
client.setEndpoint("https://cloud.appwrite.io/v1")
.setProject(projectId)

export const account = new Account(client)

export const database = new Databases(client)


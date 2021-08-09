import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// grab backend to use based on environment
import { backend } from "../../data"

export const ListSearch = () => {
    const [lists, setLists] = useState([])
    // const [title, setTitle] = useState("")
    // const [description, setDescription] = useState("")
    // const [shared, setShared] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
        // get lists from backend
        useEffect(() => {
            backend.get("/search/list_search")
                .then(({ data }) => setLists(data))
                .catch((error) => setErrorMessage(error.message))
                .finally(() => setLoading(false))
        }, [])

    return(

        // <p>List Search</p>
<>
{errorMessage}
{loading && <p>Loading...</p>}
        {lists.map(({id, title, description, shared }, index) => (
            // public is a reserved word so need to revisit and rename
            // to shared then add to destructuring assignment above
            // add username to lists
            <article key={id}>
              <Link key={id} to={`/lists/${id}`}>
              <p>{title}</p>
              <p>{description}</p>
              {shared && <p>shared</p>}
              </Link>
            </article>
            
          ))}
          </>
    )
}
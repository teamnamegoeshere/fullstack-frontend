import { useEffect, useState } from "react"

// grab backend to use based on environment
import { backend } from "../../data"


export const MovieSearch = () => {
const [query, setQuery] = useState("Inception")
const [results, setResults] = useState([])
const [loading, setLoading] = useState(true)
const [errorMessage, setErrorMessage] = useState("")


// get movies from backend

useEffect(() => {
    backend.get(`/movies/search?query=${query}`)
        .then(({ data }) => setResults(data))
        .catch((error) => setErrorMessage(error.message))
        .finally(() => setLoading(false))
}, [query])

return (
    <>
    {/* Search Movies */}
    <form >
        {/* onSubmit={getMovies} */}
                    <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="search term" />
                    {/* <input onChange={(e) => setDescription(e.target.value)} value={description} placeholder="description" /> */}
                    {/* <input type="submit" value="Submit" /> */}
                    
    </form>
    {results.map(({id, title, overview }) => (
            <article key={id}>
            {/* <Link key={id} to={`/movies/${id}`}> */}
            <p>{title}</p>
            <p>{overview}</p>
            {/* </Link> */}
            {/* delete button */}
            {/* <button onClick={() => deleteList(id, index)}>DELETE</button> */}
            </article>
            
        ))}
    </>
)
}
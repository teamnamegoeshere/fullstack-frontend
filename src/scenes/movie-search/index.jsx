import { useEffect, useState } from "react"

// grab backend to use based on environment and grab error helper
import { backend, errorHelper } from '../../data'


export const MovieSearch = () => {
const [query, setQuery] = useState("Inception")
const [results, setResults] = useState([])
const [loading, setLoading] = useState(true)
const [errorMessage, setErrorMessage] = useState("")


// get movies from backend

useEffect(() => {
    backend.get(`/movies/search?query=${query}`)
        .then(({ data }) => setResults(data))
        .catch((error) => setErrorMessage(errorHelper(error)))
        .finally(() => setLoading(false))
}, [query])

const imageUrl = (poster_path) => {
    return ("https://image.tmdb.org/t/p/w500" + {poster_path})
}

return (
    <>
    {errorMessage}
    {loading && <p>Loading...</p>}

    {/* Search Movies */}
    <form >
        {/* onSubmit={getMovies} */}
        <input onChange={(e) => setQuery(e.target.value)} value={query} placeholder="search term" />
        {/* <input type="submit" value="Submit" /> */}
                    
    </form>
        {results ? results.map(({id, title, overview, poster_path }) => (
        
            <article key={id}>
            {/* <Link key={id} to={`/movies/${id}`}> */}
            <p>{title}</p>
            <p>{overview}</p>
            <img src={imageUrl} alt="poster"/>
            <p>{imageUrl}</p>
            {/* </Link> */}
            </article>
            
        ))
    : <p>No results.</p>}
    </>
)
}
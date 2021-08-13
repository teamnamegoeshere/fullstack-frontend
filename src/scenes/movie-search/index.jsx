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


let url = "https://image.tmdb.org/t/p/w500";

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
            <img src={url + poster_path} alt="poster"/>
            {/* </Link> */}
            </article>
            
        ))
    : <p>No results.</p>}
    </>
)
}
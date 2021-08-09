import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

// grab backend to use based on environment
import { backend } from "../../data"



export const ListDetails = () => {

    const {id} = useParams()
    const [list, setList] = useState("")
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    // get list from backend
    useEffect(() => {
        backend.get(`/lists/${id}`)
            .then(({ data }) => setList(data))
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setLoading(false))
    }, [id])

    return (
        <>
            {errorMessage}
            {loading && <p>Loading...</p>}

            <article>
              <p>{list.title}</p>
              <p>{list.description}</p>
              {/* <p>{shared}</p> */}
              {/* delete button */}
              {/* <button onClick={() => deleteList(id, index)}>DELETE</button> */}
            </article>
        </>
    )
}
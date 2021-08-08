import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

// grab backend to use based on environment
import { backend } from "../../data"



export const ListDetails = () => {

    // get lists from backend
    useEffect(() => {
        backend.get(`/lists/${id}`)
            .then(({ data }) => setLists(data))
            .catch((error) => setErrorMessage(error.message))
            .finally(() => setLoading(false))
    }, [])

    const {id} = useParams()
    const [lists, setLists] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    // const [shared, setShared] = useState(false)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    return (
        <article key={id}>
              <Link key={id} to={`/lists/${id}`}>
              <p>{title}</p>
              <p>{description}</p>
              {/* <p>{shared}</p> */}
              </Link>
              {/* delete button */}
              {/* <button onClick={() => deleteList(id, index)}>DELETE</button> */}
            </article>
    )
}
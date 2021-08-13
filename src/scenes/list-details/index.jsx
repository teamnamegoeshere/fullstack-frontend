import { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"

// grab backend to use based on environment and grab error helper
import { backend, errorHelper } from '../../data'



export const ListDetails = () => {

    const {id} = useParams()
    const [list, setList] = useState("")
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const history = useHistory()

    // get list from backend
    useEffect(() => {
        backend.get(`/lists/${id}`)
            .then(({ data }) => setList(data))
            .catch((error) => setErrorMessage(errorHelper(error)))
            .finally(() => setLoading(false))
    }, [id])

      // List delete method
      const deleteList = async (id, index) => {
        // set loading to true
        setLoading(true)
  
        try {
          // send request to backend
          await backend.delete(`/lists/${id}`)
          history.push("/lists")
        } catch (error) {
          setErrorMessage(errorHelper(error))
        // set loading state to false
            setLoading(false)
        }
  
      }

    return (
        <>
            {errorMessage}
            {loading && <p>Loading...</p>}

            <article>
              <p>{list.title}</p>
              <p>{list.description}</p>
              {(list.shared && <p>shared</p>) || <p>not shared</p>}
              {/* edit button */}
              <Link key={id} to={`/lists/update/${id}`}><button>Edit</button></Link>
              {/* delete button */}
              <button onClick={() => deleteList(id)}>DELETE</button>
            </article>
        </>
    )
}
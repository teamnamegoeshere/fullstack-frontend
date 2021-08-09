import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

// grab backend to use based on environment
import { backend } from "../../data"



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
            .catch((error) => setErrorMessage(error.message))
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
          setErrorMessage(error.message)
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
              {/* <p>{shared}</p> */}
              {/* delete button */}
              <button onClick={() => deleteList(id)}>DELETE</button>
            </article>
        </>
    )
}